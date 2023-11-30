<?php
namespace Tests\Unit;

use App\Http\Controllers\EngradoController;
use App\Models\Engrado;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Http\Request;
use Tests\TestCase;

class EngradoControllerTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        $this->controller = new EngradoController();
    }

    public function tearDown(): void
    {
        parent::tearDown();
    }

    public function testGravarNomeComNomeNoCabecalho()
    {
        $request = Request::create('/dummy', 'POST');
        $request->headers->add(['name_device' => 'Nome de Teste', 'environment_device' => 'Ambiente de Teste']);

        $response = $this->controller->gravarNome($request);

        $response->assertStatus(200)
                 ->assertJson(['mensagem' => 'Nome gravado com sucesso.']);

        $engrado = Engrado::where('name_device', 'Nome de Teste')->first();
        $this->assertNotNull($engrado);
        $this->assertEquals('Ambiente de Teste', $engrado->environment_device);
    }

    public function testGravarNomeSemNomeNoCabecalho()
    {
        $request = new Request();
    
        $response = $this->controller->gravarNome($request);
    
        if (is_array($response)) {
            $this->assertEquals(500, $response);
            $this->assertEquals('Erro ao gravar nome: Erro! Por favor, forneça o nome do engrado.', $response['erro']);
        } else {
            $response->assertStatus(500)
                ->assertJson(['erro' => 'Erro ao gravar nome: Erro! Por favor, forneça o nome do engrado.']);
        }
    }
}

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MqttController;
use App\Http\Controllers\EngradoController;
use App\Http\Controllers\AuthController;
use App\Models\Engrado;
use App\Models\User;
use App\Models\WeightScript;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/mqtt', [MqttController::class, 'leituraScriptMQTT']);
Route::get('/mqtt/dados', [WeightScript::class, 'obterDadoMaisRecente']);
Route::get('/engrado/consulta', [Engrado::class, 'consultarEngrado']);

Route::post('/engrado/cadastro', [Engrado::class, 'gravarNome']);
Route::post('/register', [User::class, 'cadastrarUsuario']);
Route::post('/login', [User::class, 'loginUsuario']);
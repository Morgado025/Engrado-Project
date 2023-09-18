import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, } from '@ionic/react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const handleLogin = () => {
      // Simulação de uma autenticação bem-sucedida
      if (email === 'user@example.com' && password === 'pas123') {
        alert("It's right");
        setIsLoggedIn(true);
      } else {
        alert('Credenciais inválidas. Tente novamente.');
      }
    };
  
    return (
      <IonContent>
        <IonInput
          placeholder="Email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)}
        />
        <IonInput
          type="password"
          placeholder="Password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
        <IonButton onClick={handleLogin}>Login</IonButton>
      </IonContent>
    );
  };
  
  export default Login;
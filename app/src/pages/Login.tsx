import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonTitle, IonText, } from '@ionic/react';
import LanguageSelector from '../components/LanguageSelector';

import './Login.css';

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
      <div className='container login-page'>
        <h1 className='welcome-login'>Bem vindo!</h1>
        <p className='enter-your-account'>Entre na sua conta</p>
        <IonText className='login-inputs'>
          <IonInput
            placeholder="E-mail"
            className='input-cred login-email'
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
          <IonInput
            type="password"
            placeholder="Password"
            className='input-cred login-password'
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonText>
        <button onClick={handleLogin} className='login-sign-in'>Entrar</button>
        <p className='forget-password'>Esqueceu sua senha?</p>
        <div className='footer'>
          <div className='rectangle-left'></div>
          <p className='not-account'>Não possui uma conta?</p>
          <div className='rectangle-right'></div>
        </div>
        <button onClick={handleLogin} className='login-sign-up'>Criar nova conta</button>
      </div>
    );
  };
  
  export default Login;
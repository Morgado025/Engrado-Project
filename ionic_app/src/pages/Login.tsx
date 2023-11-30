import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonTitle, IonText, IonPage, IonToast, } from '@ionic/react';
import axios from 'axios';

import './Login.css';
import { useHistory } from 'react-router';

const Login: React.FC = () => {
    const [showToast, setShowToast] = useState(false);
    const [errorToastMessage, setErrorToastMessage] = useState<string | null>(null);  
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    const history = useHistory();
    const navigateRegisterPage = () => {
      history.push("/register");
    }

    const onChangeInput = (e: any) => {
      setFormData(() => ({
        ...formData,
        [e.target.name]: e.target.value,
      }));
    };

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        if (!formData.email || !formData.password) {
          setErrorToastMessage('Por favor, preencha todos os campos.');
          setShowToast(true);
          return;
        }
  
        // TODO: Remove login test
        if (formData.email === "something@some" && formData.password === "some") {
          history.push("/devices")
        } else {
          setErrorToastMessage("Loga certo zé")
          setShowToast(true);
        }

        // TODO: Change endpoint
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          localStorage.setItem('token', response.data.user_id)
          history.push("/devices")
        } else {
          setErrorToastMessage("Falha na autenticação");
          setShowToast(true);
        }
      } catch (error: any) {
        if (error) {
          setErrorToastMessage(`${error.response.data.erro}`);
          setShowToast(true);
        }
      }
    };
  
    return (
      <IonPage className='container login-page'>
        <h1 className='welcome-login'>Bem vindo!</h1>
        <p className='enter-your-account'>Entre na sua conta</p>
        <form onSubmit={handleLogin} className='login-inputs' action="">
          <IonText>
            <IonInput
              type='email'
              placeholder="Email"
              className='input-cred login-email'
              name='email'
              value={formData.email}
              onIonChange={onChangeInput}
              required
            />
            <IonInput
              type="password"
              placeholder="Password"
              className='input-cred login-password'
              name='password'
              value={formData.password}
              onIonChange={onChangeInput}
              required
            />
          </IonText>
          <button className='login-sign-in'>Entrar</button>
        </form>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => {
            setShowToast(false);
            setErrorToastMessage(null);
          }}
          message={errorToastMessage || ''}
          duration={3000}
          position="top"
          color="danger"
        />
        <p className='forget-password'>Esqueceu sua senha?</p>
        <div className='footer'>
          <div className='rectangle-left'></div>
          <p className='not-account'>Não possui uma conta?</p>
          <div className='rectangle-right'></div>
        </div>
        <button onClick={navigateRegisterPage} className='login-sign-up'>Criar nova conta</button>
      </IonPage>
    );
  };
  
export default Login;
import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonTitle, IonText, IonPage, IonToast, } from '@ionic/react';
import axios from 'axios';

import './Register.css';
import { useHistory } from 'react-router';

const Register: React.FC = () => {
    const [showToast, setShowToast] = useState(false);
    const [errorToastMessage, setErrorToastMessage] = useState<string | null>(null);  
    const [showToastSucess, setShowToastSucess] = useState(false)
    const [sucessToastMessage, setSucessToastMessage] = useState<string | null>(null)
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
    });

    const onChangeInput = (e: any) => {
      setFormData(() => ({
        ...formData,
        [e.target.name]: e.target.value,
      }));
    };

    const history = useHistory();

    const handleRegister = async (event: React.FormEvent) => {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setErrorToastMessage('Por favor, preencha todos os campos.');
        setShowToast(true);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorToastMessage('A senha e a confirmação de senha não coincidem.');
        setShowToast(true);
        return;
      }
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/register', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if(response.status === 200) {
          setSucessToastMessage("Registro realizado com sucesso");
          setShowToastSucess(true);
        }
      } 
      catch (error:any) {
        if (error) {
          setErrorToastMessage(`${error.response.data.erro}`);
          setShowToast(true);
        }
      }
    };

    const navigateLoginPage = () => {
      history.push("/login");
    }

    return (
      <IonPage className='container login-page'>
        <h1 className='welcome-login'>Bem vindo!</h1>
        <p className='enter-your-account'>Entre na sua conta</p>
        <form onSubmit={handleRegister} className='login-inputs'>
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
            <IonInput
              type="password"
              placeholder="Confirm Password"
              className='input-cred login-password'
              name='confirmPassword'
              value={formData.confirmPassword}
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
        <IonToast
          isOpen={showToastSucess}
          onDidDismiss={() => {
            setShowToastSucess(false);
            setSucessToastMessage(null);
          }}
          message={sucessToastMessage || ''}
          duration={3000}
          position="top"
          color="sucess"
        />
        <div className='footer'>
          <div className='rectangle-left'></div>
          <p className='not-account'>Já possui uma conta?</p>
          <div className='rectangle-right'></div>
        </div>
        <button onClick={navigateLoginPage} className='login-sign-up'>Login</button>
      </IonPage>
    );
  };
  
export default Register;
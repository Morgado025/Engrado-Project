import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './ProfileSettings.css';

import {
  IonContent,
  IonButton,
  IonAvatar,
  IonIcon,
  IonText,
  IonToolbar,
  IonTitle,
} from '@ionic/react';
import { InputChangeEventDetail } from '@ionic/core';

import avatar from '/public/avatar.svg'
import arrow from '/public/arrow-back.svg'
import paint from '/public/paint.svg'
import eyeOff from '/public/eye-off.svg'
import chevron from '/public/chevron-down.svg'
import sunny from '/public/sunny.svg'
import language from '/public/language.svg'

const ProfileSettings: React.FC = () => {
    const history = useHistory();

    const navigateToHomePage = () => {
      history.push('/home');
    };

    return (
    <div className='responsive'>
        <div className='profile-settings'>
            <div className='toolbar'>
                <IonIcon onClick={navigateToHomePage} id='arrow-back' icon={arrow}></IonIcon>
                <p className='header'>Definições de perfil</p>
            </div>
            <IonAvatar className='photo'>
                <IonIcon id='avatar' icon={avatar} />
            </IonAvatar>
            <div className='perfil-details'>
                <h1 className='title'>Detalhes do perfil</h1>
                <fieldset className='fieldset-profile'>
                    <legend className='legend-input'>E-mail</legend>
                    <input  type="email"
                            id="user_email"
                            className="form-control"
                            value='usuario@example.com'
                            readOnly/> 
                </fieldset> 
                <fieldset className='fieldset-profile'>
                    <legend className='legend-input'>Senha</legend>
                    <input  type="password"
                            id="user_password"
                            className="form-control"
                            value='password123'
                            readOnly/> 
                    <IonIcon icon={eyeOff} className='eye-off' />
                </fieldset>
            </div>
            <div className='perfil-details'>
                <h1 className='title'>Preferencias</h1>
                <fieldset className='fieldset-profile'>
                    <legend className='legend-input'>Tema</legend>
                    <IonIcon icon={sunny} className='chevron' />
                    <input  type="email"
                            id="theme"
                            className="form-control"
                            value="Automatico (Claro)"
                            readOnly/> 
                    <IonIcon icon={chevron} className='chevron' />
                </fieldset> 
                <fieldset className='fieldset-profile'>
                    <legend className='legend-input'>Idioma</legend>
                    <IonIcon icon={language} className='chevron' />
                    <input  type="text"
                            id="language"
                            className="form-control"
                            value="Português (Brasil)"
                            readOnly/> 
                    <IonIcon icon={chevron} className='chevron' />
                </fieldset>
            </div>
        </div>
    </div>
    );
}

export default ProfileSettings;

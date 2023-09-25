import React, { useState } from 'react';
import './Automation.css';

import TitleComponent from '../components/Title';
import Footer from '../components/Footer';

import { useHistory } from 'react-router-dom';

import {
  IonText,
  IonContent,
  IonTitle,
  IonIcon,
  IonAvatar,
  IonToolbar, 
  IonRow,
  IonCol,
} from '@ionic/react';

import favorites from '/public/favorites.svg';
import devices from '/public/devices.svg';
import automation from '/public/automation.svg';

const Automation: React.FC = () => {
    return (
        <div className='container'>
            <TitleComponent title="Automação" />
            <div className='automation-toolbar'>
                <h1 className='title center'>EM BREVE</h1>
                <p className='text center'>Disponivel nas próximas atualizações</p>
            </div>
            <Footer />  
        </div>
    );
}

export default Automation;
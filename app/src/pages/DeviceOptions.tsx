import React from 'react';
import { useHistory } from 'react-router-dom';
import './DeviceOptions.css';

import { IonCol, IonGrid, IonIcon, IonRow } from '@ionic/react';

import Empty from '../components/Empty'
import Full from '../components/Full'
import TitleComponent from '../components/Title';
import Footer from '../components/Footer'

import add from '/public/add.svg';
import remove from '/public/remove.svg';
import arrow from '/public/arrow-back.svg'
import settings from '/public/settings.svg'
import favorites from '/public/favorites.svg'



const DeviceOptions: React.FC = () => {
    const history = useHistory();

    const navigateToHomePage = () => {
      history.push('/home');
    };


    return (
        <div className='container'>
                <div className='header-device-options'>
                    <IonIcon onClick={navigateToHomePage} id='arrow-back' icon={arrow}></IonIcon>
                    <p className='header'>Engrado Classic</p>
                    <IonIcon onClick={navigateToHomePage} id='arrow-back' icon={favorites}></IonIcon>
                    <IonIcon onClick={navigateToHomePage} id='arrow-back' icon={settings}></IonIcon>
                </div>
                <p className='device-option-notification'>Enviar notificação quando os espaços preenchidos chegar a:</p>
                <h1 className='device-option-title'>0 <IonIcon className='counter' icon={add} /> <IonIcon className='counter' icon={remove} /></h1>
                <IonGrid className='grid'>
                    <IonRow>
                        <Empty />
                        <Empty />
                        <Empty />
                        <Empty />
                        <Full />
                        <Full />
                        <Full />
                        <Full />
                    </IonRow>
                </IonGrid>
            
            <Footer />
        </div>
    );  
};

export default DeviceOptions;

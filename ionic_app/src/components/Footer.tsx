import React, { useState } from 'react';
import { IonRow, IonCol, IonIcon } from '@ionic/react';
import { useHistory, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import favorites from '/public/favorites.svg';
import devices from '/public/devices.svg';
import automation from '/public/automation.svg';

const Footer: React.FC = () => {
  const history = useHistory();

  const devicesPage = () => {
    history.push('/home');
  };

  const automationPage = () => {
    history.push('/automation');
  };

  const favoritesPage = () => {
    history.push('/favorites');
  };

  return (
    <footer id='footer'>
        <IonRow>
            <IonCol><IonIcon onClick={favoritesPage} icon={favorites} />Favoritos</IonCol>
            <IonCol><IonIcon onClick={devicesPage} id='actual' icon={devices} /><span className='actual-page'>Dispositivos</span></IonCol>
            <IonCol><IonIcon onClick={automationPage} icon={automation} />Automação</IonCol>
        </IonRow>
    </footer>
  );
};

export default Footer;
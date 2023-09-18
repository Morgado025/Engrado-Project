import React from 'react';
import { IonRow, IonCol, IonIcon } from '@ionic/react';

import favorites from '/public/favorites.svg';
import devices from '/public/devices.svg';
import automation from '/public/automation.svg';

const Footer: React.FC = () => {
  return (
    <footer id='footer'>
        <IonRow>
            <IonCol><IonIcon icon={favorites} />Favoritos</IonCol>
            <IonCol><IonIcon id='actual' icon={devices} /><span className='actual-page'>Dispositivos</span></IonCol>
            <IonCol><IonIcon icon={automation} />Automação</IonCol>
        </IonRow>
    </footer>
  );
};

export default Footer;
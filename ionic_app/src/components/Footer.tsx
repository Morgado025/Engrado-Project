import React from 'react';
import { IonIcon, IonTabBar, IonTabButton, IonLabel, IonTabs } from '@ionic/react';

import favorites from '/public/favorites.svg';
import cube from '/public/cube.svg';
import automation from '/public/automation.svg';

import './Footer.css';

const Footer: React.FC = () => {

  return (
    <IonTabBar slot='bottom' id='footer'>
        <IonTabButton tab='favorites' href='/favorites'>
            <IonIcon aria-hidden="true" icon={favorites} />
            <IonLabel>Favoritos</IonLabel>
        </IonTabButton>
        <IonTabButton tab='home' href='/devices'>
            <IonIcon aria-hidden="true" icon={cube} />
            <IonLabel>Dispositivos</IonLabel>
        </IonTabButton>
        <IonTabButton tab='automation' href='/automation'>
            <IonIcon aria-hidden="true" icon={automation} />
            <IonLabel>Automação</IonLabel>
        </IonTabButton>
    </IonTabBar>
  );
};

export default Footer;
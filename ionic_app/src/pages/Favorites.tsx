import React, { useState } from 'react';
import { useHistory, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './Devices.css';

import avatar from '/public/avatar.svg';
import cube from '/public/cube.svg';
import wine from '/public/wine.svg';
import favorites from '/public/favorites.svg';
import devices from '/public/devices.svg';
import automation from '/public/automation.svg';
import setting from '/public/settings.svg';
import add from '/public/add.svg';
import chevron from '/public/chevron-down.svg';

import Empty from '../components/Empty';
import Full from '../components/Full';
import TitleComponent from '../components/Title';
import Footer from '../components/Footer'

import ProfileSettings from '../pages/ProfileSettings';

import {
  IonToolbar,
  IonButton,
  IonIcon,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonActionSheet,
  IonAlert,
  IonRouterOutlet,
  useIonAlert,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

const Device: React.FC = () => {

  return (
    <div className='container'>
        <TitleComponent title="Favoritos" />
        <IonGrid className='grid'>
            <IonRow>
                {/* TODO: Add new IonCol dynamically with "Adicionar" button */}
                <IonCol><IonIcon icon={cube} className="icons" />Engrado Classic</IonCol>
                <IonCol><IonIcon icon={wine} className="icons" /> Vinhos</IonCol>
            </IonRow>
        </IonGrid>
        <IonButton className='ion-no-shadow' id='add-button'>Adicionar <IonIcon icon={add} /></IonButton>
        <Footer />
    </div>
  );
};

export default Device;

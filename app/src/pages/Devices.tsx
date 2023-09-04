import React, { useState } from 'react';
import './Devices.css'
import login_icon from '/public/person-circle.svg'
import cube from '/public/cube.svg'
import wine from '/public/wine.svg'
import favorites from '/public/favorites.svg'
import automation from '/public/automation.svg'
import setting from '/public/settings.svg'
import add from '/public/add.svg'
import devices from '/public/devices.svg'

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCheckbox,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonFooter,
  IonTabBar,
  IonTabButton,
} from '@ionic/react';
import { addOutline, home, settings, person} from 'ionicons/icons';

const MinhaPagina: React.FC = () => {
  return (
    <div className='container'>
      <IonToolbar className='toolbar'>
        <IonLabel className='title'>
          Dispositivos <IonIcon icon={login_icon} className='login-icon'></IonIcon>
        </IonLabel>
      </IonToolbar>
      <div className='list'>
        <IonSelect className='select' labelPlacement="fixed" placeholder="Dispensa">
          <IonSelectOption className='options' value="cozinha">Cozinha do restaurante</IonSelectOption>
          <IonSelectOption className='options' value="dispensa">Dispensa</IonSelectOption>
          <IonSelectOption className='options' value="sala">Geladeira</IonSelectOption>
          <IonSelectOption className='options' value="restaurante">Restaurante</IonSelectOption>
        </IonSelect>
      </div>
      <IonGrid className='grid'>
        <IonRow>
          <IonCol><IonIcon icon={cube} className="icons" />Engrado Classic</IonCol>
          <IonCol><IonIcon icon={wine} className="icons" /> Vinhos</IonCol>
        </IonRow>
      </IonGrid>
      <IonButton id='add-button'>Adicionar <IonIcon icon={add} /></IonButton>
      <footer id='footer'>
        <IonRow>
          <IonCol><IonIcon icon={favorites} />Favoritos</IonCol>
          <IonCol><IonIcon id='actual' icon={devices} /><span className='actual-page'>Dispositivos</span></IonCol>
          <IonCol><IonIcon icon={automation} />Automação</IonCol>
          <IonCol><IonIcon icon={setting} />Configuração</IonCol>
        </IonRow>
      </footer>
    </div>
  );
};

export default MinhaPagina;

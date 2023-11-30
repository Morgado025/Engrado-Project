import React, { useState } from 'react';
import { useHistory, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './Devices.css';

import avatar from '/public/avatar.svg';
import cube from '/public/cube.svg';
import wine from '/public/wine.svg';
import favorites from '/public/favorites.svg';
import automation from '/public/automation.svg';
import setting from '/public/settings.svg';
import add from '/public/add.svg';
import chevron from '/public/chevron-down.svg';

import TitleComponent from '../components/Title';
import Footer from '../components/Footer'

import {
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonPage,
} from '@ionic/react';

import users_data from '../data/favorite.json'

const Device: React.FC = () => {  
  const history = useHistory();

  const navigateToDeviceOptions = () => {
    history.push('/device-options');
  };

  const filteredUsers = users_data.users.filter(user => user.content.name === "Maria");

  return (
    <IonPage className='container'>
        <TitleComponent title="Favoritos" />
        <IonGrid className='grid'>
          <IonRow>
            {/* TODO: Add new IonCol dynamically with "Adicionar" button */}
            {/* <IonCol><IonIcon icon={cube} className="icons" />Engrado Classic</IonCol> */}
            {filteredUsers.map((item, index) => (
              <div key={index}>
                <IonCol onClick={navigateToDeviceOptions}>
                  <IonIcon icon={wine} className='icons'/> {item.content.title}
                </IonCol>
              </div>
            ))}
          </IonRow>
        </IonGrid>
        <Footer />
    </IonPage>
  );
};

export default Device;

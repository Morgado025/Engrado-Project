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


const AddNewIonCol: React.FC<{ environmentName: string }> = ({ environmentName }) => {
  return (
    <IonCol><IonIcon icon={wine} className="icons" />{environmentName}</IonCol>
  );
};

const Device: React.FC = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const [buttonText, setButtonText] = useState('Dispensa');

  const [showAlert, setShowAlert] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [components, setComponent] = useState<JSX.Element[]>([]);

  const history = useHistory();

  const navigateToDetailsPage = () => {
    history.push('/details');
  };

  const addComponent = (value: string) => {
    const newComponents = [...components, <AddNewIonCol key={components.length} environmentName={value} />];
    setComponent(newComponents);
  };

  const options = [
    { text: 'Cozinha do restaurante', value: 'cozinha', css: 'action-sheet-options kitchen' },
    { text: 'Dispensa', value: 'pantry', css: 'action-sheet-options pantry' },
    { text: 'Geladeira', value: 'refrigerator', css: 'action-sheet-options refrigerator' },
    { text: 'Restaurante', value: 'restaurant', css: 'action-sheet-options restaurant' },
    { text: 'Adicionar ambiente', value: 'environment', css: 'action-sheet-options new-environment' },
  ];

  const openActionSheet = () => setShowActionSheet(true);

  const closeActionSheet = () => setShowActionSheet(false);

  const handleOptionClick = (value: string, text: string) => {
    setSelectedOption(value);
    setButtonText(text);
    closeActionSheet();
  };

  const handleAlertConfirm = (value: any) => {
    console.log(`value: ${value}`);
    addComponent(value);
    setInputValue(value);
    setShowAlert(false);
  };

  const alertAddEnvironment = () => {
    return (
      <IonAlert
        cssClass="alert"
        isOpen={showAlert}
        onDidDismiss={() => {setShowAlert(false); setInputValue('');}}
        header={'INSIRA O NOME DO AMBIENTE'}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                setShowAlert(false);
              }
            },
            {
              text: 'OK',
              cssClass: 'secondary',
              handler: (data) => {
                const trimmedValue = data.name.substring(0, 25).padEnd(25, ' ');
                handleAlertConfirm(trimmedValue);
              }
            }
          ]}
          inputs={[
            {
              name: 'name',
              type: 'text',
              placeholder: '(máx 15 caracteres)',
              attributes: {
                maxlength: 15,
              },
              value: inputValue,
            }
          ]}
      />
    );
  }

  return (
    <div className='container'>
      <TitleComponent title="Dispositivos" />
      <div className='list'>
        <IonButton className='select' fill='clear' onClick={ openActionSheet }>{buttonText} <IonIcon icon={chevron}></IonIcon></IonButton>
        <div className='list-items'>
          <IonActionSheet
            isOpen={showActionSheet}
            onDidDismiss={closeActionSheet}
            buttons={options.map((option) => ({
              text: option.text !== 'Adicionar ambiente' ? option.text : option.text,
              cssClass: option.css,
              handler: () => option.text !== 'Adicionar ambiente' ? handleOptionClick(option.value, option.text) : setShowAlert(true)
            }))}
            cssClass="action-sheet"
          />
        </div>
        {alertAddEnvironment()}
      </div>
      <IonGrid className='grid'>
        <IonRow>
          {/* TODO: Add new IonCol dynamically with "Adicionar" button */}
          {/* <IonCol><IonIcon icon={cube} className="icons" />Engrado Classic</IonCol> */}
          {/* <IonCol><IonIcon icon={wine} className="icons" /> Vinhos</IonCol> */}
          {components.map((component, index) => (
            <div key={index}>{component}</div>
          ))}
        </IonRow>
      </IonGrid>
      <IonButton className='ion-no-shadow' id='add-button'>Adicionar <IonIcon icon={add} /></IonButton>
      <Footer />
    </div>
  );
};

export default Device;

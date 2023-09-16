import React, { useState } from 'react';
import './Devices.css'

import login_icon from '/public/person-circle.svg'
import cube from '/public/cube.svg'
import wine from '/public/wine.svg'
import favorites from '/public/favorites.svg'
import devices from '/public/devices.svg'
import automation from '/public/automation.svg'
import setting from '/public/settings.svg'
import add from '/public/add.svg'
import chevron from '/public/chevron-down.svg'
import { addCircleOutline } from 'ionicons/icons';

import Empty from '../components/Empty'
import Full from '../components/Full'

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
  IonActionSheet,
  IonAlert,
  useIonAlert,
} from '@ionic/react';
import { addOutline, home, settings, person} from 'ionicons/icons';

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
      <IonToolbar className='toolbar'>
        <IonLabel className='title'>
          Dispositivos <IonIcon icon={login_icon} className='login-icon'></IonIcon>
        </IonLabel>
      </IonToolbar>
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
      <IonButton id='add-button'>Adicionar <IonIcon icon={add} /></IonButton>
      <footer id='footer'>
        <IonRow>
          <IonCol><IonIcon icon={favorites} />Favoritos</IonCol>
          <IonCol><IonIcon id='actual' icon={devices} /><span className='actual-page'>Dispositivos</span></IonCol>
          <IonCol><IonIcon icon={automation} />Automação</IonCol>
        </IonRow>
      </footer>
    </div>
  );
};

export default Device;

import React, { useEffect, useState } from 'react';
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

import Empty from '../components/Empty';
import Full from '../components/Full';
import TitleComponent from '../components/Title';
import Footer from '../components/Footer'

import ProfileSettings from '../pages/ProfileSettings';

import {
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonActionSheet,
  IonAlert,
  IonPage,
  IonToast,
} from '@ionic/react';
import axios from 'axios';

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

  const [data, setData] = useState<any>(null)

  const [showToast, setShowToast] = useState(false);
  const [errorToastMessage, setErrorToastMessage] = useState<string | null>(null);  

  const history = useHistory();

  const navigateToDeviceOptions = () => {
    history.push('/device-options');
  };

  const addComponent = (value: string) => {
    const newComponents = [...components, <AddNewIonCol key={components.length} environmentName={value} />];
    setComponent(newComponents);
  };

  const options = [
    { text: 'Cozinha do restaurante', value: 'cozinha', css: 'action-sheet-options kitchen' },
    { text: 'Dispensa', value: 'dispensa', css: 'action-sheet-options pantry' },
    { text: 'Geladeira', value: 'geladeira', css: 'action-sheet-options refrigerator' },
    { text: 'Restaurante', value: 'restaurante', css: 'action-sheet-options restaurant' },
    { text: 'Adicionar ambiente', value: 'ambiente', css: 'action-sheet-options new-environment' },
  ];

  const openActionSheet = () => {
    setShowActionSheet(true);
  }

  const closeActionSheet = () => {
    setShowActionSheet(false);
  }

  const openAlert = () => setShowAlert(true)

  const handleOptionClick = (value: string, text: string) => {
    setSelectedOption(value);
    setButtonText(text);
    closeActionSheet();
  };

  const handleAlertConfirm = (userValue: any) => {
    addComponent(userValue);
    setInputValue(userValue);
    addBox(userValue)
    setShowAlert(false);
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            // TODO: Change endpoint
            const response = await axios.get('http://127.0.0.1:8000/', {
            headers: {
                'user_id': `${localStorage.getItem("token")}`,
            },
        });
        setData(response.data);
        } catch(error) {
            setErrorToastMessage(`${error}`);
            setShowToast(true);
        }
    };
    fetchData();
}, []);

  const addBox = async (value: any) => {
    try {
        // TODO: Change endpoint  
        const response = await axios.post('http://127.0.0.1:8000/', {"engrado_name": value}, {
            headers: {
                'Content-Type': 'application/json',
                'user_id': `${localStorage.getItem("token")}`,
            },
        });
        if(response.status === 200) {
            console.log("deu certo");
        }
        } 
        catch (error:any) {
        if (error) {
            setErrorToastMessage(`Ops! Não foi possível salvar as alterações, ${error}`);
            setShowToast(true);
        }
    }   
  }


  const alertAddEnvironment = (setAlert: any) => {
    return (
      <IonAlert
        cssClass="alert"
        isOpen={showAlert}
        onDidDismiss={() => {setAlert(false); setInputValue('');}}
        header={'INSIRA O NOME DO AMBIENTE'}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                setAlert(false);
              }
            },
            {
              text: 'OK',
              cssClass: 'secondary',
              handler: (data) => {
                const trimmedValue = data.name.substring(0, 25).padEnd(25, ' '); // 25 characters
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
    <IonPage className='container'>
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
              handler: () => option.text !== 'Adicionar ambiente' ? handleOptionClick(option.value, option.text) : console.log('')
            }))}
            cssClass="action-sheet"
          />
        </div>
        {alertAddEnvironment(setShowAlert)}
      </div>
      <IonGrid className='grid'>
        <IonRow>
          {/* TODO: Add new IonCol dynamically with "Adicionar" button */}
          {/* <IonCol><IonIcon icon={cube} className="icons" />Engrado Classic</IonCol> */}
          {/* <IonCol><IonIcon icon={wine} className="icons" /> Vinhos</IonCol> */}
          {components.map((component, index) => (
            <div onClick={navigateToDeviceOptions} key={index}>{component}</div>
          ))}
        </IonRow>
      </IonGrid>
      <IonToast
      isOpen={showToast}
      onDidDismiss={() => {
          setShowToast(false);
          setErrorToastMessage(null);
      }}
      message={errorToastMessage || ''}
      duration={3000}
      position="top"
      color="danger"
      />
      <IonButton className='ion-no-shadow' id='add-button' onClick={openAlert}>Adicionar <IonIcon icon={add} /></IonButton>
      <Footer />
    </IonPage>
  );
};

export default Device;

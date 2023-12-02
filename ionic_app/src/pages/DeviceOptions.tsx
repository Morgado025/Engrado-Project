import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './DeviceOptions.css';

import { IonButton, IonGrid, IonIcon, IonPage, IonRow, IonToast } from '@ionic/react';

import Empty from '../components/Empty'
import Full from '../components/Full'
import TitleComponent from '../components/Title';

import add from '/public/add.svg';
import remove from '/public/remove.svg';
import arrow from '/public/arrow-back.svg'
import settings from '/public/settings.svg'
import favorites from '/public/favorites.svg'

import axios from 'axios';


const DeviceOptions: React.FC = () => {
    const [showToast, setShowToast] = useState(false);
    const [errorToastMessage, setErrorToastMessage] = useState<string | null>(null);  
    const [showToastSucess, setShowToastSucess] = useState(false)
    const [sucessToastMessage, setSucessToastMessage] = useState<string | null>(null)
    const [isFavorite, setIsFavorite] = useState(false);
    const [weight, setWeight] = useState<string | null>(null)

    const history = useHistory();
    
    const navigateToHomePage = () => {
        history.goBack();
    };
    
    const navigateToProfileSettings = () => {
        history.push('/details');
    };
    
    const [count, setCount] = useState(0);
    const [data, setData] = useState<any>(null)

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
    
    const incrementCounter = () => {
        if (count < 4) {
            setCount(prevCounter => prevCounter + 1);
        }
    };

    const decrementCounter = () => {
        if (count > 0) {
            setCount(prevCounter => prevCounter - 1);
        }
    };

    useEffect(() => {
        const fetchDataMqtt = async () => {
            try {
                // TODO: Change endpoint
                const response = await axios.get('http://127.0.0.1:8000/api/mqtt', {
                headers: {
                    'user_id': `${localStorage.getItem("token")}`,
                },
            }); 
            } catch(error) {
                setErrorToastMessage(`${error}`);
                setShowToast(true);
            }
        };
        fetchDataMqtt();
    }, []);

    useEffect(() => {
        const fetchDataAPI = async () => {
            try {
                // TODO: Change endpoint
                const response = await axios.get('http://127.0.0.1:8000/api/mqtt/dados', {
                headers: {
                    'user_id': `${localStorage.getItem("token")}`,
                },
            });
            setWeight(response.data.json_weight)
            } catch(error) {
                setErrorToastMessage(`${error}`);
                setShowToast(true);
            }
        };
        fetchDataAPI();
    }, []);

    const saveChanges = async () => {
        try {
            // TODO: Change endpoint
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'user_id': `${localStorage.getItem("token")}`,
                },
            });
            if(response.status === 200) {
                setSucessToastMessage("Alterações salvas com sucesso");
                setShowToastSucess(true);
            }
            } 
            catch (error:any) {
            if (error) {
                setErrorToastMessage(`Ops! Não foi possível salvar as alterações, ${error}`);
                setShowToast(true);
            }
        }   
    }

    // TODO: API weight to do Full or Empty (with variable data.)
    const renderComponent = weight > "0.1" || weight < "0.1" ? <Full /> : <Empty />

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite)
    }

    return (
        <IonPage className='container'>
            <div className='header-device-options'>
                <IonIcon onClick={navigateToHomePage} id='arrow-back' icon={arrow}></IonIcon>
                <TitleComponent title="Engrado Classic"></TitleComponent>
                <IonIcon id='arrow-back' onClick={toggleFavorite} icon={favorites} style={{color: isFavorite ? 'red' : 'white'}}></IonIcon>
                <IonIcon onClick={navigateToProfileSettings} id='arrow-back' icon={settings}></IonIcon>
            </div>
            <p className='device-option-notification'>Enviar notificação quando os espaços preenchidos chegar a:</p>
            <h1 className='device-option-title'>{count}
                <IonIcon className='counter' onClick={incrementCounter} icon={add} />
                <IonIcon className='counter' onClick={decrementCounter} icon={remove} />
            </h1>
            <IonGrid className='grid'>
                <IonRow>
                    {renderComponent}
                    <Empty />
                    <Empty />
                    <Empty />
                    <Empty />
                    <Empty />
                    <Empty />
                    <Empty />
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
            <IonToast
            isOpen={showToastSucess}
            onDidDismiss={() => {
                setShowToastSucess(false);
                setSucessToastMessage(null);
            }}
            message={sucessToastMessage || ''}
            duration={3000}
            position="top"
            color="sucess"
            />
            <IonButton className='logout save-changes' color="warning" onClick={saveChanges}>Salvar alterações</IonButton>
        </IonPage>
    );  
};

export default DeviceOptions;

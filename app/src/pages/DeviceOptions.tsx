import React from 'react';
import './DeviceOptions.css';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import Empty from '../components/Empty'
import Full from '../components/Full'

const DeviceOptions: React.FC = () => {
  return (
    <>
        <IonGrid>
            <IonRow className='two'>
                <IonCol><Empty /></IonCol>
                <IonCol><Full /></IonCol>
            </IonRow>
        </IonGrid>
        <IonGrid className='saf'>
            <IonRow className='two'>
                <IonCol><Empty /></IonCol>
                <IonCol><Full /></IonCol>
            </IonRow>
        </IonGrid>
        
    </>
  );
};

export default DeviceOptions;
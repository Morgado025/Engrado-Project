import React from 'react';
import "./Full.css"
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

const Empty: React.FC = () => {
  return (
    <IonCardHeader className='full'>
        Preenchido
    </IonCardHeader>    
  );
};

export default Empty;
import React from 'react';
import "./Full.css"
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

const Empty: React.FC = () => {
  return (
    <IonCardHeader className='full'>
        <span className='som'>Preenchido</span>
    </IonCardHeader>    
  );
};

export default Empty;
import React from 'react';
import './Empty.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

const Full: React.FC = () => {
  return (
    <IonCardHeader className='empty'>
        <span className='som'>Vazio</span>
    </IonCardHeader>    
  );
};

export default Full;
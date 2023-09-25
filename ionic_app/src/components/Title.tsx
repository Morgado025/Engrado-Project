import React from 'react';
import { IonToolbar, IonLabel, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import avatar from '/public/avatar.svg'

interface Title {
  title: string;
}

const TitleComponent: React.FC<Title> = ({ title }) => {
  const history = useHistory();

  const navigateToDetailsPage = () => {
    history.push('/details');
  };

  return (
    <IonToolbar className='toolbar'>
        <IonLabel className='title'>
            {title} <IonIcon onClick={navigateToDetailsPage} icon={avatar} className='login-icon'></IonIcon>
        </IonLabel>
    </IonToolbar>
  );
};

export default TitleComponent;

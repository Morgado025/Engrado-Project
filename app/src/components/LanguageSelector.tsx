import React from 'react';
import { IonSelect, IonSelectOption } from '@ionic/react';
import chevron from '/public/chevron-down.svg';

import './LanguageSelector.css';

const LanguageSelector: React.FC = () => {
  const languageOptions = [
    'English',
    'Español',
    'Portugues (Brasil)',
    'Français',
    'Deutsch',
  ];
  
  return (
    <div className='language-selector-container'>
      <IonSelect placeholder='Portugues (Brasil)' toggleIcon={chevron} className="centered">
        {languageOptions.map((language, index) => (
          <IonSelectOption key={index} value={language}>
            {language}
          </IonSelectOption>
        ))}
      </IonSelect>
    </div>
  );
};

export default LanguageSelector;

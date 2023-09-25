import React from 'react';
import { IonInput, IonLabel } from '@ionic/react';

interface CustomInputProps {
  label: string;
  value: string;
  onIonChange: (e: CustomEvent) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, value, onIonChange }) => {
  return (
    <div className="custom-input-container">
      <IonInput value={value} onIonChange={onIonChange}></IonInput>
      <IonLabel position="floating">{label}</IonLabel>
    </div>
  );
};

export default CustomInput;

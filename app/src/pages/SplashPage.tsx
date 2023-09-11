import React, { useEffect, useState } from 'react';
import { IonButton, IonIcon, IonPage, IonTitle } from '@ionic/react';
import './SplashPage.css'
import wine from '/public/wine.svg'
import logo from '/public/logo.png'
import chevron from '/public/chevron-down.svg'

const SplashPage: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // 3 seconds 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash && (
        <div className="content">
          <img src={logo} alt="logo" className='logo' />
          <h1 className='logo-title'>ENGRADO</h1>
        </div>
      )}
    </>
  );
};

export default SplashPage;

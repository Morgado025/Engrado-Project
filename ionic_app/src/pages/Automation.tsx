import React from 'react';
import './Automation.css';
import TitleComponent from '../components/Title';
import Footer from '../components/Footer'

import {
    IonGrid,
    IonPage,
} from '@ionic/react';

const Automation: React.FC = () => {
    return (
        <IonPage className='container'>
            <TitleComponent title="Automação" />
            <IonGrid className='automation-toolbar'>
                <h1 className='title center'>EM BREVE</h1>
                <p className='text center'>Disponivel nas próximas atualizações</p>
            </IonGrid>  
            <Footer />
        </IonPage>
    );
}

export default Automation;
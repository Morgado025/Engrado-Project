import React from 'react';
import {
  IonContent,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from '@ionic/react';
import { home, settings, person } from 'ionicons/icons';

const MyComponent = () => {
  return (
    <IonContent>
      {/* Your content goes here */}
      <div>Content goes here</div>

      <IonFooter>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
          </IonTabButton>

          <IonTabButton tab="settings" href="/settings">
            <IonIcon icon={settings} />
          </IonTabButton>

          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={person} />
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonContent>
  );
};

export default MyComponent;

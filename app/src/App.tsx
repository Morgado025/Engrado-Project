import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import MqttComponent from './components/MqttComponent';

import Devices from './pages/Devices';
import DeviceOptions from './pages/DeviceOptions';
import ProfileSettings from './pages/ProfileSettings';
import Login from './pages/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      {/* <Devices /> */}
      {/* <ProfileSettings /> */}
      {/* <Login /> */}
      {/* <MqttComponent /> */}
      {/* <DeviceOptions /> */}
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home" component={Devices} />
          <Route exact path="/details" component={ProfileSettings} />
          <Redirect exact from="/" to="/home" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

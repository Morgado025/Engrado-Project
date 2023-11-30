import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonSplitPane, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import Devices from './pages/Devices';
import DeviceOptions from './pages/DeviceOptions';
import ProfileSettings from './pages/ProfileSettings';
import Automation from './pages/Automation';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register'

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
      <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/login" >
              <Login />
            </Route>
            <Route exact path="/register" >
              <Register />
            </Route>
            <Route exact path="/devices" >
              <Devices />
            </Route>
            <Route exact path="/favorites" >
              <Favorites />
            </Route>
            <Route exact path="/details" >
              <ProfileSettings />
            </Route>
            <Route exact path="/automation" >
              <Automation />
            </Route>
            <Route exact path="/device-options" >
              <DeviceOptions />
            </Route>
            <Redirect exact from="/" to="/login" />
          </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

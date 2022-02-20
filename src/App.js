import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import {useAuth} from './Contexts/AuthContext';
import { useHistory } from 'react-router-dom';

// Import Screens
import HomeScreen from './Screens/HomeScreen';
import RecordScreen from './Screens/RecordScreen';
import ListenScreen from './Screens/ListenScreen';

// Extra Screens
import AboutScreen from './ExtraScreens/AboutScreen';
import ContactScreen from './ExtraScreens/ContactScreen';
import PrivacyScreen from './ExtraScreens/PrivacyScreen';
import TermsScreen from './ExtraScreens/TermsScreen';

// Private Route for Admin Pages and Logged In Pages

import PrivateRoute from './PrivateRoute';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Dashboard from './AdminArea/Dashboard';
import WordList from './AdminArea/WordList';
import AllRecordings from './AdminArea/AllRecordings';
import Logout from './Auth/Logout';


function App() {
  return (
    <Router>
        
        <AuthProvider>
          <Switch>
      
              <Route exact path="/" component={HomeScreen} />
              <Route path="/Record" component={RecordScreen} />
              <Route path="/Listen" component={ListenScreen} />
              <Route path="/About" component={AboutScreen} />
              <Route path="/Contact" component={ContactScreen} />
              <Route path="/Privacy" component={PrivacyScreen} />
              <Route path="/Terms" component={TermsScreen} />
              <Route path="/Logout" component={Logout} />
              <Route path="/Login" component={Login} />
              <Route path="/Register" component={Register} />
              <PrivateRoute path="/Dashboard" component={Dashboard} />
              <PrivateRoute path="/Words" component={WordList} />
              <PrivateRoute path="/AllRecordings" component={AllRecordings} />
            </Switch>
        </AuthProvider>

    </Router>

  );
}

export default App;

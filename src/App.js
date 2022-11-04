import ToDo from './Components/ToDo';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Settings from './Components/SettingsForm/SettingsForm';
import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { When } from 'react-if';
import { LoginContext } from './Context/Auth/Auth';

function App() {
  const [incomplete, setIncomplete] = useState([]);
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <Router>
      <Header />
      <When condition={isLoggedIn}>
        <Switch>
          <Route exact path="/">
            <ToDo setIncomplete={setIncomplete} incomplete={incomplete}/>
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Switch>
      </When>
      <Footer />
    </Router>
  );
}

export default App;

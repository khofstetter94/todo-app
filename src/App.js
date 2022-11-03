import ToDo from './Components/ToDo';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Settings from './Components/SettingsForm/SettingsForm';
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// import Auth from './Components/auth/auth';
// import Login from './Components/auth/login';
// import LoginContext from './Components/auth/context';

function App() {
  const [incomplete, setIncomplete] = useState([]);
  return (
    <Router>
      <Header incomplete={incomplete} />
      <Switch>
        <Route exact path="/">
          <ToDo setIncomplete={setIncomplete} />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

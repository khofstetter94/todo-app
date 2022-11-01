// import React, { useContext } from 'react';
import Header from './Components/Header/Header';
import ToDo from './Components/ToDo';
import Footer from './Components/Footer/Footer';
// import { SettingsContext } from './Context/Settings/Settings';


function App() {
  // const value = useContext(SettingsContext);
  return (
    <>
      <Header />
      <ToDo />
      <Footer />
      {/* <h2>SettingsProvider Initial State</h2>
      {value ? <h3 data-testid="settings-test">{value.settings} from context</h3> : null} */}
    </>
  );
}

export default App;

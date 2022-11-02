import React, { useState } from 'react';

export const SettingsContext = React.createContext();

// local storage information retrieval source: https://blog.logrocket.com/using-localstorage-react-hooks/

function SettingsProvider({ children }) {
  const [display, setDisplay] = useState(() => {
    const saved = localStorage.getItem("display");
    const initialValue = JSON.parse(saved);
    return initialValue || true;
  })
  const [displayNumber, setDisplayNumber] = useState(() => {
    const saved = localStorage.getItem("displayNumber");
    const initialValue = JSON.parse(saved);
    return initialValue || 3;
  })
  const [sortField, setSortField] = useState(() => {
    const saved = localStorage.getItem("sort");
    const initialValue = saved;
    return initialValue || 'difficulty';
  })
  const [showCompleted, setShowCompleted] = useState(false)


  const values = {
    display,
    displayNumber,
    sortField,
    showCompleted,
    setDisplay,
    setDisplayNumber,
    setSortField,
    setShowCompleted,
  }

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )
};

export default SettingsProvider

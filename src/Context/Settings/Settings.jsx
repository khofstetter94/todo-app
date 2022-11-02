import React, { useState } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider({ children }) {
  const [display, setDisplay] = useState(true)
  const [displayNumber, setDisplayNumber] = useState(3)
  const [sortField, setSortField] = useState('difficulty')


  const values = {
    display,
    displayNumber,
    sortField,
    setDisplay,
    setDisplayNumber,
    setSortField,
  }

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )
};

export default SettingsProvider

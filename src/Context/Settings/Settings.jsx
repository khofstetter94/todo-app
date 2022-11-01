import React, { useState } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider({ children }) {
  const [settings, setSettings] = useState('Settings')
  const [display, setDisplay] = useState(true)
  const [displayNumber, setDisplayNumber] = useState(3)
  const [sortField, setSortField] = useState('')


  const values = {
    settings,
    display,
    displayNumber,
    sortField,
  }

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider

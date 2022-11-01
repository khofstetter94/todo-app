import React, { useState } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider({ children }) {
  const [settings] = useState('Settings')
  const [display] = useState(true)
  const [displayNumber] = useState(3)
  const [sortField] = useState('')


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

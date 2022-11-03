import React, { useState, useContext } from 'react';
import { SettingsContext } from '../../Context/Settings/Settings.jsx';
import { Card, Grid, TextInput, Button, Switch, NumberInput, Text } from '@mantine/core';
import Auth from '../../Components/Auth/Auth';

const Settings = () => {
  const [isShown, setIsShown] = useState(false);
  const { display, setDisplay, displayNumber, setDisplayNumber, sortField, setSortField } = useContext(SettingsContext);

  function handleSubmit(e) {
    e.preventDefault()
    setIsShown(true);
  }

  return (
    <>
      <Grid style={{ width: '80%', margin: 'auto' }}>
        <Auth capability="create">
          <Grid.Col xs={12} sm={6}>
            <Card withBorder p="xs">

              <Text weight={700} size="lg" style={{ marginBottom: '-18px' }}>Update Settings</Text>

              <form onSubmit={handleSubmit}>

                {/* Local storage insertion source: https://blog.logrocket.com/using-localstorage-react-hooks/ */}

                <Switch style={{ marginBottom: '10px' }} label="Show Completed ToDos" checked={display} onChange={(event) => { setDisplay(event.currentTarget.checked); localStorage.setItem("display", display); }} />

                <NumberInput defaultValue={3} placeholder="3" label="Items Per page" value={displayNumber} onChange={(val) => { setDisplayNumber(val); localStorage.setItem("displayNumber", val.toString()); }} />

                <TextInput
                  placeholder="difficulty"
                  name="sort"
                  onChange={(e) => { setSortField(e.target.value); localStorage.setItem("sort", e.target.value); }}
                  label="Sort Keyword"
                />

                <Button type="submit" style={{ marginTop: '15px' }}>Show New Settings</Button>

              </form>
            </Card>
          </Grid.Col>
        </Auth>
        <Grid.Col xs={12} sm={6}>
          {isShown && (
            <Card withBorder>
              <h2>Updated Settings</h2>
              <Text><small>{display ? 'Show' : 'Hide'} Completed ToDos</small></Text>
              <Text><small>Items Per page: {displayNumber}</small></Text>
              <Text><small>Sort Keyword: {sortField}</small></Text>
            </Card>
          )}
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Settings;

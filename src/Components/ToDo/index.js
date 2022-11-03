import React, { useEffect, useState, useContext } from 'react';
import { SettingsContext } from '../../Context/Settings/Settings.jsx';
import useForm from '../../hooks/form.js';
// import './styles.scss';
import List from '../List/List';
import Auth from '../../Components/Auth/Auth';

import { v4 as uuid } from 'uuid';
import { Card, Grid, TextInput, Slider, Text, Button } from '@mantine/core';

const ToDo = ({ setIncomplete }) => {
  const { display } = useContext(SettingsContext);

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    console.log(item);
    setList([...list, {
      ...item,
      id: uuid(),
      complete: false,
      display: display,
    }]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
        item.display = !item.display;
      }
      return item;
    });

    setList(items);

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    // linter will want 'incomplete' added to dependency array unnecessarily.
    // disable code used to avoid linter warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return (
    <>
      <Grid style={{ width: '80%', margin: 'auto' }}>
        <Auth capability="create">
          <Grid.Col xs={12} sm={4}>
            <Card withBorder p="xs">

              <h2>Add To Do Item</h2>

              <form onSubmit={handleSubmit}>
                <TextInput
                  placeholder="Item Details"
                  name="text"
                  onChange={handleChange}
                  label="To Do Item"
                />

                <TextInput
                  placeholder="Assignee Name"
                  name="assignee"
                  onChange={handleChange}
                  label="Assigned To"
                />

                <Text>Difficulty</Text>
                <Slider
                  onChange={handleChange}
                  defaultValue={defaultValues.difficulty}
                  min={0}
                  max={5}
                  step={1}
                  name="difficulty"
                  type="range"
                  mb='lg'
                />

                <Button type="submit">Add Item</Button>

              </form>
            </Card>
          </Grid.Col>
        </Auth>
        <Grid.Col xs={12} sm={8}>
          <List toggleComplete={toggleComplete} list={list} deleteItem={deleteItem} />
        </Grid.Col>
      </Grid>

    </>
  );
};

export default ToDo;

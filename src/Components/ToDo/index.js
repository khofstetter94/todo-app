import React, { useEffect, useState } from 'react';
// import { SettingsContext } from '../../Context/Settings/Settings.jsx';
import useForm from '../../hooks/form.js';
// import './styles.scss';
import List from '../List/List';
import Auth from '../../Components/Auth/Auth';

// import { v4 as uuid } from 'uuid';
import { Card, Grid, TextInput, Slider, Text, Button, createStyles } from '@mantine/core';
import axios from 'axios';

const ToDo = ({ setIncomplete, incomplete }) => {
  // const { display } = useContext(SettingsContext);

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  const useStyles = createStyles((theme) => ({
    h1: {
      backgroundColor: theme.colors.gray[8],
      color: theme.colors.gray[2],
      width: '80%',
      margin: 'auto',
      fontSize: theme.fontSizes.md,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
      marginTop: theme.spacing.md,
    }
  }))

  const { classes } = useStyles();

  function addItem (item) {
    let response = axios.post('https://api-js401.herokuapp.com/api/v1/todo', {
      text: item.text,
      assignee: item.assignee,
      complete: item.complete,
      difficulty: item.difficulty,
    })
    .then((response) => {
      console.log(response);
    });
    setList([...list, response.data]);
  };

  // function addItem(item) {
  //   console.log(item);
  //   setList([...list, {
  //     ...item,
  //     id: uuid(),
  //     complete: false,
  //     display: display,
  //   }]);
  // }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

  }

  useEffect(() => {
    (async () => {
      let response = await axios.get('https://api-js401.herokuapp.com/api/v1/todo');
      let results = response.data.results;
      console.log(results);
      setList(results)
    })();
  }, []);

  return (
    <>
      <h1 className={classes.h1} data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
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

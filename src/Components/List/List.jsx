import { useState, useContext } from 'react';
import { SettingsContext } from '../../Context/Settings/Settings';
import { Card, Pagination, Button, Badge, Text, CloseButton, Group } from '@mantine/core';
import Auth from '../../Components/Auth/Auth';

const List = (props) => {
  const { displayNumber } = useContext(SettingsContext);

  const listArray = props.list.filter(item => item.display).map(item => (
    <Auth capability="read">
      <Card key={item.id} withBorder shadow="md" pb="xs" mb="sm">
        <Card.Section withBorder inheritPadding py="xs">
          <Group position="apart">
            <Group position="left">
              <Badge color={item.complete ? "green" : "red"} variant="filled" style={{ marginRight: '20px' }}>{item.complete ? "Complete" : "Pending"}</Badge>
              {item.assignee}
            </Group>
            <Auth capability="delete">
              <CloseButton title="Delete To Do Item" onClick={() => props.deleteItem(item.id)} />
            </Auth>
          </Group>
        </Card.Section>
        <p>{item.text}</p>
        <Button onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</Button>
        <Text align="right"><small>Difficulty: {item.difficulty}</small></Text>
      </Card>
    </Auth>
  ));

  // SOURCE for lines 18-23: https://ihsavru.medium.com/react-paginate-implementing-pagination-in-react-f199625a5c8e
  const [activePage, setPage] = useState(1);
  const perPage = displayNumber;
  const offset = (activePage - 1) * perPage;
  const currentPageData = listArray.slice(offset, offset + perPage);
  const pageCount = Math.ceil(listArray.length / perPage);

  return (
    <>
      {currentPageData}
      <Pagination page={activePage} pageCount={pageCount} onChange={setPage} total={pageCount} />
    </>
  );
};

export default List;

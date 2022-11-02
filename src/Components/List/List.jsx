import { useState, useContext } from 'react';
import { SettingsContext } from '../../Context/Settings/Settings';
import { Card, Pagination, Button, Badge, Text } from '@mantine/core';

const List = (props) => {
  const {displayNumber } = useContext(SettingsContext);

  const listArray = props.list.filter(item => item.display).map(item => (
    <Card key={item.id} withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Badge color="green" variant="filled" style={{ marginRight: '20px' }}>Pending</Badge>
        {item.assignee}
      </Card.Section>
      <p>{item.text}</p>
      <Button onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</Button>
      <Text align="right"><small>Difficulty: {item.difficulty}</small></Text>
    </Card>
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

import { useState, useContext } from 'react';
import { SettingsContext } from '../../Context/Settings/Settings';
import { Pagination } from '@mantine/core';

const List = (props) => {
  const {displayNumber } = useContext(SettingsContext);

  const listArray = props.list.filter(item => item.display).map(item => (
    <div key={item.id}>
      <p>{item.text}</p>
      <p><small>Assigned to: {item.assignee}</small></p>
      <p><small>Difficulty: {item.difficulty}</small></p>
      <div onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
      <hr />
    </div>
  ));

  // SOURCE for lines 18-23: https://ihsavru.medium.com/react-paginate-implementing-pagination-in-react-f199625a5c8e
  const [activePage, setPage] = useState(1);
  const perPage = displayNumber;
  const offset = (activePage - 1) * perPage;
  const currentPageData = listArray.slice(offset, offset + perPage);
  const pageCount = Math.ceil(listArray.length / perPage);

  return (
    <>
      <Pagination page={activePage} pageCount={pageCount} onChange={setPage} total={pageCount} />
      {currentPageData}
    </>
  );
};

export default List;

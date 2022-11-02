import { createStyles, Header, Navbar } from '@mantine/core';
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.blue[6],
    padding: theme.spacing.md,
    fontSize: theme.fontSizes.md,
    color: theme.colors.gray[0],
  },
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
const AppHeader = ({ incomplete }) => {

  const { classes } = useStyles();
  document.title = `To Do List: ${incomplete}`;

  return (
    <>
      <Header data-testid="todo-header">
        <Navbar className={classes.navbar} style={{ display: 'flex' }}>
          <Link to="/" style={{ width: '10%' }}>Home</Link>
          <Link to="/settings" style={{ width: '10%'}}>Settings</Link>
        </Navbar>
        <h1 className={classes.h1} data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
      </Header>
    </>
  );
};

export default AppHeader;

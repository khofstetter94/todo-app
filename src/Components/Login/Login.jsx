import { useContext, useState } from 'react';
import { If, Then, Else } from 'react-if';
// import { When } from 'react-if';

import { Button, TextInput, Group } from '@mantine/core';
import { LoginContext } from '../../Context/Auth/Auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {
    isLoggedIn,
    // user,
    // error,
    // can,
    login,
    logout,
  } = useContext(LoginContext);

  const handleLogout = () => {
    setUsername('');
    setPassword('');
    logout();
  }

  return (
    <>
      <If condition ={isLoggedIn}>
        <Then>
          <Button color="red" onClick={handleLogout}>Log Out</Button>
        </Then>
        <Else>
          <Group>
            <TextInput
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <TextInput
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <Button color="gray.8" onClick={() => login(username, password)}>Login</Button>
          </Group>
        </Else>
      </If>
    </>
  );
}


export default Login;

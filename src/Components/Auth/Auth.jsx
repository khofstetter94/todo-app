import { useContext } from 'react';
import { When } from 'react-if';

import { LoginContext } from '../../Context/Auth/Auth';

const Login = ({ capability, children }) => {
  const { isLoggedIn, can } = useContext(LoginContext);

  return (
    <When condition={isLoggedIn && can(capability)}>
      {children}
    </When>
  );
}

export default Login;

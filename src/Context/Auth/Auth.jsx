import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';

export const LoginContext = React.createContext();

const testUsers = {
  admin: {
    password: 'ADMIN',
    name: 'admin',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
  },
  editor: {
    password: 'EDITOR',
    name: 'editor',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
  },
  writer: {
    password: 'WRITER',
    name: 'writer',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
  },
  user: {
    password: 'USER',
    name: 'user',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
  },
};

const LoginProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  }

  const login = (username, password) => {
    let authCredentials = testUsers[username];

    if (authCredentials && authCredentials.password === password) {
      try {
        _validateToken(authCredentials.token);
      } catch (e) {
        console.error(e);
      }
    }
  }

  function _validateToken(token) {
    try {
      let validUser = jwt_decode(token);
      console.log('validUser: ', validUser);
      if (validUser) {
        setUser(validUser);
        setIsLoggedIn(true);
        console.log('I am logged In')
        cookie.save('auth', token);
      }
    } catch (e) {
      setIsLoggedIn(false);
      setError(e);
      console.error(e);
    }
  }

  const logout = () => {
    setUser({});
    setIsLoggedIn(false);
    setError(null);
    cookie.remove('auth');
  }

  useEffect(() => {
    let token = cookie.load('auth');
    if (token) {
      _validateToken(token)
    }
  }, []);

  let values = {
    isLoggedIn,
    user,
    error,
    can,
    login,
    logout,
  }

  // setLoginState = (loggedIn, token, user, error) => {
  //   cookie.save('auth', token);
  //   this.setState({ token, loggedIn, user, error: error || null });
  // };

  // componentDidMount() {
  //   const qs = new URLSearchParams(window.location.search);
  //   const cookieToken = cookie.load('auth');
  //   const token = qs.get('token') || cookieToken || null;
  //   this.validateToken(token);
  // }

  return (
    <LoginContext.Provider value={values}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginProvider;

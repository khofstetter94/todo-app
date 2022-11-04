import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const LoginContext = React.createContext();

const LoginProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  }

  const login = async (username, password) => {
    let config = {
      baseURL: 'https://api-js401.herokuapp.com',
      url: '/signin',
      method: 'post',
      auth: {
        username,
        password,
      }
    }

    let response = await axios(config);
    console.log('login info: ', response.data);
    let { token } = response.data;

    if (token) {
      try {
        _validateToken(token);
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

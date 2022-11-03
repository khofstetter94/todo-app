import { useContext, useState } from 'react';
// import { When } from 'react-if';

import { LoginContext } from '../../Context/Auth/Auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {
    isLoggedIn,
    user,
    // error,
    // can,
    login,
    // logout,
  } = useContext(LoginContext);

  // static contextType = LoginContext;

  // constructor(props) {
  //   super(props);
  //   this.state = { username: '', password: '' };
  // }

  // handleChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.context.login(this.state.username, this.state.password);
  // };
  return (
    <>
      <label>Username:
        <input onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>Password:
        <input onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={() => login(username, password)}>{isLoggedIn ? 'Login' : 'Logout'}</button>

      {/* <When condition={this.context.loggedIn}>
          <button onClick={this.context.logout}>Log Out</button>
        </When>

        <When condition={!this.context.loggedIn}>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="UserName"
              name="username"
              onChange={this.handleChange}
            />
            <input
              placeholder="password"
              name="password"
              onChange={this.handleChange}
            />
            <button>Login</button>
          </form>
        </When> */}
    </>
  );
}


export default Login;

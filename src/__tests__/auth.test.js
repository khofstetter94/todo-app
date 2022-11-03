import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginProvider, { LoginContext } from '../Context/Auth/Auth';
import Login from '../Components/Login/Login';
import Auth from '../Components/Auth/Auth';

test('Should contain user and isloggedIn initial values', () => {

  render(
    <LoginProvider>
      <LoginContext.Consumer>
        {auth => (
          <>
            <p data-testid="isLoggedIn">{auth.isLoggedIn.toString()}</p>
            <p data-testid="user">{typeof auth.user}</p>
          </>
        )}
      </LoginContext.Consumer>
    </LoginProvider>
  )

  expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('false');
  expect(screen.getByTestId('user')).toHaveTextContent('object');
});

test('Login component should be able to login', () => {

  render(
    <LoginProvider>
      <LoginContext.Consumer>
        {auth =>
          <>
            <Login />
            <p data-testid="isLoggedIn">{auth.isLoggedIn.toString()}</p>
            <p data-testid="capabilities">{`${auth.user.capabilities}`}</p>
          </>
        }
      </LoginContext.Consumer>
    </LoginProvider>
  )

  const usernameInput = screen.getByTestId('username');
  const passwordInput = screen.getByTestId('password');
  const button = screen.getByTestId('login');

  // mocking an event:  change of input
  fireEvent.change(usernameInput, { target: { value: 'admin' } });
  fireEvent.change(passwordInput, { target: { value: 'ADMIN' } });
  fireEvent.click(button);

  expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true');
  expect(screen.getByTestId('capabilities')).toHaveTextContent('create,update,read,delete');

});

test('Auth component should be able to render when logged in', () => {
  render(
    <LoginProvider>
      <LoginContext.Consumer>
        {auth => (
          <>
            <Login />
            <Auth capability="read">
              <p data-testid="test-read">I am Authorized!!</p>
            </Auth>
            <Auth capability="delete">
              <p data-testid="test-delete">I am Authorized!!</p>
            </Auth>
          </>
        )}
      </LoginContext.Consumer>

    </LoginProvider>
  );

  let userInput = screen.getByTestId('username');
  let passInput = screen.getByTestId('password');

  fireEvent.change(userInput, { target: { value: 'user' } });
  fireEvent.change(passInput, { target: { value: 'USER' } });
  fireEvent.click(screen.getByTestId('login'));

  let authorized =  screen.getByTestId('test-read');

  // notice if not expected to exist we use different method.  aka there is nothing to "get"
  let notAuthorized =  screen.queryByTestId('test-delete');

  expect(authorized).toHaveTextContent('I am Authorized!!');
  expect(notAuthorized).not.toBeInTheDocument();

})

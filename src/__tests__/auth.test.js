import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Auth from '../Components/Auth/Auth';
import Login from '../Components/Login/Login';
import LoginProvider, { LoginContext } from '../Context/Auth/Auth';

describe('Auth Integration', () => {
  it('contains initial user and isLoggedIn values', () => {
    render(
      <LoginProvider>
        <LoginContext.Consumer>
          {
            ({isLoggedIn, user}) => (
              <>
                <p data-testid="isLoggedIn"> {isLoggedIn.toString()}</p>
                <p data-testid="user">{typeof(user)}</p>
              </>
            )
          }
        </LoginContext.Consumer>
      </LoginProvider>
    );

    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('false');
    expect(screen.getByTestId('user')).toHaveTextContent('object');
  });
  it('allows for login', () => {
    render(
      <LoginProvider>
        <LoginContext.Consumer>
          {
            ({isLoggedIn, user}) => (
              <>
              <Login />
                <p data-testid="isLoggedIn"> {isLoggedIn.toString()}</p>
                <p data-testid="user">{`${user.capabilities}`}</p>
              </>
            )
          }
        </LoginContext.Consumer>
      </LoginProvider>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const button = screen.getByText('Login');

    fireEvent.change(usernameInput, {target: {value: 'admin'}});
    fireEvent.change(passwordInput, {target: {value: 'ADMIN'}});
    fireEvent.click(button);

    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true');
    expect(screen.getByTestId('user')).toHaveTextContent('create','read','update','delete');

    const logoutButton = screen.getByText('Log Out');
    fireEvent.click(logoutButton);

  });
  it('renders content with Auth component based on capabilities', () => {
    render(
      <LoginProvider>
        <LoginContext.Consumer>
          {
            ({isLoggedIn, user}) => (
              <>
              <Login />
              <Auth capability="read">
                <p data-testid="test-read">I am authorized to read!</p>
              </Auth>
              <Auth capability="delete">
                <p data-testid="test-delete">I am authorized to delete!</p>
              </Auth>
              </>
            )
          }
        </LoginContext.Consumer>
      </LoginProvider>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const button = screen.getByText('Login');

    fireEvent.change(usernameInput, {target: {value: 'user'}});
    fireEvent.change(passwordInput, {target: {value: 'USER'}});
    fireEvent.click(button);

    let authorized = screen.getByTestId('test-read');
    let notAuthorized = screen.queryByTestId('test-delete');

    expect(authorized).toHaveTextContent('I am authorized to read!');
    expect(notAuthorized).not.toBeInTheDocument();

    const logoutButton = screen.getByText('Log Out');
    fireEvent.click(logoutButton);

  })
  it('renders content with Auth component based on admin capabilities', () => {
    render(
      <LoginProvider>
        <LoginContext.Consumer>
          {
            ({isLoggedIn, user}) => (
              <>
              <Login />
              <Auth capability="read">
                <p data-testid="test-read">I am authorized to read!</p>
              </Auth>
              <Auth capability="delete">
                <p data-testid="test-delete">I am authorized to delete!</p>
              </Auth>
              <Auth capability="update">
                <p data-testid="test-update">I am authorized to update!</p>
              </Auth>
              <Auth capability="create">
                <p data-testid="test-create">I am authorized to create!</p>
              </Auth>
              </>
            )
          }
        </LoginContext.Consumer>
      </LoginProvider>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const button = screen.getByText('Login');

    fireEvent.change(usernameInput, {target: {value: 'admin'}});
    fireEvent.change(passwordInput, {target: {value: 'ADMIN'}});
    fireEvent.click(button);

    let authorizedRead = screen.getByTestId('test-read');
    let authorizedDelete = screen.getByTestId('test-delete');
    let authorizedUpdate = screen.getByTestId('test-update');
    let authorizedCreate = screen.getByTestId('test-create');

    expect(authorizedRead).toHaveTextContent('I am authorized to read!');
    expect(authorizedDelete).toHaveTextContent('I am authorized to delete!');
    expect(authorizedUpdate).toHaveTextContent('I am authorized to update!');
    expect(authorizedCreate).toHaveTextContent('I am authorized to create!');

    const logoutButton = screen.getByText('Log Out');
    fireEvent.click(logoutButton);

  })

})

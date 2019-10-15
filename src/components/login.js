import React from 'react'
import './Login.css'

const Login = (props) => {
  const onUsernameChanged = (event) => props.setUsername(event.target.value);
  const onPasswordChanged = (event) => props.setPassword(event.target.value);
  const onLoginClicked = (event) => props.doLogin();
  const onLogoutClicked = (event) => props.doLogout();

  const loginDialog = () => (
    <div>
      <label htmlFor="usernameInput">Username:</label>
      <input type="text" id="usernameInput" onChange={onUsernameChanged} value={props.username} />
      <br/>
      <label htmlFor ="passwordInput">Password:</label>
      <input id="passwordInput" type="password" onChange={onPasswordChanged} value={props.password} />
      <br/>
      <input type="button" onClick={onLoginClicked} value="Login" />
    </div>
    );

  const logoutDialog = () => (
    <div>
      Logged in as <em>{props.username}</em>
      <input type="button" onClick={onLogoutClicked} value="Logout" />
    </div>
  );

  return  (
    <div className="Login">
      { props.isLoggedIn ? logoutDialog() : loginDialog() }
    </div>
  );
}

export default Login;

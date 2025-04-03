import React, { useState } from 'react';
import reactLogo from '/react.svg';
import viteLogo from '/vite.svg';
import Constant from '../../Constants.js';
import './Login.css';
import { Link } from "react-router";
import { loginFetch } from './loginfetch.js';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    loginFetch(username, password).catch((error) => (setError(error.message)));
  };

  return (
    <>
      <div className="Logo">
        <h2>Taskfeed</h2>
      </div>

      <div className="words">
        <h1>Sign In</h1>
        <h3>or create an account</h3>
      </div>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" id="signIn">
          Sign in
        </button>
      </form>

      <p>Don't have an account? </p>
      <Link to="/create_account">Create Account</Link>
    </>
  );
}

export default Login;
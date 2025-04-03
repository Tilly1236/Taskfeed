import React, { useState } from 'react';
import reactLogo from '/react.svg';
import viteLogo from '/vite.svg';
import Constant from '../../Constants.js';
import './Login.css';
import { loginFetch } from './loginfetch.js';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    loginFetch(email, password).catch((error) => (setError(error.message)));
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
    </>
  );
}

export default Login;
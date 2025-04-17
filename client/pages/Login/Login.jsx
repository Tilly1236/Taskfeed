import React, { useState } from 'react';
import { useNavigate } from 'react-router';
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
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await loginFetch(username, password);
      if (response.ok) {
        navigate('/feed'); 
      } else {
        setError('Invalid username or password'); 
      }
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again.');
    }

    //loginFetch(username, password).then(() => (setError("Login complete"))).catch((error) => (setError(error.message)));
  };

  return (
    <>
      <div className="Logo"></div>

      <div className="words">
        <h2>Sign In</h2>
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
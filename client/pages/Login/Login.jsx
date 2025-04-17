import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import reactLogo from '/react.svg';
import viteLogo from '/vite.svg';
import Constant from '../../Constants.js';
import './Login.css';
import { Link } from "react-router";
import { loginFetch } from './loginfetch.js';
import LoginForm from './LoginForm.jsx';

function Login() {
  const [error, setError] = useState('');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      <div className="Logo">
        <h2>Taskfeed</h2>
      </div>

      <div className="words">
        <h1>Sign In</h1>
        <h3>or create an account</h3>
      </div>

      <div>
        <LoginForm
          submitFunction={handleLogin}
          submitText="Sign in"
          confirm={false}
          error={error}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
      </div>

      <p>Don't have an account? </p>
      <Link to="/create_account">Create Account</Link>
    </>
  );
}

export default Login;
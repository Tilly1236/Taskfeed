import React from "react";
import './Login.css';
import { useState } from 'react';

function LoginForm({submitFunction, submitText, confirm, error, username, setUsername, password, setPassword, confirmPassword, setConfirmPassword}){

  return (
  <>
    <form onSubmit={submitFunction}>
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

        {confirm &&
          <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />  
        </div>
        }

      {error && <p className="error">{error}</p>}

      <button type="submit" id="signIn">
        {submitText}
      </button>

    </form>
  </>
  );
}

export default LoginForm;
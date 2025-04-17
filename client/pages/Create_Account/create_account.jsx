import { useState } from 'react';
import { Link } from "react-router";
import { signupFetch } from './signupfetch';

function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
    //Give the user feedback on any incomplete or incorrect information
    if(!username){
        setError("Please provide a username");
        return;
    } else if(!password){
        setError("Please set a password");
        return;
    } else if(!confirmPassword){
        setError("Please confirm your password");
        return;
    } else if(password != confirmPassword){
        setError("Passwords do not match");
        return;
    }
    
    signupFetch(username, password).then(() => (setError("Account created!"))).catch((error) => (setError(error.message)));

    //Reset the feedback for future use
    setError('');
  }

  return (
    
      <div className="create-account-container">
      <div className="Logo"></div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit} className="create-account-form">

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Create Account</button>
      </form>
    
      <p>Already have an account? </p>
      <Link to="/login">Sign in</Link>
    </div>
  )
}

export default CreateAccount
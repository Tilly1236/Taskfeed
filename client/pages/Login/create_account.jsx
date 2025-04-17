import { useState } from 'react';
import { Link } from "react-router";
import { signupFetch } from './signupfetch';
import LoginForm from './LoginForm.jsx';

function CreateAccount() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    } else if(password !== confirmPassword){
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

      <LoginForm
        submitFunction={handleSubmit}
        submitText="Create Account"
        confirm={true}
        error={error}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />
    
      <p>Already have an account? </p>
      <Link to="/login">Sign in</Link>
    </div>
  )
}

export default CreateAccount
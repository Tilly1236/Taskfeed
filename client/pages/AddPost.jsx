import React, { useState } from 'react';
import { postToFeed } from './postfetch'; // your helper

const AddPostPage = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');

    const token = localStorage.getItem("token"); // retrieve token

    if (!token) {
      setError("You must be logged in to post.");
      return;
    }

    try {
      const response = await postToFeed(username, message, token);
      console.log("Post response:", response);

      setSuccess(true);
      setUsername('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Message:</label>
          <textarea
            className="form-control"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Post</button>
      </form>

      {success && <div className="alert alert-success mt-3">Post submitted!</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default AddPostPage;




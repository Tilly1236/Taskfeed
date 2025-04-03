import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postToFeed } from './postfetch';

const AddPostPage = () => {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // 👈 hook for redirect

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to post.');
      return;
    }

    try {
      await postToFeed(message, token);
      setSuccess(true);
      setMessage('');

      //  Redirect to /feed after successful post
      navigate('/feed');
    } catch (err) {
      console.error('Post error:', err);
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add a New Post</h2>
      <form onSubmit={handleSubmit}>
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

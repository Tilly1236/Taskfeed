 import React, { useState } from 'react';

const AddPostPage = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/feed/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          username,
          groupid: 1, // default group for now
          textcontent: message
        })
      });

      if (res.ok) {
        setSuccess(true);
        setUsername('');
        setMessage('');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to post.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
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
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#ffffff";
  }, [darkMode]);

  return (
    <div className={`home-wrapper ${darkMode ? "dark" : "light"}`}>
      <div className="toggle-wrapper">
        <label className="switch">
          <input type="checkbox" onChange={() => setDarkMode(!darkMode)} checked={darkMode} />
          <span className="slider round"></span>
        </label>
        <span className="toggle-label">{darkMode ? "Dark Mode" : "Light Mode"}</span>
      </div>

      <h1 className="display-4 fade-in-up">
        Welcome to <span className="text-primary">TaskFeed</span>
      </h1>
      <p className="lead fade-in-up-delay">
        Manage async group projects like a pro.
      </p>

      <div className="button-group fade-in-up-delay2">
        <button
          onClick={() => navigate("/login")}
          className="btn btn-outline-primary me-3 px-4 py-2"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/create_account")}
          className="btn btn-primary px-4 py-2"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Home;

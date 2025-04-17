// Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <h1 className="display-4 fade-in-up">
        Welcome to <span className="taskfeed-highlight">TaskFeed</span>
      </h1>

      <p className="lead fade-in-up-delay">
        Manage async group projects like a pro.
      </p>

      <div className="button-group fade-in-up-delay2">
        <button
          className="btn me-3"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        <button
          className="btn btn-sky"
          onClick={() => navigate("/create_account")}
        >
          Create Account
        </button>
      </div>

      {/* --- underlined link -------------- */}
      <button
        className="about-link fade-in-up-delay2"
        onClick={() => navigate("/about")}
      >
        About the team →
      </button>
    </div>
  );
}

export default Home;

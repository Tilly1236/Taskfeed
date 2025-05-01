// About.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./About.css";



const teamMembers = [
  { name: "Sanjay Gupta", role: "Full-Stack Engineer" },
  { name: "MaRaya WHite", role: "Tester and Developer" },
  { name: "your name", role: "your role here" },
  { name: "your name", role: "your role here" },
  { name: "your name", role: "your role here" },
  { name: "your name", role: "your role here" },
  { name: "your name", role: "your role here" },



];

function About() {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(false);
    const timeout = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`about-wrapper ${animate ? "animate" : ""}`}>
       <h2 className="about-title">
            Meet the{" "}
        <span className="taskfeed-link" onClick={() => navigate("/")}>
            TaskFeed
        </span>{" "}
            Team
        </h2>

      <div className="card-grid">
        {teamMembers.map(({ name, role }, i) => (
          <div className="member-card" key={i}>
            <h3>{name}</h3>
            <p>{role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;

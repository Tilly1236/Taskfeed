// src/GroupsPage
import React, { useState, useEffect } from "react";
import Constants from "./constants";

const cardStyle = {
  width: "100%",
  textAlign: "left",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
};

const wireframeGroups = [
  { id: 1, name: "Work Group" },
  { id: 2, name: "Robotics" },
  { id: 3, name: "TaskFeed" },
];

export default function GroupsPage() {
  const [groups] = useState(wireframeGroups);
  const [activeGroup, setActiveGroup] = useState(groups[0]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch posts for the selected group
  useEffect(() => {
    const fetchGroupPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${Constants.API_URL}api/feed`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            groupid: activeGroup.id,
            latest: Math.floor(Date.now() / 1000),
            earliest: 1,
          }),
        });
        if (!res.ok) throw new Error(await res.text());
        const json = await res.json();
        setPosts(json.items || json); // adjust if your API wraps in .items
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupPosts();
  }, [activeGroup]);

  return (
    <>
      <nav className="navbar bg-body-tertiary mb-4">
        <div className="container-fluid">
          <button
            className="btn btn-outline-secondary me-3"
            onClick={() => /* implement navigation back if you like */ null}
          >
            ← Back
          </button>
          <span className="navbar-brand">TaskFeed Groups</span>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="row">
          {/* Sidebar: group list */}
          <div className="col-md-3 mb-4">
            <ul className="list-group">
              {groups.map((g) => (
                <li
                  key={g.id}
                  className={
                    "list-group-item " +
                    (activeGroup.id === g.id ? "active" : "text-body-secondary")
                  }
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveGroup(g)}
                >
                  {g.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Main: posts */}
          <div className="col-md-9">
            <h4 className="mb-3">{activeGroup.name}</h4>

            {loading && <p>Loading…</p>}
            {error && <p className="text-danger">{error}</p>}

            {!loading && !error && (
              <div>
                {posts.length ? (
                  posts.map((post) => {
                    const date = new Date(post.created_at * 1000).toLocaleString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      }
                    );
                    return (
                      <div className="mb-4" key={post.id}>
                        <div className="card" style={cardStyle}>
                          <div className="card-body">
                            <h5 className="card-title">{post.username}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">
                              <small>{date}</small>
                            </h6>
                            <p className="card-text">{post.textcontent}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-muted">No posts in this group yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

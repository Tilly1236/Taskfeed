import React, { useState, useEffect } from "react";
import Constants from "./constants";

const cardStyles = {
  width: "100%",
  textAlign: "left",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
};

// Default list of groups for TaskFeed
const defaultGroupList = [
  { id: 1, name: "GroupOne" },
  { id: 2, name: "GroupTwo" },
  { id: 3, name: "GroupThree" },
];

export default function GroupsPage() {
  // List of all available groups
  const [groupList] = useState(defaultGroupList);
  // Currently selected group
  const [selectedGroup, setSelectedGroup] = useState(groupList[0]);
  // Posts fetched for the selected group
  const [groupPosts, setGroupPosts] = useState([]);
  // Loading and error states for API calls
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Load posts whenever selectedGroup changes
  useEffect(() => {
    const loadGroupPosts = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await fetch(`${Constants.API_URL}api/feed`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            groupid: selectedGroup.id,
            latest: Math.floor(Date.now() / 1000),
            earliest: 1,
          }),
        });
        if (!response.ok) throw new Error(await response.text());
        const json = await response.json();
        setGroupPosts(json.items || json);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadGroupPosts();
  }, [selectedGroup]);

  return (
    <>
      <nav className="navbar bg-body-tertiary mb-4">
        <div className="container-fluid">
          <button className="btn btn-outline-secondary me-3" onClick={() => null}>
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
              {groupList.map((group) => (
                <li
                  key={group.id}
                  className="list-group-item text-body-secondary"
                  style={{
                    cursor: "pointer",
                    backgroundColor: selectedGroup.id === group.id ? "#007bff" : undefined,
                    color: selectedGroup.id === group.id ? "#ffffff" : undefined,
                  }}
                  onClick={() => setSelectedGroup(group)}
                >
                  {group.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Main: posts for selected group */}
          <div className="col-md-9">
            <h4 className="mb-3">{selectedGroup.name}</h4>

            {isLoading && <p>Loading…</p>}
            {fetchError && <p className="text-danger">{fetchError}</p>}

            {!isLoading && !fetchError && (
              <div>
                {groupPosts.length ? (
                  groupPosts.map((post) => {
                    const formattedDate = new Date(post.created_at * 1000).toLocaleString(
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
                        <div className="card" style={cardStyles}>
                          <div className="card-body">
                            <h5 className="card-title">{post.username}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">
                              <small>{formattedDate}</small>
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

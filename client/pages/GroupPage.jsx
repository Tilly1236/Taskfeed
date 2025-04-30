import React, { useState, useEffect } from "react";
import Constants from "./constants";

const cardStyles = {
  width: "100%",
  textAlign: "left",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  padding: "16px",
};

export default function GroupsPage() {
  const [groupList, setGroupList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const loadGroups = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await fetch(`${Constants.API_URL}api/user/groups`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error(await response.text());
        const json = await response.json();
        setGroupList(json.groups || []);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadGroups();
  }, []);

  const handleViewMembers = (groupId) => {
    // Navigate to the member list page (you can change this navigation based on your router)
    window.location.href = `/groups/${groupId}/members`;
  };

  const handleLeaveGroup = async (groupId) => {
    if (!window.confirm("Are you sure you want to leave this group?")) return;

    try {
      const response = await fetch(`${Constants.API_URL}api/groups/${groupId}/leave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error(await response.text());

      // After leaving, refresh the group list
      setGroupList(groupList.filter((group) => group.id !== groupId));
    } catch (err) {
      alert("Failed to leave group: " + err.message);
    }
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary mb-4">
        <div className="container-fluid">
          <button className="btn btn-outline-secondary me-3" onClick={() => window.history.back()}>
            ← Back
          </button>
          <span className="navbar-brand">Your Groups</span>
        </div>
      </nav>

      <div className="container mt-4">
        <h4 className="mb-4">Groups You Belong To</h4>

        {isLoading && <p>Loading groups…</p>}
        {fetchError && <p className="text-danger">{fetchError}</p>}

        {!isLoading && !fetchError && (
          <div>
            {groupList.length ? (
              groupList.map((group) => (
                <div className="card mb-3" key={group.id} style={cardStyles}>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{group.name}</h5>
                    <div>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleViewMembers(group.id)}
                      >
                        View Members
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleLeaveGroup(group.id)}
                      >
                        Leave Group
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">You are not part of any groups yet.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}


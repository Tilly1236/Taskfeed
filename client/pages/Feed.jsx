import React, { useState, useEffect } from "react";
import { feedFetch } from "./feedfetch";
import { useNavigate, useLocation } from "react-router-dom";

const cards = {
  width: "100%", // Make the card take full width of its container
  textAlign: "left",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
  borderRadius: "8px", // Add rounded corners
};

function Feed() {
  const location = useLocation(); // Hook to access location state
  const navigate = useNavigate();

  // State for posts, groups, comments, etc.
  const [posts, setPosts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [comments, setComments] = useState({});
  const [showCommentInput, setShowCommentInput] = useState(null);

  // Filter states
  const [filterVisible, setFilterVisible] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [posterFilter, setPosterFilter] = useState("");

  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      const fetchedPosts = await feedFetch();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };

  // Check location state for refresh indicator
  useEffect(() => {
    if (location.state?.refresh) {
      fetchPosts();
    }
  }, [location.state]);

  // Fetch groups (using mock data)
  useEffect(() => {
    const fetchGroups = async () => {
      const mockGroups = [
        { id: 1, name: "Work Group" },
        { id: 2, name: "Robotics" },
        { id: 3, name: "TaskFeed" },
      ];
      setGroups(mockGroups);
    };
    fetchGroups();
  }, []);

  // Also fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Comment functions (unchanged)
  const handleCommentClick = (postId) => {
    setShowCommentInput(postId);
  };

  const handleCommentSubmit = (postId, commentText) => {
    if (!commentText.trim()) {
      return; // Do not add empty comments
    }

    const newComment = {
      text: commentText, // The comment text
      timestamp: new Date().toLocaleString(), // The current timestamp
      user: "User123", // Replace with dynamic user if needed
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
    setShowCommentInput(null); // Hide the input field after the comment is submitted
  };

  const handleGroupClick = (groupId) => {
    console.log(`Group ${groupId} clicked`);
    // Future implementation: fetch posts for the selected group
  };

  // Apply Filters: logs the filter values and hides the filter menu.
  const applyFilters = () => {
    console.log([dateFilter, typeFilter, posterFilter]);
    setFilterVisible(false);
  };

  // Filtering logic – if no filters are set, filteredPosts equals posts.
  const filteredPosts = posts.filter((post) => {
    // Date filter: compare local date (YYYY-MM-DD)
    if (dateFilter) {
      const postDateObj = new Date(post.created_at * 1000);
      const localYear = postDateObj.getFullYear();
      const localMonth = (postDateObj.getMonth() + 1).toString().padStart(2, "0");
      const localDay = postDateObj.getDate().toString().padStart(2, "0");
      const localDateStr = `${localYear}-${localMonth}-${localDay}`;
      if (localDateStr !== dateFilter) return false;
    }
    // Filter by type if provided
    if (typeFilter && post.type !== typeFilter) return false;
    // Filter by poster (username)
    if (
      posterFilter &&
      !post.username.toLowerCase().includes(posterFilter.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div
          className="collapse"
          id="navbarToggleExternalContent"
          data-bs-theme="dark"
        >
          <div className="bg-dark p-4">
            <h5 className="text-body-emphasis h4">My Groups</h5>
            {/* Dynamically list groups */}
            <ul className="list-unstyled">
              {groups.map((group) => (
                <li key={group.id}>
                  <a
                    href="#"
                    className="text-body-secondary d-block"
                    onClick={(e) => {
                      e.preventDefault();
                      handleGroupClick(group.id);
                    }}
                  >
                    {group.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container-fluid d-flex align-items-center">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand">TaskFeed</a>
          <form className="d-flex me-auto" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => setFilterVisible(!filterVisible)}
          >
            {filterVisible ? "Hide Filters" : "Show Filters"}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/add")}
          >
            +
          </button>
          {filterVisible && (
            <div className="position-relative mt-5">
              <div
                className="position-absolute end-0 p-3 border rounded bg-dark shadow-sm"
                style={{ width: "200px", zIndex: 1050 }}
              >
                <label className="form-label text-light">Date:</label>
                <input
                  type="date"
                  className="form-control mb-2"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
                <label className="form-label text-light">User:</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Username"
                  value={posterFilter}
                  onChange={(e) => setPosterFilter(e.target.value)}
                />
                <label className="form-label text-light">Type:</label>
                <select
                  className="form-control mb-2"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="text">Text Entry</option>
                  <option value="image">Image</option>
                </select>
                <button
                  className="btn btn-primary w-100"
                  onClick={applyFilters}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Displaying Posts */}
      <div className="container mt-4">
        {filteredPosts.map((post) => {
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
              <div className="card" style={cards}>
                <div className="card-body">
                  <h5 className="card-title">{post.username}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    <small>{formattedDate}</small>
                  </h6>
                  <p className="card-text">{post.textcontent}</p>
                  <a
                    href="#"
                    className="card-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCommentClick(post.id);
                    }}
                  >
                    Comment
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Feed;

import React, { useState, useEffect } from "react";
import { feedFetch } from "./feedfetch";
import { useNavigate, useLocation } from "react-router-dom";

const cards = {
  width: "100%",
  textAlign: "left",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
};

function Feed() {
  const location = useLocation();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [comments, setComments] = useState({});
  const [showCommentInput, setShowCommentInput] = useState(null);

  // Filter states
  const [filterVisible, setFilterVisible] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [posterFilter, setPosterFilter] = useState("");

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await feedFetch();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };

  useEffect(() => {
    if (location.state?.refresh) {
      fetchPosts();
    }
  }, [location.state]);

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

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCommentClick = (postId) => {
    setShowCommentInput(postId);
  };

  const handleCommentSubmit = (postId, commentText) => {
    if (!commentText.trim()) return;
    const newComment = {
      text: commentText,
      timestamp: new Date().toLocaleString(),
      user: "User123",
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
    setShowCommentInput(null);
  };

  const handleGroupClick = (groupId) => {
    console.log(`Group ${groupId} clicked`);
  };

  const applyFilters = () => {
    console.log([dateFilter, posterFilter]);
    setFilterVisible(false);
  };

  const filteredPosts = posts.filter((post) => {
    if (dateFilter) {
      const postDateObj = new Date(post.created_at * 1000);
      const localYear = postDateObj.getFullYear();
      const localMonth = (postDateObj.getMonth() + 1).toString().padStart(2, "0");
      const localDay = postDateObj.getDate().toString().padStart(2, "0");
      const localDateStr = `${localYear}-${localMonth}-${localDay}`;
      if (localDateStr !== dateFilter) return false;
    }
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
        <div className="collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
          <div className="bg-dark p-4">
            <h5 className="text-body-emphasis h4">My Groups</h5>
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
                <button className="btn btn-primary w-100" onClick={applyFilters}>
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

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

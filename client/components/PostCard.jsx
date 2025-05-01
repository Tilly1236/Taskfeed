import React, { useState } from "react";
import Comment from "./Comment";

const PostCard = ({ post, handleCommentClick, showCommentInput, onSubmitComment/*, handleStatusChange*/ }) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleStatusChange = async (postid, tag, groupid) => {
    try {
      const token = localStorage.getItem("token"); 
      const groupid = post.groupid; 

      const response = await fetch("http://localhost:3000/api/tag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          "postid": postid,
          "tag": tag,
          "groupid": groupid
          }),
      });

      if (response.ok) {
        console.log("Tag updated successfully");
        post.tag = tag;
        setShowOptions(false);
      } else {
        const errorResponse = await response.json();
        console.error("Failed to update tag");
      }
    } catch (error) {
      console.error("Error updating tag:", error);
    }
  };

 
  const formattedDate = new Date(post.created_at * 1000).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="mb-4">
      <div className="card" style={{ width: "100%", textAlign: "left", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
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
              handleCommentClick(post.postid);
            }}
          >
            Comment <b>{post.commentcount}</b>
          </a>
          {showCommentInput && (
            <Comment postId={post.postid} onSubmitComment={onSubmitComment} />
          )}

          <ul className="mt-3">
            {(post.comments || []).map((comment, index) => (
              <li key={index}>
                <strong>{comment.user}</strong>: {comment.text}
                <br />
                <small className="text-muted">{comment.timestamp}</small>
              </li>
            ))}
          </ul>

          {/* Display the current status */}
          {post.tag && (
            <p className="card-text">
              <strong>Status:</strong> {post.tag}
            </p>
          )}

          {/* Plus sign button */}
          <button className="btn btn-primary" onClick={toggleOptions}>
            +
          </button>

          {/* Dropdown menu for options */}
          {showOptions && (
            <div className="mt-2">
              <button
                className="btn btn-success me-2"
                onClick={() => handleStatusChange(post.postid, "Resolved")}
              >
                Resolved
              </button>
              <button
                className="btn btn-warning"
                onClick={() => handleStatusChange(post.postid, "Needs Further Review")}
              >
                Needs Further Review
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
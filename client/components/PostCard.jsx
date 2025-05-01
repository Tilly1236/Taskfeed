import React from "react";
import Comment from "./Comment";
import { Link } from "react-router-dom";

const PostCard = ({ post, handleCommentClick, showCommentInput, onSubmitComment }) => {
  //console.log("Post data: ", post)  
  
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
            <Link to={`/post/${post.postid}`} className="card-link">
              Comments <b>{post.commentcount}</b>
            </Link>
          </div>
        </div>
      </div> 
    );
};

export default PostCard;
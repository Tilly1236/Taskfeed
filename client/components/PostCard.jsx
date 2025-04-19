import React from "react";
import Comment from "./Comment";

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
            <a
              href="#"
              className="card-link"
              onClick={(e) => {
                e.preventDefault();
                handleCommentClick(post.postid);
              }}
            >
              Comment {post.commentcount}
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
          </div>
        </div>
      </div> 
    );
};

export default PostCard;
import React from "react";
import { useState } from "react";

const Comment = ({ postId, onSubmitComment}) => {
    const [commentText, setCommentText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!commentText.trim()) return; //Prevent empty comments
        onSubmitComment(postId, commentText); // Pasee the comment to the parent
        setCommentText(""); //clear the input field
    };

    return (
        <div className="mt-3">
            <form onSubmit={handleSubmit}>
                <textarea
                    className="form-control mb-2"
                    rows="3"
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
                <button type="submit" className="btn btn-primary">
                    Submit Comment
                </button>
            </form>
        </div>
    );
};

export default Comment;


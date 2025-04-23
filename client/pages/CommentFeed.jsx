import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard"; // Import the PostCard component
import Comment from "../components/Comment"; // Import the Comment component

const CommentFeed = () => {
    const { postId } = useParams(); // Get the post ID from the URL
    console.log("Post ID from URL:", postId); // Log the post ID for debugging
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        // Fetch the post and its comments
        const fetchPostAndComments = async () => {
            const token = localStorage.getItem("token"); // Retrieve the token
            if (!token) {
                console.error("No authentication token found");
                return;
            }
    
            try {
                const postResponse = await fetch(`http://localhost:3000/api/post/${postId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`, // Add the token to the Authorization header
                    },
                });
                console.log("Post response status:", postResponse.status); // Debugging
                if (!postResponse.ok) {
                    throw new Error(`Failed to fetch post: ${postResponse.statusText}`);
                }
                const postData = await postResponse.json();
                setPost(postData);
    
                const commentsResponse = await fetch(`http://localhost:3000/api/post/${postId}/postcomment`, {
                    headers: {
                        "Authorization": `Bearer ${token}`, // Add the token to the Authorization header
                    },
                });
                console.log("Comments response status:", commentsResponse.status); // Debugging
                if (!commentsResponse.ok) {
                    throw new Error(`Failed to fetch comments: ${commentsResponse.statusText}`);
                }
                const commentsData = await commentsResponse.json();
                setComments(commentsData);
            } catch (error) {
                console.error("Error fetching post or comments:", error);
            }
        };
    
        fetchPostAndComments();
    }, [postId]);


    const handleAddComment = async (postId, commentText) => {
        if (!commentText.trim()) return;

        const token = localStorage.getItem("authToken"); // Retrieve the token
        if (!token) {
            console.error("No authentication token found");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/post/${postId}/postcomment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ text: commentText }),
            });

            if (response.ok) {
                const addedComment = await response.json();
                setComments((prevComments) => [...prevComments, addedComment]);
            } else {
                console.error("Failed to add comment");
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            {/* Render the PostCard component */}
            <PostCard
                post={post}
                handleCommentClick={() => {}} // No need for comment toggling here
                showCommentInput={false} // Disable inline comment input
                onSubmitComment={() => {}} // No inline comment submission
            />

            <h5>Comments</h5>
            <ul className="list-group mb-4">
                {comments.map((comment, index) => (
                    <li key={index} className="list-group-item">
                        <strong>{comment.user}</strong>: {comment.text}
                        <br />
                        <small className="text-muted">{comment.timestamp}</small>
                    </li>
                ))}
            </ul>

            {/* Render the Comment component for adding a new comment */}
            <Comment
                postId={postId}
                onSubmitComment={(postId, commentText) => handleAddComment(postId, commentText)}
            />
        </div>
    );
};

export default CommentFeed;
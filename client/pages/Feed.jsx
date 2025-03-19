import React, {useState} from "react";

const heading = {
    color: 'blue',
    fontSize: '50px'
}

const cards = {
    width: '18rem'
}

function Feed() {
        // State to store comments for each post. 
        // The key is the post ID, and the value is an array of comments for that post.
        const [comments, setComments] = useState({});
    
        // State to track which post's comment input field is currently visible.
        // This will store the ID of the post for which the input field is shown.
        const [showCommentInput, setShowCommentInput] = useState(null);
    
        // Function to handle when the "Comment" link is clicked.
        // It sets the `showCommentInput` state to the ID of the post, making the input field visible.
        const handleCommentClick = (postId) => {
            setShowCommentInput(postId);
        };
    
        // Function to handle the submission of a comment.
        // It updates the `comments` state by adding the new comment to the corresponding post's comment array.
        const handleCommentSubmit = (postId, comment) => {
            setComments((prevComments) => ({
                ...prevComments, // Keep existing comments for other posts
                [postId]: [...(prevComments[postId] || []), comment] // Add the new comment to the post's array
            }));
            setShowCommentInput(null); // Hide the input field after the comment is submitted
        };
      
    
    return(
        <>
            
            
            <nav className="navbar bg-body-tertiary">
                <div className="collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
                    <div className="bg-dark p-4">
                        <h5 className="text-body-emphasis h4">My Groups</h5>
                        {/*Dynamically add groups member is a part of.  When clicked, go to that groups feed.*/}
                        <span className="text-body-secondary">Toggleable via the navbar brand.</span>
                    </div>
                </div>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">
                            
                        </span>
                    </button>
                    <a className="navbar-brand">TaskFeed</a>
                    <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav> 

            {/*Retrieving Posts*/}
            <ul className="list-group">
                <li className="list-group-item">
                    <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                    <label className="form-check-label" htmlFor="firstCheckbox">
                    <div className="card" style={cards}>
                        <div className="card-body">
                            <h5 className="card-title">Posters Name</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">Date Posted</h6>
                            <p className="card-text">Text provided by poster</p>
                            {/*If user added image insert it here*/}
                            <a href="#" className="card-link">Attach File</a>
                            {/*Button to add comment to post*/}                    
                            <a  href="#" 
                                className="card-link" 
                                onClick={(e) => {
                                    e.preventDefault(); 
                                    handleCommentClick(1);}}>
                                        Comment
                            </a>
                            {/* Input field for adding a comment (visible only for the selected post) */}
                            {showCommentInput === 1 && ( // Replace `1` with the unique post ID
                                <div>
                                    <input
                                        type="text"
                                        className="form-control mt-2"
                                        placeholder="Add a comment"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleCommentSubmit(1, e.target.value); // Replace `1` with the unique post ID
                                                e.target.value = ''; // Clear the input field
                                            }
                                        }}
                                    />
                                </div>
                            )}
                            {/* Display list of comments for the post */}
                            <ul className="mt-2">
                                {(comments[1] || []).map((comment, index) => ( // Replace `1` with the unique post ID
                                    <li key={index}>{comment}</li>
                                ))}
                            </ul>
                        </div>
                    </div>          
                    </label>
                </li>
            </ul>
                          
            
        </>
    )
}

export default Feed








import React, {useState} from "react";
import { useEffect } from "react";
import { feedFetch } from "./feedfetch";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"; 

const cards = {
    width: "100%", // Make the card take full width of its container
    textAlign: "left",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
    borderRadius: "8px", // Add rounded corners
};



function Feed() {
        const location = useLocation(); // Hook to access location state

        useEffect(() => {
            // check if the state indicates a refresh
            if (location.state?.refresh) {
                fetchPosts();
            }
        }, [location.state]);

        const fetchPosts = async () => {
            try{
                //simulate fetching posts from a database
                const fetchedPosts = await feedFetch();
                setPosts(fetchedPosts);
            }
            catch (error) {
                console.error('Error fetching posts: ', error);
            }
            
        };


        useEffect(() => {

            //Simulate fetching groups from a database
            const fetchGroups = async () => {
                // Replace this with an actual API call when database is set up
                const mockGroups = [
                    {id: 1, name: "Work Group"},
                    {id: 2, name: "Robotics"},
                    {id: 3, name: "TaskFeed"},
                ];
                setGroups(mockGroups);
            };

            fetchGroups();
        }, []);
    
       useEffect(() => {
            //Simulate fetching posts from a database
            const fetchPosts = async () => {
                //Replace this with actual API call
                feedFetch().then((value) => (setPosts(value)))
            };
        
            fetchPosts();
        }, [])
        

        
        
        const navigate = useNavigate();
        // State to store posts data
        const [posts, setPosts] = useState([]); 

        //State to store groups associated with each user
        const [groups, setGroups] = useState([]);
        
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
        const handleCommentSubmit = (postId, commentText) => {
            if (!commentText.trim()) {
                return; // Do not add empty comments
            }

            const newComment = {
                text: commentText, // The comment text
                timestamp: new Date().toLocaleString(), // The current timestamp
                user: "User123" // The user who posted the comment (Replace to be dynamic based on the logged-in user)
            }

            setPosts((prevPosts) => 
                prevPosts.map((post) =>
                    post.id === postId
                    ? { ...post, comments: [...post.comments, newComment] }
                    : post
                )
            );
            setShowCommentInput(null); // Hide the input field after the comment is submitted
        };

        const handleGroupClick = (groupId)  => {
            console.log("Group ${groupId} clicked");
            // For now, log the group ID
            // In the future, fetch posts for the selected group from the database
        };
      
    
    return(
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
                    <div className="bg-dark p-4">
                        <h5 className="text-body-emphasis h4">My Groups</h5>
                        {/*Dynamically add groups member is a part of.  When clicked, go to that groups feed.*/}
                        <ul className = "list-unstyled">
                            {groups.map((group) => (
                                <li key={group.id}>
                                    <a 
                                        href="#" 
                                        className="text-body-secondary d-block" 
                                        onClick={(e) => {
                                            e.preventDefault(); 
                                            handleGroupClick(group.id);
                                        }}>
                                            {group.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand">TaskFeed</a>
                    <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={() => navigate("/add")}>+</button>
                </div>
            </nav> 

            {/*Retrieving Posts*/}
            <div className="container mt-4">
                {/*<h1 className="mb-4 text-center">TaskFeed</h1>*/}
                    {posts.map((post) => {
                        const formattedDate = new Date(post.created_at * 1000).toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                        });

                        return(
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
                                    {/* {showCommentInput === post.id && (
                                        <div>
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                placeholder="Add a comment"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleCommentSubmit(post.id, e.target.value);
                                                        e.target.value = ""; // Clear the input field
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}
                                    <ul className="mt-2">
                                        {post.comments.map((comment, index) => (
                                            <li key={index}>
                                                <strong>{comment.user}</strong>: {comment.text}
                                                <br />
                                                <small className="text-muted">{comment.timestamp}</small>
                                            </li>
                                        ))}
                                    </ul> */}
                                </div>
                            </div>
                        </div>
                        );
})}
                </div>
        </>
    )
}

export default Feed








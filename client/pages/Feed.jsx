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
            console.log('Location state: ', location.state);
            // check if the state indicates a refresh
            if (location.state?.refresh) {
                console.log('Refreshing posts...');
                fetchPosts();
            }
        }, [location.state]);

        const fetchPosts = async () => {
            try{
                //simulate fetching posts from a database
                const fetchedPosts = await feedFetch();
                console.log('Fetched posts: ', fetchedPosts);
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
    
       /* useEffect(() => {
            //Simulate fetching posts from a database
            const fetchPosts = async () => {
                //Replace this with actual API call
                feedFetch().then((value) => (setPosts(value)))
            };
        
            fetchPosts();
        }, [])*/
        

        
        
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
      
        {/*start of filter button/menu const and functions - Rachel*/}
        const [filterVisible, setFilterVisible] = useState(false); {/*State to control visibility of filter menu*/}
        const [dateFilter, setDateFilter] = useState("");
        const [typeFilter, setTypeFilter] = useState("");
        const [posterFilter, setPosterFilter] = useState(""); {/*States for storing*/}

        const applyFilters = () => { {/*Function to apply filters and hide filter menu*/}
            console.log([dateFilter,typeFilter,posterFilter]);{/*logs selected filters for debugging purposes*/}
            setFilterVisible(false); 
        }
        {/*end of filter button/menu const and functions*/}

        {/*Start of filtering logic for posts - Rachel*/}
        const filteredPosts = posts.filter(post => {
            if(dateFilter && post.date !== dateFilter) return false;
            if(typeFilter && post.type !== typeFilter) return false;
            if(posterFilter && !post.title.includes(posterFilter)) return false;
            return true;
        }); {/*End of filtering logic for posts*/}
        
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
                <div className="container-fluid d-flex align-items-center px-10">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand">TaskFeed</a>

                    <form className="d-flex me-auto" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                


                    {/*start of filter button/menu - Rachel*/}
                    <button type="button" className="btn btn-secondary ms-0" onClick={() => setFilterVisible(!filterVisible)}>
                        {filterVisible ? "Hide Filters" : "Show Filters"} {/*Toggle button text*/}
                    </button>

                    <button 
                        type="button" 
                        className="btn btn-primary ms-0"
                        onClick={() => navigate("/add")}>+</button>
                </div> 


                    {filterVisible && (
                        <div className="position-relative mt-5">
                        <div className="position-absolute end-0 p-3 border rounded bg-dark shadow-sm" style={{width:"200px", zIndex:1050}}>
                            <label className="form-label">Date:</label> {/*Filter by date*/}
                            <input type="date" className="form-control mb-2" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}/>

                            <label className="form-label">User:</label> {/*Filter by user*/}
                            <input type="text" className="form-control mb-2" placeholder="Username" value={posterFilter} onChange={(e) => setPosterFilter(e.target.value)}/>

                            <label className="form-label">Type:</label> {/*Filter by data*/}
                            <select className="form-control mb-2" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                                <option value="">Select Type</option>
                                <option value="text">Text Entry</option>
                                <option value="image">Image</option>
                            </select>

                            <button className="btn btn-primary w-100" onClick={applyFilters}> {/*Apply button*/}
                                Apply
                            </button>
                        </div>
                        </div>
                    )} {/*end of filter button/menu*/}

                    
                    {/*Start of displaying filtered posts - Rachel*/}
                    <div className="container mt-4">
                        {filteredPosts.map((post) => (
                            <div className="mb-4" key={post.id}>
                               <h5>{post.title}</h5>
                               <p>{post.date}</p>
                               <p>{post.type}</p>
                            </div>
                        ))}
                    </div>
            </nav>

            {/*Retrieving Posts*/}
            <div className="container mt-4">
                {/*<h1 className="mb-4 text-center">TaskFeed</h1>*/}
                    {posts.map((post) => (
                        <div className="mb-4" key={post.id}>
                            <div className="card" style={cards}>
                                <div className="card-body">
                                    <h5 className="card-title">{post.username}</h5>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">
                                        <small>{post.date}</small>
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
                    ))}
                </div>
        </>
    )
}

export default Feed









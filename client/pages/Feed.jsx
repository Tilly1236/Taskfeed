import React, { useState, useEffect, use } from "react";
import { feedFetch } from "./feedfetch";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import FilterPanel from "../components/FilterPanel";
import Comment from "../components/Comment";
import { parseuserinfo } from "./parseuserinfo";

//updated by MW
function Feed() {
    const location = useLocation();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [filterVisible, setFilterVisible] = useState(false);
    const [dateFilter, setDateFilter] = useState("");
    const [posterFilter, setPosterFilter] = useState("");
    const [showCommentInput, setShowCommentInput] = useState(null);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            const Username = await parseuserinfo(token);
            setUsername(Username);
        };

        fetchUser();
    }, []);

    const fetchPosts = async () => {
        try {
            const fetchedPosts = await feedFetch();
            const postsWithComments = fetchedPosts.map((post) => ({
                ...post,
                comments: post.comments || [],
                status: null, // Add a status field to each post
            }));
            setPosts(postsWithComments);
            
        }
        catch (error) {
            console.error("Error fetching posts: ", error);
        }
    };

    useEffect(() => {
        if (location.state?.refresh) {
            fetchPosts();
        }
    }, [location.state]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSubmitComment = (postId, commentText) => {
        console.log("Submitting comment for postId:", postId, "with text:", commentText); // Debugging
        const newComment = {
            text: commentText,
            timestamp: new Date().toLocaleString(),
            user: username,  //Replace with actual user data
        };
    
        setPosts((prevPosts) =>
            prevPosts.map((post) => 
                post.postid === postId
                    ? { ...post, comments: [...post.comments, newComment] }
                    : post
            )
        );

        setShowCommentInput(null);
    };

    const handleCommentClick = (postId) => {
        setShowCommentInput((prev) => (prev === postId ? null : postId));
    };

    const handleStatusChange = (postId, status) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.postid === postId ? { ...post, status } : post
            )
        );
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
            <Navbar filterVisible={filterVisible} setFilterVisible={setFilterVisible} navigate={navigate} />
            {filterVisible && (
                <FilterPanel
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                    posterFilter={posterFilter}
                    setPosterFilter={setPosterFilter}
                    applyFilters={applyFilters}
                />
            )}
            <div className="container mt-4">
                {filteredPosts.map((post) => (
                    <PostCard 
                        key={post.postid} 
                        post={post} 
                        handleCommentClick={handleCommentClick}
                        showCommentInput = {showCommentInput === post.postid}
                        onSubmitComment = {handleSubmitComment}
                        handleStatusChange={handleStatusChange}
                    />
                ))}
            </div>
        </>
    );
}

export default Feed;
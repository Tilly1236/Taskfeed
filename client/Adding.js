const handleAddPost = () => {
  if (!comment.trim()) {
    alert("Comment is required.");
    return;
  }
  
  const newPost = {
    user: user || "Guest",
    comment: comment.trim(),
    date: new Date().toISOString().split("T")[0],
  };

  // Make a POST request to the API endpoint
  fetch("http://localhost:3000/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  })
    .then((response) => response.json())
    .then((data) => {
      // Update the posts state with the new post from the API response
      setPosts(prevPosts => [data.post, ...prevPosts]);
      setUser("");
      setComment("");
    })
    .catch((error) => console.error("Error adding post:", error));
};


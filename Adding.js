// Array to store posts
const posts = [];

// Function to add a post
function addPost(user, comment, date) {
  if (!comment) {
    console.log("Comment is required.");
    return;
  }

  const newPost = {
    user: user || "Guest",
    comment,
    date: date || new Date().toISOString().split("T")[0]
  };

  posts.push(newPost);
  console.log("Post added:", newPost);
}

// Example usage
addPost("Admin", "This is a test post", "2025-04-01");
addPost("Tilly", "Second post!");
console.log("Current posts array:", posts);

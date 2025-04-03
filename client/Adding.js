// 1) Create an array to hold posts
const posts = [];

// 2) Create a post object
const newPost = {
  date: "2025-04-01",
  user: "Admin",
  comment: "Hello from a script without any UI!"
};

// 3) Add the new post object to the array
posts.push(newPost);

// 4) Check the result
console.log("Current posts array:", posts);

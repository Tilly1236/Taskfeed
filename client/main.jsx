import AddPostPage from "./pages/AddPost.jsx";
import Home from "./pages/Home.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Sample from "./pages/Sample/Sample.jsx";
import Feed from "./pages/Feed.jsx";
import Login from "./pages/Login/Login.jsx";

import CreateAccount from "./pages/Login/create_account.jsx";
import CommentFeed from "./pages/CommentFeed.jsx";
import About from "./pages/About.jsx";
import GroupsPage from "./pages/GroupPage.jsx";


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/feed/:groupId" element={<Feed />} />
      <Route path="/create_account" element={<CreateAccount />} />
      <Route path="/add" element={<AddPostPage />} />
      <Route path="/post/:postId" element={<CommentFeed />} />
      <Route path="/add/:groupId" element={<AddPostPage />} />
      <Route path="/groups" element={<GroupsPage />} />
    </Routes>
  </BrowserRouter>
);
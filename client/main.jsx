import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Sample from "./pages/Sample/Sample.jsx";
import Feed from "./pages/Feed.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Sample />} />
      <Route path="/feed" element={<Feed />} />
    </Routes>
  </BrowserRouter>
);

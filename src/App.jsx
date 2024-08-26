import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./jsx/assetUpdate/Home";
import About from "./jsx/assetUpdate/About";
import Contact from "./jsx/assetUpdate/Contact";
import AssetUpdate from "./jsx/assetUpdate/AssetUpdate";
import AssetCheck from "./jsx/assetCheck/AssetRegister";
import AssetRegister from "./jsx/assetCheck/AssetCheck";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/check">Check</Link>
          </li>
          <li>
            <Link to="/update">Update</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/check" element={<AssetCheck />} />
        <Route path="/update" element={<AssetUpdate />} />
        <Route path="/asset/categories" element={<AssetCheck />} />
        <Route path="/asset/register" element={<AssetRegister />} />
      </Routes>
    </Router>
  );
}

export default App;

import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./jsx/assetUpdate/Home";
import About from "./jsx/assetUpdate/About";
import Contact from "./jsx/assetUpdate/Contact";
import AssetRegister from "./jsx/assetCheck/AssetCheck";
import AssetUpdate from "./jsx/assetUpdate/AssetUpdate";

function App() {
  return (
    // <>
    //   TAELIM
    //   <div className="App">
    //     <h1>Asset Management</h1>
    //     <BrowserRouter>
    //       <Routes>
    //         <Route path="/" element={<AssetTable />}></Route>
    //       </Routes>
    //       <Routes>
    //         <Route path="/" element={<AssetRegister />}></Route>
    //       </Routes>
    //     </BrowserRouter>
    //   </div>
    // </>

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
        <Route path="/check" element={<AssetRegister />} />
        <Route path="/update" element={<AssetUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;

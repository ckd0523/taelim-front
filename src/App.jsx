import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./jsx/assetUpdate/Home";
import AssetRegister from "./jsx/assetCheck/AssetRegister";
import Regist from "./jsx/assetUpdate/Regist";
import About from "./jsx/assetUpdate/About";
import Contact from "./jsx/assetUpdate/Contact";
import AssetUpdate from "./jsx/assetUpdate/AssetUpdate";

//import AssetRegister from "./jsx/assetCheck/AssetCheck";

function App() {
  return (
    <Router>
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/check">자산등록화면</Link>
          </li>
          <li>
            <Link to="/regist">자산등록 예시화면</Link>
          </li>
          <li>
            <Link to="/about">자산조회예시</Link>
          </li>
          <li>
            <Link to="/contact">자산조회작업중</Link>
          </li>

          <li>
            <Link to="/update">예시용</Link>
          </li>
        </ul>
      </div>

      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/check" element={<AssetRegister />} />
            <Route path="/regist" element={<Regist />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/update" element={<AssetUpdate />} />
            {/* 자산조회 */}
            <Route path="/asset/categories" element={<AssetCheck />} />
            {/* 자산등록 */}
            <Route path="/asset/register" element={<AssetRegister />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Router>
  );
}

export default App;

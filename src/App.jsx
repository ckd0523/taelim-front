import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./jsx/assetUpdate/Home";
import About from "./jsx/assetUpdate/About";
import Contact2 from "./jsx/assetUpdate/Contact2";
import Contact from "./jsx/assetUpdate/Contact";
import AssetTable from "./jsx/QR/assetTable";
import AssetRegister from "./jsx/assetCheck/AssetRegister";

function App() {
  return (
    <Router>
      <div className="App">
        {/* 사이드바 */}
        <div className="sidebar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/asset/register">자산등록화면</Link>
            </li>
            <li>
              <Link to="/about">자산조회예시</Link>
            </li>
            <li>
              <Link to="/contact2">작업중이창현</Link>
            </li>
            <li>
              <Link to="/contact">자산조회작업중</Link>
            </li>
          </ul>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* 자산등록 */}
            <Route path="/asset/register" element={<AssetRegister />} />
            {/* 자산 조회 */}
            <Route path="/asset" element={<AssetTable />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

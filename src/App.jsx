import "./App.css";
import AssetTable from "./jsx/assetTable";
import AssetRegister from "./jsx/assetCheck/AssetRegister";
import AssetCheck from "./jsx/assetCheck/AssetCheck";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Component } from "react";

function App() {
  return (
    <>
      <div className="App">
        {/* <h1>Asset Management</h1> */}
        {/* <AssetTable /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/asset/categories" element={<AssetCheck />} />
            <Route path="/asset/register" element={<AssetRegister />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

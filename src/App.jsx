import "./App.css";
import AssetTable from "./jsx/QR/assetTable";
import AssetRegister from "./jsx/AssetRegister";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Component } from "react";

function App() {
  return (
    <>
      TAELIM
      <div className="App">
        <h1>Asset Management</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/asset" element={<AssetTable />}></Route>
          </Routes>
          <Routes>
            <Route path="/asset/categories" element={<AssetRegister />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

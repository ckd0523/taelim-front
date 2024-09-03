import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "./jsx/assetUpdate/Home";
import About from "./jsx/assetUpdate/About";
import Contact2 from "./jsx/assetUpdate/Contact2";
import Contact from "./jsx/assetUpdate/Contact";
import AssetTable from "./jsx/QR/assetTable";
import AssetRegister from "./jsx/assetCheck/AssetRegister";
import Infoprotection from "./jsx/assetUpdate/Infoprotection";
import Software from "./jsx/assetUpdate/Software";

function Sidebar() {
  const location = useLocation();

  // 현재 경로가 자산 관련 경로인지 확인하는 함수
  const isAssetPage = location.pathname.startsWith("/assset");

  // 하위 메뉴를 열고 닫는 상태 관리
  const [isAssetSubmenuOpen, setAssetSubmenuOpen] = useState(isAssetPage);

  const toggleAssetSubmenu = () => {
    setAssetSubmenuOpen(!isAssetSubmenuOpen);
  };

  // 자산 페이지에 있을 때 하위 메뉴를 열어두고, 다른 페이지로 이동하면 닫음
  useEffect(() => {
    if (isAssetPage) {
      setAssetSubmenuOpen(true);
    } else {
      setAssetSubmenuOpen(false); // 다른 페이지로 이동하면 하위 메뉴 닫기
    }
  }, [location, isAssetPage]);

  return (
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
          <a href="#" onClick={toggleAssetSubmenu}>
            자산조회작업중
          </a>
          {isAssetSubmenuOpen && (
            <ul className="sub-menu">
              <li>
                <Link to="/contact">전체</Link>
              </li>
              <li>
                <Link to="/assset/info-protection">정보보호시스템</Link>
              </li>
              <li>
                <Link to="/asset/application">응용프로그램</Link>
              </li>
              <li>
                <Link to="/assset/software">소프트웨어</Link>
              </li>
              <li>
                <Link to="/assset/electronic-info">전자정보</Link>
              </li>
              <li>
                <Link to="/assset/document">문서</Link>
              </li>
              <li>
                <Link to="/assset/patent">특허 및 상표</Link>
              </li>
              <li>
                <Link to="/assset/it-equipment-system">IT 장비 - 시스템</Link>
              </li>
              <li>
                <Link to="/assset/it-equipment-network">
                  IT 장비 - 네트워크
                </Link>
              </li>
              <li>
                <Link to="/assset/terminal">단말기</Link>
              </li>
              <li>
                <Link to="/assset/furniture">가구</Link>
              </li>
              <li>
                <Link to="/assset/device">기기</Link>
              </li>
              <li>
                <Link to="/assset/vehicle">차량</Link>
              </li>
              <li>
                <Link to="/assset/others">기타</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact2" element={<Contact2 />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/asset/register" element={<AssetRegister />} />
            <Route path="/asset" element={<AssetTable />} />
            <Route
              path="/assset/info-protection"
              element={<Infoprotection />}
            />
            <Route path="/assset/software" element={<Software />} />
            {/* 추가적인 라우트 필요 시 여기에 추가 */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

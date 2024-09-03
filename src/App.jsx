//import "./App.css";
import React, { useState } from 'react';
import AssetSurveyHistory from "./components/AssetSurveyHistory";
import AssetSurveyRegister from "./components/AssetSurveyRegister";
import BackUpHistory from "./components/BackUpHistory";
import axios from 'axios';
import LeftSidebar from "./layouts/LeftSidebar";
import { ThemeProvider } from "./common";
import './assets/scss/Saas.scss';

const App = () => {
  const [selectedIds, setSelectedIds] = useState([]);

  // 자산조사 삭제 핸들러
  const handleDelete = async () => {
    console.log(selectedIds);//int 타입
    try {
      await axios.post("http://localhost:8080/deleteAssetSurvey", {
        assetSurveyNo: selectedIds
      });
      
      // 삭제 후 데이터 재조회 또는 다른 작업
      console.log("삭제 성공");
      setSelectedIds([]); // 선택 상태 초기화
    } catch (error) {
      console.error("Error deleting assets:", error);
    }
  }

  return <>
  <div>
    {/* ThemeProvider 안에 LeftSider가 있어야 오류가 안남*/}
      <ThemeProvider>
        {/* <LeftSidebar leftbarDark={ 여기에 무슨 값 } />  저기 무슨 값을 넣으면 HYPER 로고 사라짐 */}
        <LeftSidebar />
      </ThemeProvider>

      {/* className을 content가 아니라 content-page로 해야 사이드바가 본문과 겹치지 않음 */}
    <div className='content-page'>
      TAELIM
      자산 조사 등록 버튼
      <AssetSurveyRegister />
      <button onClick={handleDelete}>자산조사 삭제</button>
      <AssetSurveyHistory setSelectedIds={setSelectedIds} />
      여기 위는 아무것도 없나?
      <BackUpHistory />
    </div>
  </div>
  </>;
};

export default App;

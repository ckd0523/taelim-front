import "./App.css";
import React, { useState } from 'react';
import AssetSurveyHistory from "./components/AssetSurveyHistory";
import AssetSurveyRegister from "./components/AssetSurveyRegister";
import BackUpHistory from "./components/BackUpHistory";
import axios from 'axios';

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
    TAELIM
    자산 조사 등록 버튼
    <AssetSurveyRegister />
    <button onClick={handleDelete}>자산조사 삭제</button>
    <AssetSurveyHistory setSelectedIds={setSelectedIds} />
    여기 위는 아무것도 없나?
    <BackUpHistory />
  </>;
};

export default App;

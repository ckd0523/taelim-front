import SearchBar from "./AssetSurveyHistorySearchBar";
import SurveyTable from "./AssetSurveyHistoryTable";
import Buttons from "./AssetSurveyButtons";
import { useState } from "react";

const AssetSurveyHistory2 = () => {

  //등록 후 테이블 리렌더링
  const [tableChange, setTableChange] = useState(0);
  const onClickRegister = () => {
    setTableChange(tableChange + 1);
  };


  return (
    <div>
      {/* 검색 바 */}
      <SearchBar />
      {/* 각종 버튼 */}
      <Buttons onClickRegister={onClickRegister} />
      {/* 자산 조사 이력 테이블 */}
      <SurveyTable tableChange={tableChange} />
    </div>
  );
};

export { AssetSurveyHistory2 };
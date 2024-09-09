import SearchBar from "./AssetSurveyHistorySearchBar";
import SurveyTable from "./AssetSurveyHistoryTable";
import Buttons from "./AssetSurveyButtons";

const AssetSurveyHistory2 = () => {


  return (
    <div>
      {/* 검색 바 */}
      <SearchBar />
      {/* 각종 버튼 */}
      <Buttons />
      {/* 자산 조사 이력 테이블 */}
      <SurveyTable />
    </div>
  );
};

export { AssetSurveyHistory2 };
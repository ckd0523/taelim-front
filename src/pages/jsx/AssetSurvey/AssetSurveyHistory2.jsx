import SearchBar from "./AssetSurveyHistorySearchBar";
import { SurveyTable } from "./AssetSurveyHistoryTable";
import Buttons from "./AssetSurveyButtons";
import { useState } from "react";

const URL = import.meta.env.VITE_BASIC_URL;

const AssetSurveyHistory2 = () => {

  //자산 조사 삭제를 위해 어떤 행이 선택되었는지
  const [selectedRows, setSelectedRows] = useState([]);

  //등록 후 테이블 리렌더링
  const [tableChange, setTableChange] = useState(0);

  const onClickRegister = () => {
    if (tableChange === 2) {
      setTableChange(0);
    }
    setTableChange(tableChange + 1);
  };

  // 행 삭제 함수
  const handleDelete = async () => {
    if (selectedRows.length === 0) {
      alert("한 개 이상의 자산 조사를 선택하세요.");
      return;
    }

    try {
      const response = await fetch(`${URL}/deleteAssetSurvey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assetSurveyNo: selectedRows }), // 데이터를 JSON 형식으로 변환하여 보냄
      });

      if (!response.ok) {
        throw new Error('자산 조사 삭제에 실패했습니다.');
      }

      alert('자산 조사 삭제가 완료되었습니다.');
      //삭제 성공 후 테이블 리렌더링
      onClickRegister();
    } catch (error) {
      console.error('자산 조사 삭제 중 오류:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    };

    //console.log("삭제요~");
    //console.log(selectedRows);
  };


  return (
    <div>
      {/* 검색 바 */}
      <SearchBar />
      {/* 각종 버튼 */}
      <Buttons onClickRegister={onClickRegister} onDelete={handleDelete} />
      {/* 자산 조사 이력 테이블 */}
      <SurveyTable tableChange={tableChange} setSelectedRows={setSelectedRows} />
    </div>
  );
};

export { AssetSurveyHistory2 };
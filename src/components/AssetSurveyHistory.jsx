import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import axios from "axios";

const AssetSurveyHistory = ({ setSelectedIds }) => {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);

  // 서버로부터 데이터를 가져오는 함수
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/assetSurveyHistory");
        setData(response.data); // API로부터 받은 데이터 설정
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // 여기 빈 배열을 넣으면 이 useEffect는 이 페이지가 호출될 때 한번만 실행됨
  // 그것이 빈 의존성 배열임, 밑에는 의존성이 있어서 값이 바뀔 때마다 테이블을 재렌더링함

  // DataTable 초기화
  useEffect(() => {
    if (data.length > 0) {
      $(tableRef.current).DataTable({
        data: data, // 데이터 배열을 넘겨줌
        columns: [
          {
            title: "",
            data: null,
            render: (data, type, row, meta) => {
              // 각 행에 네모난 체크박스 버튼 추가
              //input 태그 안에 value는 무조건 string으로 반환함
              return `
                <input type="checkbox" class="selectCheckbox" value="${row.assetSurveyNo}" />
              `;
            }
          },
          { title: "자산조사번호", data: "assetSurveyNo" },
          { title: "회차", data: "round" },
          { title: "위치", data: "assetSurveyLocation" },
          { title: "자산조사일자", data: "assetSurveyStartDate" },
          { title: "자산조사자", data: "assetSurveyBy" },
          {
            title: "상태",
            data: "surveyStatus",
            render: (data) => {
              // 상태 값이 0이면 "Inactive", 1이면 "Active"로 변환
              return data === false ? "조사중" : "조사 완료";
            }
          },
        ],
        paging: true, // 페이징 활성화
        pageLength: 10, // 페이지당 10개의 row
        destroy: true, // 테이블을 재구성할 때 기존 테이블 삭제
      });

      // 체크박스 선택 상태 추적
      $(tableRef.current).on('change', '.selectCheckbox', function() {
        console.log(1);
        //input 태그 안에 value는 무조건 string으로 반환하기 때문에 int로 변환
        //하지만 백에서 쓰는 타입은 long인데 여기서는 long으로 변환 불가
        //백으로 int로 가져가서 long으로 다시 변환
        const id = parseInt($(this).val(), 10); // id를 숫자로 변환
        console.log(id);
        const row = data.find(item => item.assetSurveyNo === id);
        console.log(row);

        if (row) {
          if (row.surveyStatus === true) {
            // "조사 완료" 상태일 때 경고창 표시
            alert("완료된 조사는 선택 불가합니다.");
            // 체크박스 선택 해제
            $(this).prop('checked', false);
          } else {
            // "조사중" 상태일 때 상태 업데이트
            if ($(this).is(':checked')) {
              setSelectedIds(prevIds => [...prevIds, id]);
            } else {
              setSelectedIds(prevIds => prevIds.filter(item => item !== id));
            }
          }
        }
      });

    }
  }, [data, setSelectedIds]); // data가 바뀔 때마다 테이블을 다시 렌더링
  //빈 의존성 배열이 아니기 때문에 data와 setSelectedIds가 바뀔 때 마다 재렌더링함

  return (
    <div>
      <h1>Asset Survey List</h1>
      <table ref={tableRef} className="display" style={{ width: "100%" }}>
        
      </table>
    </div>
  );
};

export default AssetSurveyHistory;

import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import axios from "axios";
import { GoTrash } from "react-icons/go";
import { renderToString } from "react-dom/server";

const About = () => {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);

  // 서버로부터 데이터를 가져오는 함수
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/asset/get");
        setData(response.data); // API로부터 받은 데이터 설정
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // DataTable 초기화
  useEffect(() => {
    if (data.length > 0) {
      $(tableRef.current).DataTable({
        data: data, // 데이터 배열을 넘겨줌
        columns: [
          { title: "번호", data: "assetNo" },
          { title: "자산분류", data: "assetClassification" },
          { title: "자산기준", data: "assetBasis" },
          { title: "자산코드", data: "assetCode" },
          { title: "자산명", data: "assetName" },
          { title: "목적", data: "purpose" },
          { title: "부서", data: "department" },
          { title: "자산위치", data: "assetLocation" },
          { title: "운영 상태", data: "operationStatus" },
          { title: "구매일자", data: "purchaseDate" },
          { title: "제조사", data: "manufacturingCompany" },
          { title: "보증 정보", data: "warrantyDetails" },
          { title: "승인 상태", data: "approval" },
          { title: "파일 첨부", data: "attachment" },
        ],
        paging: true, // 페이징 활성화
        pageLength: 10, // 페이지당 10개의 row
        destroy: true, // 테이블을 재구성할 때 기존 테이블 삭제
        responsive: false,
      });
    }
  }, [data]); // data가 바뀔 때마다 테이블을 다시 렌더링

  return (
    <div>
      <h1>Asset List</h1>
      <table ref={tableRef} className="display" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>번호</th>
            <th>자산분류</th>
            <th>자산기준</th>
            <th>자산코드</th>
            <th>자산명</th>
            <th>목적</th>
            <th>부서</th>
            <th>자산위치</th>
            <th>운영 상태</th>
            <th>구매일자</th>
            <th>제조사</th>
            <th>보증 정보</th>
            <th>승인 상태</th>
            <th>파일 첨부</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default About;

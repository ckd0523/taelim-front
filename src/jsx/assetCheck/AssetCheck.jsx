import Recat, { useEffect, useRef, useState } from "react";
import axios from "axios";

import $ from "jquery";
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { GoTrash } from "react-icons/go";
import { renderToString } from "react-dom/server";

// 자산 목록을 가져오는 함수
const fetchAssets = async () => {
  try {
    const response = await axios.get("/api/assets");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch assets", error);
    return [];
  }
};

const AssetRegister = () => {
  const [assetData, setAssetData] = useState([]);
  const tableRef = useRef();
  const trashIcon = renderToString(<GoTrash />);

  useEffect(() => {
    // 자산 목록을 가져오는 함수 호출
    const fetchAndSetAssets = async () => {
      try {
        const data = await fetchAssets();
        console.log("Fetched Data:", data); // 데이터 구조 확인
        setAssetData(data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };
    fetchAndSetAssets();
  }, []);

  useEffect(() => {
    if (assetData.length > 0) {
      $(tableRef.current).DataTable({
        data: assetData,
        columns: [
          { title: "번호", data: "assetNo" },
          { title: "자산기준", data: "assetBasis" },
          { title: "자산코드", data: "assetCode" },
          { title: "자산명", data: "assetName" },
          { title: "자산분류", data: "assetClassification" },
          { title: "목적/기능", data: "purpose" },
          { title: "자산위치", data: "assetLocation" },
          { title: "부서", data: "department" },
          //{ title: "사용자", data: "assetUser.name" }, // 자산 사용자 이름
          //{ title: "소유자", data: "assetOwner.name" }, // 자산 소유자 이름
          { title: trashIcon, sorting: false }, // trashIcon 변수를 정의해야 합니다.
        ],
        destroy: true, // 테이블이 재렌더링될 때 기존 인스턴스를 제거
      });
      // Cleanup function
      return () => {
        $(tableRef.current).DataTable().destroy(true);
      };
    }
  }, [assetData]);

  return (
    <table ref={tableRef} className="display" style={{ width: "100%" }}>
      <thead>
        <tr>
          <th> </th>
          <th>번호</th>
          <th>자산기준</th>
          <th>자산코드</th>
          <th>자산명</th>
          <th>자산분류</th>
          <th>목적/기능</th>
          <th>자산위치</th>
          <th>부서</th>

          <th>{trashIcon}</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export default AssetRegister;

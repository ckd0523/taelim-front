import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import axios from "axios";
import { GoTrash } from "react-icons/go";
import { renderToString } from "react-dom/server";

const Contact = () => {
  const tableRef = useRef(null);
  const trashIcon = renderToString(<GoTrash />);
  const [data, setData] = useState([]);

  // 서버에서 자산 데이터 가져오기
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/assets/approved-not-disposed"
      );
      setData(response.data);
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }
  };

  // 자산 폐기 처리
  const handleDisposeAsset = async (assetCode) => {
    try {
      const response = await fetch(
        `http://localhost:8080/dispose/${assetCode}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("자산이 성공적으로 폐기되었습니다:", assetCode);
        setData((prevData) =>
          prevData.filter((asset) => asset.assetCode !== assetCode)
        );
      } else {
        console.error("자산 폐기 실패:", assetCode);
      }
    } catch (error) {
      console.error("자산 폐기 중 오류 발생:", error);
    }
  };

  // 자산 상세 정보 요청
  const fetchAssetDetails = async (assetCode) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/asset/${assetCode}`
      );
      console.log("자산 상세 정보:", response.data);
    } catch (error) {
      console.error("자산 상세 정보 가져오기 오류:", error);
    }
  };

  // 데이터테이블 초기화
  const initializeDataTable = () => {
    const table = $(tableRef.current).DataTable({
      data,
      columns: [
        {
          title: "선택",
          data: null,
          render: () => `<input type="checkbox" class="select-checkbox" />`,
        },
        { title: "번호", data: "assetNo" },
        { title: "자산기준", data: "assetBasis" },
        { title: "자산코드", data: "assetCode" },
        { title: "자산명", data: "assetName" },
        { title: "자산분류", data: "assetClassification" },
        { title: "목적/기능", data: "purpose" },
        { title: "자산위치", data: "assetLocation" },
        { title: "부서", data: "department" },
        { title: "사용자", data: "assetUser" },
        { title: "소유자", data: "assetOwner" },
        {
          title: "Action",
          data: null,
          render: (data, type, row) =>
            `<div class="action-cell" data-asset-code="${row.assetCode}">${trashIcon}</div>`,
        },
      ],
      paging: true,
      pageLength: 10,
      destroy: true,
      responsive: true,
    });

    // 행 클릭 시 상세 정보 토글
    $(tableRef.current).on("click", "tbody tr", function () {
      const tr = $(this);
      const row = table.row(tr);

      if (row.child.isShown()) {
        row.child.hide();
        tr.removeClass("shown");
      } else {
        const rowData = row.data();
        const details = generateRowDetails(rowData);

        row.child(details).show();
        tr.addClass("shown");

        // 상세 정보 버튼 이벤트 리스너 추가
        $(`#edit-button-${row.index()}`).on("click", handleEditRequest);
        $(`#maintenance-button-${row.index()}`).on(
          "click",
          handleMaintenanceRegistration
        );

        // 자산 상세 정보 요청
        fetchAssetDetails(rowData.assetCode);
      }
    });

    // Action 버튼 클릭 이벤트
    $(tableRef.current).on("click", ".action-cell", function () {
      const assetCode = $(this).data("asset-code");
      handleDisposeAsset(assetCode);
    });
  };

  // 상세 정보 HTML 생성
  const generateRowDetails = (rowData) => `
    <div style="padding: 10px;">
      <h4>상세 정보</h4>
      <p><strong>자산코드:</strong> ${rowData.assetCode}</p>
      <p><strong>자산명:</strong> ${rowData.assetName}</p>
      <p><strong>자산위치:</strong> ${rowData.assetLocation}</p>
      <p><strong>부서:</strong> ${rowData.department}</p>
      <button id="edit-button-${rowData.index}">수정 요청</button>
      <button id="maintenance-button-${rowData.index}">유지보수 등록</button>
    </div>
  `;

  // 수정 요청 핸들러
  const handleEditRequest = () => {
    console.log("수정 요청 버튼 클릭됨");
  };

  // 유지보수 등록 핸들러
  const handleMaintenanceRegistration = () => {
    console.log("유지보수 등록 버튼 클릭됨");
  };

  // 컴포넌트 마운트 시 데이터 로드 및 데이터테이블 초기화
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      initializeDataTable();
    }
  }, [data]);

  return (
    <div>
      <h1>자산 목록</h1>
      <table
        ref={tableRef}
        className="display"
        style={{ width: "100%" }}
      ></table>
    </div>
  );
};

export default Contact;

import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
//import "datatables.net-responsive-dt";
import axios from "axios";
import { GoTrash } from "react-icons/go";
import { renderToString } from "react-dom/server";
import AssetPopover from "./AssetPopover";

const Contact = () => {
  const tableRef = useRef(null);
  const trashIcon = renderToString(<GoTrash />);
  const [data, setData] = useState([]);
  // Popover를 위한 상태 관리
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleEditRequest = () => {
    // 수정요청 로직
  };

  const handleMaintenanceRegistration = () => {
    // 유비보수 등록 로직
  };

  // 서버로부터 데이터를 가져오는 함수 , 자산등록 부분
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/assets/approved-not-disposed"
        );
        setData(response.data); // API로부터 받은 데이터 설정
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // 자산 폐기 처리 함수 , 자산 폐기 부분
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
        console.log("Asset disposed successfully:", assetCode);
        // 성공적으로 폐기되었으면 데이터를 다시 불러와 테이블을 업데이트
        const updatedData = data.filter(
          (asset) => asset.assetCode !== assetCode
        );
        setData(updatedData);
      } else {
        console.error("Failed to dispose asset:", assetCode);
      }
    } catch (error) {
      console.error("Error disposing asset:", error);
    }
  };

  // Popover 열기 및 상세 데이터 가져오기
  const handleRowClick = async (event, rowData) => {
    setAnchorEl(event.currentTarget);
    try {
      const response = await axios.get(
        `http://localhost:8080/asset/${rowData.assetCode}`
      );
      setSelectedRowData(response.data);
    } catch (error) {
      console.error("Error fetching asset details:", error);
    }
  };
  // Popover 닫기
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // DataTable 초기화
  useEffect(() => {
    if (data.length > 0) {
      const table = $(tableRef.current).DataTable({
        data: data,
        columns: [
          {
            title: "선택",
            data: null,
            render: () => {
              return `<input type="checkbox" class="select-checkbox" />`;
            },
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
            render: (data, type, row) => {
              // Action 열에 trashIcon 추가
              return `<div class="action-cell" data-asset-code="${row.assetCode}">
              ${trashIcon}
            </div>`;
            },
          },
        ],
        paging: true, // 페이징 활성화
        pageLength: 10, // 페이지당 10개의 row
        destroy: true, // 테이블을 재구성할 때 기존 테이블 삭제
        responsive: true,
      });

      // 테이블의 각 행에 클릭 이벤트를 추가
      $(tableRef.current).on("click", "tbody tr", function (event) {
        if ($(event.target).hasClass("select-checkbox")) {
          // select 박스 클릭 시 Popover 닫기 방지
          return;
        }
        const rowData = table.row(this).data();
        handleRowClick(event, rowData);
      });

      // 체크박스 클릭 이벤트 처리
      $(tableRef.current).on("change", ".select-checkbox", function () {
        const isChecked = $(this).is(":checked");
        const rowIndex = $(this).closest("tr").index();
        console.log(`Row ${rowIndex} checkbox checked: ${isChecked}`);
        // 필요한 경우 여기에 체크박스 상태를 처리하는 로직 추가
      });

      // Action 열의 trash icon 클릭 이벤트
      $(tableRef.current).on("click", ".action-cell", function () {
        const assetCode = $(this).data("asset-code");
        handleDisposeAsset(assetCode); // 폐기 처리 함수 호출
      });
    }
  }, [data]); // data가 바뀔 때마다 테이블을 다시 렌더링

  return (
    <div>
      <h1>Asset List</h1>
      <table
        ref={tableRef}
        className="display"
        style={{ width: "100%" }}
      ></table>
      {/* Popover Component */}
      <AssetPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        selectedRowData={selectedRowData}
        handleEditRequest={handleEditRequest}
        handleMaintenanceRegistration={handleMaintenanceRegistration}
      />
    </div>
  );
};

export default Contact;

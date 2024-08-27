import React, { useState, useRef, useEffect } from "react";
//import DataTable from "datatables.net-dt";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { GoTrash } from "react-icons/go";
import { renderToString } from "react-dom/server";
import { Popover } from "@mui/material";

const AssetUpdate = () => {
  const tableRef = useRef();
  const trashIcon = renderToString(<GoTrash />);

  // Popover를 위한 상태 관리
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const assetData = [
    [
      "",
      "1",
      "TISAX",
      "TLIA-CMP-DPC-0001",
      "P340",
      "단말기",
      "3D LEAN",
      "본관 1층",
      "BLACK BOX",
      "사용자",
      "소유자",
      trashIcon,
    ],
    [
      "",
      "2",
      "TISAX",
      "TLIA-CMP-DPC-0001",
      "P340",
      "단말기",
      "3D LEAN",
      "본관 1층",
      "BLACK BOX",
      "사용자",
      "소유자",
      trashIcon,
    ],
    [
      "",
      "35",
      "TISAX",
      "ASST-CMP-DPC-0001",
      "P340",
      "단말기",
      "본체",
      "본관 3층",
      "BLACK BOX",
      "사람1",
      "사람2",
      trashIcon,
    ],
    // 추가 데이터 필요시 여기에 더 추가
  ];

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      data: assetData,
      columns: [
        { title: " " },
        { title: "번호" },
        { title: "자산기준" },
        { title: "자산코드." },
        { title: "자산명" },
        { title: "자산분류" },
        { title: "목적/기능" },
        { title: "자산위치" },
        { title: "부서" },
        { title: "사용자" },
        { title: "소유자" },
        { title: trashIcon, sorting: false },
      ],
    });

    // 행 클릭 이벤트 핸들러 추가
    $(tableRef.current).on("click", "tr", function (event) {
      const rowData = table.row(this).data();
      if (rowData) {
        setAnchorEl(event.currentTarget); // 클릭된 행을 기준으로 Popover 표시
        setSelectedRowData({
          assetCode: rowData[3],
          assetName: rowData[4],
          assetBasis: rowData[2],
          purpose: rowData[6],
          department: rowData[8],
          assetLocation: rowData[7],
          assetUser: rowData[9],
          assetOwner: rowData[10],
          // 예시: 자산분류
        });
      }
    });

    return () => {
      table.destroy(); // cleanup
    };
  }, [assetData, trashIcon]);

  // Popover 닫기 함수
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedRowData(null);
  };

  //API 호출 함수
  const handleSubmit = async () => {
    if (selectedRowData) {
      try {
        const response = await fetch("/api/insert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedRowData),
        });

        if (response.ok) {
          console.log("data success");
          handlePopoverClose();
        } else {
          console.error("error", response.statusText);
        }
      } catch (error) {
        console.error("error", error);
      }
    }
  };
  const open = Boolean(anchorEl);

  return (
    <div>
      <h1>Asset Register</h1>
      <table ref={tableRef} style={{ width: "100%" }}></table>

      {/* Popover 추가 */}
      <Popover
        open={open}
        anchorEl={anchorEl} // 클릭된 행을 기준으로 Popover 표시
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom", // 기준 요소의 하단에 Popover가 나타나게 함
          horizontal: "center", // 기준 요소의 수평 중앙에 맞춤
        }}
        transformOrigin={{
          vertical: "top", // Popover의 상단이 기준 요소의 하단과 맞물리게 함
          horizontal: "center", // Popover의 수평 중앙이 맞물리게 함
        }}
        container={document.body}
      >
        <div style={{ padding: "16px" }}>
          <h3>기본 자산 및 관리 정보</h3>
          {selectedRowData && (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                    자산코드
                  </th>
                  <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                    자산명
                  </th>
                  <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                    자산기준
                  </th>
                  <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                    목적/기능
                  </th>
                  <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                    부서
                  </th>
                  <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                    위치
                  </th>
                  <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                    사용자
                  </th>
                  <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                    소유자
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {selectedRowData.assetCode}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {selectedRowData.assetName}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {selectedRowData.assetBasis}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {selectedRowData.purpose}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {selectedRowData.department}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {selectedRowData.assetLocation}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {selectedRowData.assetUser}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {selectedRowData.assetUser}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </Popover>
    </div>
  );
};

export default AssetUpdate;

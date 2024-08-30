import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import axios from "axios";
import { GoTrash } from "react-icons/go";
import { renderToString } from "react-dom/server";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Box,
  Button,
} from "@mui/material";

// 스타일 적용된 TableCell
const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "isHeader",
})(({ theme, isHeader }) => ({
  textAlign: "center",
  border: "1px solid #ddd",
  ...(isHeader && {
    backgroundColor: "#e3f2fd", // 파란색 배경
    fontWeight: "bold",
  }),
}));

// 스타일 적용된 TableRow
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#f5f5f5", // 배경색 지정 (선택적)
  },
}));

// 스타일 적용된 TableContainer
const PaddedTableContainer = styled(TableContainer)(({ theme }) => ({
  padding: "0 1cm", // 좌우 여백 1cm
  maxWidth: "100%", // 최대 너비를 화면 너비에 맞추기
  overflowX: "auto", // 수평 스크롤 활성화
}));

// 스타일 적용된 Table
const StyledTable = styled(Table)(({ theme }) => ({
  width: "calc(100% - 2cm)", // 테이블의 너비를 조정
}));

const Infoprotection = () => {
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
  const generateRowDetails = (rowData) => {
    // React Table을 HTML로 변환
    const detailsHtml = renderToString(
      <PaddedTableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell isHeader>자산코드</StyledTableCell>
              <StyledTableCell isHeader>자산명</StyledTableCell>
              <StyledTableCell isHeader>자산기준</StyledTableCell>
              <StyledTableCell isHeader>제조사</StyledTableCell>
              <StyledTableCell isHeader>목적</StyledTableCell>
              <StyledTableCell isHeader>부서</StyledTableCell>
              <StyledTableCell isHeader>위치</StyledTableCell>
              <StyledTableCell isHeader>사용자</StyledTableCell>
              <StyledTableCell isHeader>소유자</StyledTableCell>
              <StyledTableCell isHeader>보안담당자</StyledTableCell>
              <StyledTableCell isHeader>사용상태</StyledTableCell>
              <StyledTableCell isHeader>가동여부</StyledTableCell>
              <StyledTableCell isHeader>도입일자</StyledTableCell>
              <StyledTableCell isHeader>기밀성</StyledTableCell>
              <StyledTableCell isHeader>무결성</StyledTableCell>
              <StyledTableCell isHeader>가용성</StyledTableCell>
              <StyledTableCell isHeader>중요성점수</StyledTableCell>
              <StyledTableCell isHeader>중요성등급</StyledTableCell>
              <StyledTableCell isHeader>비고</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>{rowData.assetCode || "N/A"}</StyledTableCell>
              <StyledTableCell>{rowData.assetName || "N/A"}</StyledTableCell>
              <StyledTableCell>{rowData.assetBasis || "N/A"}</StyledTableCell>
              <StyledTableCell>
                {rowData.manufacturingCompany || "N/A"}
              </StyledTableCell>
              <StyledTableCell>{rowData.purpose || "N/A"}</StyledTableCell>
              <StyledTableCell>{rowData.department || "N/A"}</StyledTableCell>
              <StyledTableCell>
                {rowData.assetLocation || "N/A"}
              </StyledTableCell>
              <StyledTableCell>{rowData.assetUser || "N/A"}</StyledTableCell>
              <StyledTableCell>{rowData.assetOwner || "N/A"}</StyledTableCell>
              <StyledTableCell>
                {rowData.assetSecurityManager || "N/A"}
              </StyledTableCell>
              <StyledTableCell>{rowData.useState || "N/A"}</StyledTableCell>
              <StyledTableCell>
                {rowData.operationStatus || "N/A"}
              </StyledTableCell>
              <StyledTableCell>
                {rowData.introducedDate || "N/A"}
              </StyledTableCell>
              <StyledTableCell>
                {rowData.confidentiality || "N/A"}
              </StyledTableCell>
              <StyledTableCell>{rowData.integrity || "N/A"}</StyledTableCell>
              <StyledTableCell>{rowData.availability || "N/A"}</StyledTableCell>
              <StyledTableCell>
                {rowData.importanceScore || "N/A"}
              </StyledTableCell>
              <StyledTableCell>
                {rowData.importanceRating || "N/A"}
              </StyledTableCell>
              <StyledTableCell>{rowData.note || "N/A"}</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </StyledTable>
      </PaddedTableContainer>
    );

    return `
      <div style="padding: 10px;">
        <h4>상세 정보</h4>
        <p><strong>자산코드:</strong> ${rowData.assetCode}</p>
        <p><strong>자산명:</strong> ${rowData.assetName}</p>
        <p><strong>자산위치:</strong> ${rowData.assetLocation}</p>
        <p><strong>부서:</strong> ${rowData.department}</p>
        <div style="margin-top: 10px;">
          <button id="edit-button-${rowData.index}">수정 요청</button>
          <button id="maintenance-button-${rowData.index}">유지보수 등록</button>
        </div>
        ${detailsHtml}
      </div>
    `;
  };

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

export default Infoprotection;

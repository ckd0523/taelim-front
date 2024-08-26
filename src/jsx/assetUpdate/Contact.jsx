import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import axios from "axios";
import { GoTrash } from "react-icons/go";
import { renderToString } from "react-dom/server";
import {
  Popover,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";

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

const StyledTable = styled(Table)(({ theme }) => ({
  width: "calc(100% - 2cm)", // 테이블의 너비를 조정
}));

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

  // Popover 열기
  const handleRowClick = (event, rowData) => {
    setAnchorEl(event.currentTarget); // Popover를 열기 위한 엘리먼트 설정
    setSelectedRowData(rowData); // 선택한 행의 데이터를 상태로 설정
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
            render: (data, type, row, meta) => {
              // 체크박스 HTML 문자열 반환
              return `
                <input type="checkbox" class="select-checkbox" />
              `;
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
          { title: "Action", data: "manufacturingCompany" },
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
    }
  }, [data]); // data가 바뀔 때마다 테이블을 다시 렌더링

  return (
    <div>
      <h1>Asset List</h1>
      <table ref={tableRef} className="display" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>선택</th>
            <th>번호</th>
            <th>자산기준</th>
            <th>자산코드</th>
            <th>자산명</th>
            <th>자산분류</th>
            <th>목적/기능</th>
            <th>자산위치</th>
            <th>부서</th>
            <th>사용자</th>
            <th>소유자</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      {/* Popover Component */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: {
            maxWidth: "calc(100vw - 40px)", // Popover의 최대 너비를 화면 너비에 맞추기
            overflow: "hidden",
          },
        }}
      >
        <Paper>
          <Typography variant="h6" sx={{ p: 2, fontWeight: "bold" }}>
            기본 자산 정보 및 관리정보
          </Typography>
          <PaddedTableContainer component={Paper}>
            <StyledTable>
              <TableBody>
                {/* 제목 행 */}
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
                {/* 데이터 행 */}
                <TableRow>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.assetCode : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.assetName : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.assetBasis : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData
                      ? selectedRowData.manufacturingCompany
                      : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.purpose : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.department : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.assetLocation : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.assetUser : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.assetOwner : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData
                      ? selectedRowData.assetSecurityManager
                      : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.useState : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.operationStatus : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.introducedDate : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.confidentiality : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.integrity : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.availability : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.importanceScore : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.importanceRating : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.note : "N/A"}
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            </StyledTable>
            {/* 두 번째 테이블 */}
            <Typography variant="h6" sx={{ p: 2, fontWeight: "bold" }}>
              재무 및 구매 정보
            </Typography>
            <StyledTable>
              <TableBody>
                {/* 제목 행 */}
                <StyledTableRow>
                  <StyledTableCell isHeader>구매비용</StyledTableCell>
                  <StyledTableCell isHeader>구매날짜</StyledTableCell>
                  <StyledTableCell isHeader>내용연수</StyledTableCell>
                  <StyledTableCell isHeader>감가상각방법</StyledTableCell>
                  <StyledTableCell isHeader>구입처</StyledTableCell>
                  <StyledTableCell isHeader>구입처 연락처</StyledTableCell>
                  <StyledTableCell isHeader>취득경로</StyledTableCell>
                  <StyledTableCell isHeader>유지기간</StyledTableCell>
                  <StyledTableCell isHeader>잔존가치</StyledTableCell>
                  <StyledTableCell isHeader>현재가치</StyledTableCell>
                </StyledTableRow>
                {/* 데이터 행 */}
                <TableRow>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.purchaseCost : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.purchaseDate : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.serviceLife : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData
                      ? selectedRowData.depreciationMethod
                      : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.purchaseLocation : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.purchaseContact : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.acquisitionPath : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData
                      ? selectedRowData.maintenancePeriod
                      : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.residualValue : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.currentValue : "N/A"}
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            </StyledTable>
          </PaddedTableContainer>
          <Paper sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <Button onClick={handleEditRequest} sx={{ mx: 1 }}>
              수정요청
            </Button>
            <Button onClick={handleMaintenanceRegistration} sx={{ mx: 1 }}>
              유비보수 등록
            </Button>
            <Button onClick={handleClose} sx={{ mx: 1 }}>
              닫기
            </Button>
          </Paper>
        </Paper>
      </Popover>
    </div>
  );
};

export default Contact;

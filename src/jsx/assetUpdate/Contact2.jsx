import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
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

const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "isHeader",
})(({ theme, isHeader }) => ({
  textAlign: "center",
  border: "1px solid #ddd",
  ...(isHeader && {
    backgroundColor: "#e3f2fd",
    fontWeight: "bold",
  }),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#f5f5f5",
  },
}));

const PaddedTableContainer = styled(TableContainer)(({ theme }) => ({
  padding: "0 1cm",
  maxWidth: "100%",
  overflowX: "auto",
}));

const StyledTable = styled(Table)(({ theme }) => ({
  width: "calc(100% - 2cm)",
}));

const Contact2 = () => {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedAssetCodes, setSelectedAssetCodes] = useState([]);

  const handleEditRequest = () => {
    // 수정요청 로직
  };

  const handleMaintenanceRegistration = () => {
    // 유비보수 등록 로직
  };

  const printQRCodeBatch = async () => {
    try {
        if (selectedAssetCodes.length > 0) {
            const response = await axios.post(
                `http://localhost:8080/generateQRCodePDF`,
                selectedAssetCodes,
                {
                    responseType: "blob",
                }
            );

            // URL 생성
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

            // 새 창에서 PDF 열기
            const printWindow = window.open(url, "_blank");

            // 브라우저가 창을 닫지 않도록 하고, 인쇄를 수동으로 유도
            printWindow.onload = () => {
                printWindow.focus(); // 창을 포커스
            };

            // 메모리 누수를 방지하기 위해 URL 해제
            printWindow.onunload = () => {
                window.URL.revokeObjectURL(url);
            };

            // 선택된 자산 코드 리스트 초기화
            setSelectedAssetCodes([]);

            // 체크박스 해제
            $(tableRef.current)
                .find('.select-checkbox')
                .prop('checked', false);

        } else {
            alert("선택된 자산이 없습니다.");
        }
    } catch (error) {
        console.error("Error printing QR codes:", error);
    }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/assets/approved-not-disposed"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const table = $(tableRef.current).DataTable({
        data: data,
        columns: [
          {
            title: "선택",
            data: null,
            render: (data, type, row, meta) => {
              return `<input type="checkbox" class="select-checkbox" data-code="${row.assetCode}" />`;
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
        paging: true,
        pageLength: 10,
        destroy: true,
        responsive: true,
      });

      $(tableRef.current).on("change", ".select-checkbox", function () {
        const isChecked = $(this).is(":checked");
        const assetCode = $(this).data("code");

        setSelectedAssetCodes((prevCodes) => {
          if (isChecked) {
            return [...prevCodes, assetCode];
          } else {
            return prevCodes.filter((code) => code !== assetCode);
          }
        });
      });
    }
  }, [data]);

  const handleRowClick = (event, rowData) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowData(rowData);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <h1>Asset List</h1>
      <table
        ref={tableRef}
        className="display"
        style={{ width: "100%" }}
      ></table>
      <Button onClick={printQRCodeBatch} sx={{ m: 1 }}>
        QR 출력
      </Button>
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
            maxWidth: "calc(100vw - 40px)",
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
                <StyledTableRow>
                  <StyledTableCell isHeader>자산코드</StyledTableCell>
                  <StyledTableCell isHeader>자산명</StyledTableCell>
                  <StyledTableCell isHeader>자산기준</StyledTableCell>
                  {/* ... (다른 헤더들) */}
                </StyledTableRow>
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
                  {/* ... (다른 데이터들) */}
                </TableRow>
              </TableBody>
            </StyledTable>
            <Typography variant="h6" sx={{ p: 2, fontWeight: "bold" }}>
              재무 및 구매 정보
            </Typography>
            <StyledTable>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell isHeader>구매비용</StyledTableCell>
                  {/* ... (다른 헤더들) */}
                </StyledTableRow>
                <TableRow>
                  <StyledTableCell>
                    {selectedRowData ? selectedRowData.purchaseCost : "N/A"}
                  </StyledTableCell>
                  {/* ... (다른 데이터들) */}
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

export default Contact2;

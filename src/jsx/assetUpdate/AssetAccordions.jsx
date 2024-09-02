import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  styled,
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

const AssetAccordions = ({ selectedRowData }) => {
  const calculateImportanceScore = () => {
    if (selectedRowData) {
      const { confidentiality, integrity, availability } = selectedRowData;
      return (confidentiality || 0) + (integrity || 0) + (availability || 0);
    }
    return 0;
  };

  const calculateImportanceRating = (score) => {
    if (score >= 7 && score <= 9) return "A급";
    if (score >= 5 && score <= 6) return "B급";
    if (score >= 3 && score <= 4) return "C급";
    return "N/A";
  };

  const getClassificationColumns = (classification) => {
    // ... (원래 코드와 동일)
  };

  const importanceScore = calculateImportanceScore();
  const importanceRating = calculateImportanceRating(importanceScore);
  const classification = selectedRowData?.assetClassification;
  const columns = getClassificationColumns(classification);

  return (
    <PaddedTableContainer component={Paper}>
      <Typography variant="h2" sx={{ p: 2, fontWeight: "bold" }}>
        기본 자산 정보 및 관리정보
      </Typography>
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
            <StyledTableCell>
              {selectedRowData.assetCode || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.assetName || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.assetBasis || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.manufacturingCompany || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.purpose || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.department || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.assetLocation || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.assetUser || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.assetOwner || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.assetSecurityManager || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.useState || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.operationStatus || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.introducedDate || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.confidentiality || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.integrity || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.availability || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.importanceScore || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.importanceRating || "N/A"}
            </StyledTableCell>
            <StyledTableCell>{selectedRowData.note || "N/A"}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </StyledTable>

      <Typography variant="h2" sx={{ p: 2, fontWeight: "bold" }}>
        재무 및 구매 정보
      </Typography>
      <StyledTable>
        <TableHead>
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
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>
              {selectedRowData.purchaseCost || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.purchaseDate || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.usefulLife || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.depreciationMethod || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.purchaseSource || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.contactInformation || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.acquisitionRoute || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.maintenancePeriod || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.residualValue || "N/A"}
            </StyledTableCell>
            <StyledTableCell>
              {selectedRowData.currentValue || "N/A"}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </StyledTable>

      {/* 자산 분류에 따른 세 번째 테이블 추가 */}
      {classification && (
        <>
          <Typography variant="h2" sx={{ p: 2, fontWeight: "bold" }}>
            {classification} 정보
          </Typography>
          <StyledTable>
            <TableHead>
              <StyledTableRow>
                {columns.map((col) => (
                  <StyledTableCell key={col} isHeader>
                    {col}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                {columns.map((col) => (
                  <StyledTableCell key={col}>
                    {selectedRowData[col] || "N/A"}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableBody>
          </StyledTable>
        </>
      )}
    </PaddedTableContainer>
  );
};

export default AssetAccordions;

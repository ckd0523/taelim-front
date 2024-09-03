import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  styled,
} from "@mui/material";

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#f5f5f5", // 배경색 지정 (선택적)
  },
}));

const StyledTable = styled(Table)(({ theme }) => ({
  width: "calc(100% - 2cm)", // 테이블의 너비를 조정
}));

const PaddedTableContainer = styled(TableContainer)(({ theme }) => ({
  padding: "0 1cm", // 좌우 여백 1cm
  maxWidth: "100%", // 최대 너비를 화면 너비에 맞추기
  overflowX: "auto", // 수평 스크롤 활성화
}));

const getClassificationColumns = (classification) => {
  // ... (여기에 getClassificationColumns 함수 코드 그대로 넣기)
};

const calculateImportanceScore = (selectedRowData) => {
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

const AssetAccordions = ({ selectedRowData }) => {
  if (!selectedRowData) return null;

  const importanceScore = calculateImportanceScore(selectedRowData);
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
            <StyledTableCell isHeader>자산분류</StyledTableCell>
            <StyledTableCell isHeader>중요도</StyledTableCell>
            <StyledTableCell isHeader>중요도 평가</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>{selectedRowData.assetCode}</StyledTableCell>
            <StyledTableCell>{selectedRowData.assetName}</StyledTableCell>
            <StyledTableCell>
              {selectedRowData.assetClassification}
            </StyledTableCell>
            <StyledTableCell>{importanceScore}</StyledTableCell>
            <StyledTableCell>{importanceRating}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </StyledTable>
    </PaddedTableContainer>
  );
};

export default AssetAccordions;

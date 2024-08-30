import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";

// 스타일 적용된 TableCell
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

// 스타일 적용된 TableRow
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#f5f5f5",
  },
}));

const AssetAccordions = ({
  selectedRowData,
  handleEditRequest,
  handleMaintenanceRegistration,
}) => {
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

  const importanceScore = calculateImportanceScore();
  const importanceRating = calculateImportanceRating(importanceScore);
  const classification = selectedRowData?.assetClassification;

  // 열 헤더 정의 함수 재사용
  const getClassificationColumns = (classification) => {
    switch (classification) {
      // Add your classifications here (refer to previous example)
      case "INFORMATION_PROTECTION_SYSTEM":
        return [{ title: "서비스범위", data: "serviceScope" }];
      case "SOFTWARE":
        return [
          { title: "IP", data: "ip" },
          { title: "ID", data: "serverId" },
          { title: "PW", data: "serverPassword" },
          { title: "담당업체", data: "companyManager" },
          { title: "OS", data: "os" },
        ];
      default:
        return [];
    }
  };

  const columns = getClassificationColumns(classification);

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>기본 자산 정보 및 관리정보</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell isHeader>자산코드</StyledTableCell>
                  <StyledTableCell isHeader>자산명</StyledTableCell>
                  <StyledTableCell isHeader>제조사</StyledTableCell>
                  {/* ... 다른 헤더 추가 */}
                </StyledTableRow>
                <TableRow>
                  <StyledTableCell>
                    {selectedRowData?.assetCode || "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData?.assetName || "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData?.manufacturingCompany || "N/A"}
                  </StyledTableCell>
                  {/* ... 다른 데이터 추가 */}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>재무 및 구매 정보</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell isHeader>구매비용</StyledTableCell>
                  <StyledTableCell isHeader>구매날짜</StyledTableCell>
                  {/* ... 다른 헤더 추가 */}
                </StyledTableRow>
                <TableRow>
                  <StyledTableCell>
                    {selectedRowData?.purchaseCost || "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {selectedRowData?.purchaseDate || "N/A"}
                  </StyledTableCell>
                  {/* ... 다른 데이터 추가 */}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {classification && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{classification} 정보</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <StyledTableRow>
                    {columns.map((col) => (
                      <StyledTableCell key={col.title} isHeader>
                        {col.title}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                  <TableRow>
                    {columns.map((col) => (
                      <StyledTableCell key={col.title}>
                        {selectedRowData ? selectedRowData[col.data] : "N/A"}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <Button
          onClick={handleEditRequest}
          variant="contained"
          sx={{ marginRight: "10px" }}
        >
          수정요청
        </Button>
        <Button onClick={handleMaintenanceRegistration} variant="contained">
          유비보수 등록
        </Button>
      </div>
    </div>
  );
};

export default AssetAccordions;

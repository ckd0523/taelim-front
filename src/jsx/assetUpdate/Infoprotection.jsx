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
  Typography,
  styled,
} from "@mui/material";
import AssetAccordions from "./AssetAccordions";

const Infoprotection = () => {
  const tableRef = useRef(null);
  const trashIcon = renderToString(<GoTrash />);
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);

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
    fetchData();
  }, []);

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
      console.log("자산 상세 정보 데이터:", response.data); // 응답 데이터 출력
      setSelectedRowData(response.data); // 상태 업데이트
    } catch (error) {
      console.error("자산 상세 정보 가져오기 오류:", error);
    }
  };
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

  const getClassificationColumns = (classification) => {
    switch (classification) {
      case "INFORMATION_PROTECTION_SYSTEM":
        return [{ title: "서비스범위", data: "serviceScope" }];

      case "APPLICATION_PROGRAM":
        return [
          { title: "서비스범위", data: "serviceScope" },
          { title: "OS", data: "os" },
          { title: "관련DB", data: "relatedDB" },
          { title: "IP", data: "ip" },
          { title: "화면수", data: "screenNumber" },
        ];

      case "SOFTWARE":
        return [
          { title: "IP", data: "ip" },
          { title: "ID", data: "serverId" },
          { title: "PW", data: "serverPassword" },
          { title: "담당업체", data: "companyManager" },
          { title: "OS", data: "os" },
        ];

      case "ELECTRONIC_INFORMATION":
        return [
          { title: "OS", data: "os" },
          { title: "시스템", data: "system" },
          { title: "DB종류", data: "dbtype" },
        ];

      case "DOCUMENT":
        return [
          { title: "문서등급", data: "documentGrade" },
          { title: "문서형태", data: "documentType" },
          { title: "문서링크", data: "documentLink" },
        ];

      case "PATENTS_AND_TRADEMARKS":
        return [
          { title: "출원일자", data: "applicationDate" },
          { title: "등록일자", data: "registrationDate" },
          { title: "만료일자", data: "expirationDate" },
          { title: "특허/상표 상태", data: "patentTrademarkStatus" },
          { title: "출원국가", data: "countryApplication" },
          { title: "특허분류", data: "patentClassification" },
          { title: "특허세목", data: "patentItem" },
          { title: "출원번호", data: "applicationNo" },
          { title: "발명자", data: "inventor" },
          { title: "권리권자", data: "assignee" },
          { title: "관련문서", data: "relatedDocuments" },
        ];

      case "ITSYSTEM_EQUIPMENT":
        return [
          { title: "장비유형", data: "equipmentType" },
          { title: "랙유닛", data: "rackUnit" },
          { title: "전원공급장치", data: "powerSupply" },
          { title: "쿨링시스템", data: "coolingSystem" },
          { title: "인터페이스 포트", data: "interfacePorts" },
          { title: "폼팩터", data: "formFactor" },
          { title: "확장슬롯수", data: "expansionSlots" },
          { title: "그래픽카드", data: "graphicsCard" },
          { title: "포트 구성", data: "portConfiguration" },
          { title: "모니터 포함여부", data: "monitorIncluded" },
        ];

      case "ITNETWORK_EQUIPMENT":
        return [
          { title: "장비유형", data: "equipmentType" },
          { title: "포트수", data: "numberOfPorts" },
          { title: "지원프로토콜", data: "supportedProtocols" },
          { title: "펌웨어 버전", data: "firmwareVersion" },
          { title: "네트워크 속도", data: "networkSpeed" },
          { title: "서비스범위", data: "serviceScope" },
        ];

      case "TERMINAL":
        return [
          { title: "IP", data: "ip" },
          { title: "제품 시리얼 번호", data: "productSerialNumber" },
          { title: "OS", data: "os" },
          { title: "보안관제", data: "securityControl" },
          { title: "내부정보 유출 방지", data: "kaitsKeeper" },
          { title: "악성코드,랜섬웨어 탐지", data: "V3OfficeSecurity" },
          { title: "안티랜섬웨어", data: "appCheckPro" },
          { title: "NAC agent", data: "tgate" },
        ];

      case "FURNITURE":
        return [{ title: "크기", data: "furnitureSize" }];

      case "DEVICES":
        return [
          { title: "기기유형", data: "deviceType" },
          { title: "모델번호", data: "modelNumber" },
          { title: "연결방식", data: "connectionType" },
          { title: "전원사양", data: "powerSpecifications" },
        ];

      case "CAR":
        return [
          { title: "배기량", data: "displacement" },
          { title: "차량의 문 수", data: "doorsCount" },
          { title: "엔진 형식", data: "engineType" },
          { title: "차량 종류", data: "carType" },
          { title: "차량 식별번호", data: "identificationNo" },
          { title: "차량 색상", data: "carColor" },
          { title: "연식", data: "modelYear" },
        ];

      case "OTHERASSETS":
        return [
          { title: "기타 세부 설명", data: "otherDescription" },
          { title: "사용 빈도", data: "usageFrequency" },
        ];

      default:
        return [];
    }
  };

  // 중요성 점수를 계산
  const calculateImportanceScore = () => {
    if (selectedRowData) {
      const { confidentiality, integrity, availability } = selectedRowData;
      return (confidentiality || 0) + (integrity || 0) + (availability || 0);
    }
    return 0;
  };

  // 중요성 등급을 계산
  const calculateImportanceRating = (score) => {
    if (score >= 7 && score <= 9) return "A급";
    if (score >= 5 && score <= 6) return "B급";
    if (score >= 3 && score <= 4) return "C급";
    return "N/A";
  };
  useEffect(() => {
    if (data.length > 0) {
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
          searching: true,
          info: false,
          language: {
            paginate: {
              next: "다음",
              previous: "이전",
            },
            search: "검색:",
            lengthMenu: "페이지당 _MENU_ 개",
          },
          columnDefs: [
            { targets: [0, -1], orderable: false }, // 첫 번째 열(체크박스)와 마지막 열(Action) 비활성화
          ],
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
            console.log("Selected Row Data:", rowData);
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
      const generateRowDetails = (selectedRowData) => {
        const importanceScore = calculateImportanceScore();
        const importanceRating = calculateImportanceRating(importanceScore);
        const classification = selectedRowData?.assetClassification;
        console.log("Classification:", classification);

        const columns = getClassificationColumns(classification);
        console.log("Columns:", columns);

        return renderToString(
          <PaddedTableContainer component={Paper}>
            {/* <Typography variant="h2" sx={{ p: 2, fontWeight: "bold" }}>
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
                  <StyledTableCell>
                    {selectedRowData.note || "N/A"}
                  </StyledTableCell>
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
                <StyledTableCell>
                  {selectedRowData ? selectedRowData.purchaseCost : "N/A"}
                </StyledTableCell>
                <StyledTableCell>
                  {selectedRowData ? selectedRowData.purchaseDate : "N/A"}
                </StyledTableCell>
                <StyledTableCell>
                  {selectedRowData ? selectedRowData.usefulLife : "N/A"}
                </StyledTableCell>
                <StyledTableCell>
                  {selectedRowData ? selectedRowData.depreciationMethod : "N/A"}
                </StyledTableCell>
                <StyledTableCell>
                  {selectedRowData ? selectedRowData.purchaseSource : "N/A"}
                </StyledTableCell>
                <StyledTableCell>
                  {selectedRowData ? selectedRowData.contactInformation : "N/A"}
                </StyledTableCell>
                <StyledTableCell>
                  {selectedRowData ? selectedRowData.acquisitionRoute : "N/A"}
                </StyledTableCell>
                <StyledTableCell>
                  {selectedRowData ? selectedRowData.maintenancePeriod : "N/A"}
                </StyledTableCell>
                <StyledTableCell>
                  {selectedRowData ? selectedRowData.residualValue : "N/A"}
                </StyledTableCell>
                <StyledTableCell>
                  {selectedRowData ? selectedRowData.currentValue : "N/A"}
                </StyledTableCell>
              </TableBody>
            </StyledTable> */}

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
                        <StyledTableCell key={col.title} isHeader>
                          {col.title}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      {columns.map((col) => (
                        <StyledTableCell key={col.title}>
                          {selectedRowData ? selectedRowData[col.data] : "N/A"}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  </TableBody>
                </StyledTable>
              </>
            )}
          </PaddedTableContainer>
        );
        // <div style={{ marginTop: "10px" }}>
        //   <button id={`edit-button-${selectedRowData.assetCode}`}>
        //     수정 요청
        //   </button>
        //   <button id={`maintenance-button-${selectedRowData.assetCode}`}>
        //     유지보수 등록
        //   </button>
        // </div>
      };
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
      {selectedRowData && (
        <div>
          <h2>상세 정보</h2>
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
                  <StyledTableCell>
                    {selectedRowData.note || "N/A"}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </StyledTable>
          </PaddedTableContainer>
        </div>
      )}
    </div>
  );
};

export default Infoprotection;

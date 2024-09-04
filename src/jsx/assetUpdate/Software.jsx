import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import axios from "axios";
import "./style.css";
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
  Button,
} from "@mui/material";

const Software = () => {
  const tableRef = useRef(null);
  const trashIcon = renderToString(<GoTrash />);
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);

  // // 닫기 버튼 로직을 여기에 작성
  // const handleCloseClick = () => {
  //   console.log("닫기 버튼이 클릭되었습니다.");
  // };
  // // 수정 요청 핸들러
  // const handleEditClick = () => {
  //   console.log("수정 모드로 전환되었습니다.");
  // };

  // // 유지보수 등록 핸들러
  // const handleMaintenanceClick = () => {
  //   // 유지보수 등록 로직을 여기에 작성
  //   console.log("유지보수 등록 버튼이 클릭되었습니다.");
  // };

  // 데이터 로드 및 DataTable 초기화
  useEffect(() => {
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

  useEffect(() => {
    if (data.length > 0) {
      // 기존 DataTable이 존재하면 파괴
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().clear().destroy();
      }

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
          columnDefs: [{ targets: [0, -1], orderable: false }],
        });

        // 행 클릭 시 상세 정보 토글
        $(tableRef.current).on("click", "tbody tr", async function () {
          const tr = $(this);
          const row = table.row(tr);
          const rowData = row.data();

          if (rowData) {
            if (row.child.isShown()) {
              row.child.hide();
              tr.removeClass("shown");
            } else {
              const assetCode = rowData.assetCode;
              if (assetCode) {
                try {
                  const response = await axios.get(
                    `http://localhost:8080/asset/${assetCode}`
                  );
                  setSelectedRowData(response.data);
                  const details = generateRowDetails(response.data);
                  row.child(details).show();
                  tr.addClass("shown");

                  // // 상세 정보 버튼 이벤트 리스너 추가
                  // $(`#edit-button-${row.index()}`).on(
                  //   "click",
                  //   handleEditRequest
                  // );
                  // $(`#maintenance-button-${row.index()}`).on(
                  //   "click",
                  //   handleMaintenanceRegistration
                  // );
                } catch (error) {
                  console.error("자산 상세 정보 가져오기 오류:", error);
                }
              } else {
                console.warn("행 데이터가 정의되지 않았습니다.");
              }
            }
          } else {
            console.warn("행 데이터가 정의되지 않았습니다.");
          }
        });
      };
      // Action 버튼 클릭 이벤트
      $(tableRef.current).on("click", ".action-cell", function () {
        const assetCode = $(this).data("asset-code");
        handleDisposeAsset(assetCode);
      });
      initializeDataTable();
    }
  }, [data]);

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
  const calculateImportanceScore = (selectedRowData) => {
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

  const generateRowDetails = (selectedRowData) => {
    // selectedRowData 값 확인용 로그
    console.log("selectedRowData: ", selectedRowData);
    const importanceScore = calculateImportanceScore(selectedRowData);
    const importanceRating = calculateImportanceRating(importanceScore);
    const classification = selectedRowData?.assetClassification;
    const columns = getClassificationColumns(classification);

    return renderToString(
      <>
        <TableContainer component={Paper} className="table-container">
          <Typography variant="h2" className="typography-header">
            기본 자산 정보 및 관리정보
          </Typography>
          <Table className="table">
            <TableHead>
              <TableRow className="table-row">
                <TableCell className="table-cell header">자산코드</TableCell>
                <TableCell className="table-cell header">자산명</TableCell>
                <TableCell className="table-cell header">자산기준</TableCell>
                <TableCell className="table-cell header">제조사</TableCell>
                <TableCell className="table-cell header">목적</TableCell>
                <TableCell className="table-cell header">부서</TableCell>
                <TableCell className="table-cell header">위치</TableCell>
                <TableCell className="table-cell header">사용자</TableCell>
                <TableCell className="table-cell header">소유자</TableCell>
                <TableCell className="table-cell header">보안담당자</TableCell>
                <TableCell className="table-cell header">사용상태</TableCell>
                <TableCell className="table-cell header">가동여부</TableCell>
                <TableCell className="table-cell header">도입일자</TableCell>
                <TableCell className="table-cell header">기밀성</TableCell>
                <TableCell className="table-cell header">무결성</TableCell>
                <TableCell className="table-cell header">가용성</TableCell>
                <TableCell className="table-cell header">중요성점수</TableCell>
                <TableCell className="table-cell header">중요성등급</TableCell>
                <TableCell className="table-cell header">비고</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className="table-row">
                <TableCell className="table-cell">
                  {selectedRowData.assetCode || "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData.assetName || "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData.assetBasis || "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData.manufacturingCompany || "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData.purpose || "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData.department || "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData.assetLocation || "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData.assetUser || "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData.assetOwner || "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData.assetSecurityManager || "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData.useState || "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData.operationStatus || "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData.introducedDate || "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData.confidentiality || "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData.integrity || "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData.availability || "N/A"}
                </TableCell>
                <TableCell className="table-cell">{importanceScore}</TableCell>
                <TableCell className="table-cell">{importanceRating}</TableCell>
                <TableCell className="table-cell">
                  {selectedRowData.note || "N/A"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Typography variant="h2" className="typography-header">
            재무 및 구매 정보
          </Typography>
          <Table className="table">
            <TableHead>
              <TableRow className="table-row">
                <TableCell className="table-cell header">구매비용</TableCell>
                <TableCell className="table-cell header">구매날짜</TableCell>
                <TableCell className="table-cell header">내용연수</TableCell>
                <TableCell className="table-cell header">
                  감가상각방법
                </TableCell>
                <TableCell className="table-cell header">구입처</TableCell>
                <TableCell className="table-cell header">
                  구입처 연락처
                </TableCell>
                <TableCell className="table-cell header">취득경로</TableCell>
                <TableCell className="table-cell header">유지기간</TableCell>
                <TableCell className="table-cell header">잔존가치</TableCell>
                <TableCell className="table-cell header">현재가치</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className="table-row">
                <TableCell className="table-cell">
                  {selectedRowData ? selectedRowData.purchaseCost : "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData ? selectedRowData.purchaseDate : "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData ? selectedRowData.usefulLife : "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData ? selectedRowData.depreciationMethod : "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData ? selectedRowData.purchaseSource : "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData ? selectedRowData.contactInformation : "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData ? selectedRowData.acquisitionRoute : "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData ? selectedRowData.maintenancePeriod : "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData ? selectedRowData.residualValue : "N/A"}
                </TableCell>
                <TableCell className="table-cell">
                  {selectedRowData ? selectedRowData.currentValue : "N/A"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {classification && (
            <>
              <Typography variant="h2" className="typography-header">
                {classification} 정보
              </Typography>
              <Table className="table">
                <TableHead>
                  <TableRow className="table-row">
                    {columns.map((col) => (
                      <TableCell key={col.title} className="table-cell header">
                        {col.title}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className="table-row">
                    {columns.map((col) => (
                      <TableCell key={col.title} className="table-cell">
                        {selectedRowData ? selectedRowData[col.data] : "N/A"}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </>
          )}
        </TableContainer>
        {/* 버튼 섹션
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditClick}
            style={{ marginRight: "10px" }}
          >
            수정
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleMaintenanceClick}
            style={{ marginRight: "10px" }}
          >
            유지보수 등록
          </Button>
          <Button
            variant="contained"
            color="default"
            onClick={handleCloseClick}
          >
            닫기
          </Button>
        </div> */}
      </>
    );
  };

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

export default Software;

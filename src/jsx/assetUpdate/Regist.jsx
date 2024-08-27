import { useEffect, useState } from "react";
import axios from "axios";

const Regist = () => {
  const [formData, setFormData] = useState({
    assetName: "",
    assetBasis: "COMMON",
    manufacturingCompany: "",
    purpose: "",
    department: "ADMINISTRATIVE_DEPARTMENT",
    assetLocation: "MAIN_1F",
    // assetUser: "",
    // assetOwner: "",
    // assetSecurityManager: "",
    quantity: 0,
    ownership: "OWNED",
    useState: "NEW",
    operationStatus: "OPERATING",
    introducedDate: "",
    confidentiality: 0,
    integrity: 0,
    availability: 0,
    note: "",
    purchaseCost: 0,
    purchaseDate: "",
    usefulLife: 0,
    depreciationMethod: "FIXED_AMOUNT",
    purchaseSource: "",
    contactInformation: "",
    acquisitionRoute: "",
    maintenancePeriod: 0,
    assetClassification: "INFORMATION_PROTECTION_SYSTEM",
    assetCategories: "", // 새 필드 추가
    // 동적 필드에 대한 상태 추가
    serviceScope: "",
    OS: "",
    relatedDB: "",
    IP: "",
    screenNumber: "0",
    serverId: "",
    serverPassword: "",
    companyManager: "",
    system: "",
    DBType: "",
    documentGrade: "CONFIDENTIAL",
    documentType: "GENERAL_DOCUMENT",
    documentLink: "",
    applicationDate: "",
    registrationDate: "",
    expirationDate: "",
    patentTrademarkStatus: "PCT_APPLICATION",
    countryApplication: "KOREA",
    patentClassification: "NEW_MATERIALS",
    patentItem: "COMPOSITE_MATERIALS",
    applicationNo: "",
    inventor: "",
    assignee: "",
    relatedDocuments: "",
  });

  // 입력 변화 처리 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      assetCategories: value,
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    // 서버로 데이터 전송
    fetch("http://localhost:8080/asset/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // JSON으로 변환하여 전송
    })
      .then((response) => {
        if (response.ok) {
          alert("자산이 성공적으로 등록되었습니다.");
        } else {
          alert("자산 등록에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("에러 발생:", error);
        alert("자산 등록 중 에러가 발생했습니다.");
      });
  };

  // const [assetCategories, setAssetCategories] = useState("");
  // const handelChangeCategories = (e) => {
  //   setAssetCategories(e.target.value);
  //   console.log(e.target.value);
  // };
  // 자산분류에 따라 추가적인 컬럼을 렌더링하는 함수
  const renderAdditionalFields = () => {
    switch (formData.assetCategories) {
      case "INFORMATION_PROTECTION_SYSTEM":
        return (
          <div>
            <label>
              서비스범위
              <input
                type="text"
                name="serviceScope"
                value={formData.serviceScope}
                onChange={handleChange}
              />
            </label>
          </div>
        );
        break;
      case "APPLICATION_PROGRAM":
        return (
          <div>
            <label>
              서비스범위
              <input
                type="text"
                name="serviceScope"
                value={formData.serviceScope}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              OS
              <input
                type="text"
                name="OS"
                value={formData.OS}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              관련DB
              <input
                type="text"
                name="relatedDB"
                value={formData.relatedDB}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              IP
              <input
                type="text"
                name="IP"
                value={formData.IP}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              화면수
              <input
                type="number"
                name="screenNumber"
                value={formData.screenNumber}
                onChange={handleChange}
              />
            </label>
          </div>
        );
        break;
      case "SOFTWARE":
        return (
          <div>
            <label>
              IP
              <input
                type="text"
                name="IP"
                value={formData.IP}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              ID
              <input
                type="text"
                name="serverId"
                value={formData.serverId}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              PW
              <input
                type="text"
                name="serverPassword"
                value={formData.serverPassword}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              담당업체
              <input
                type="text"
                name="companyManager"
                value={formData.companyManager}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              OS
              <input
                type="text"
                name="OS"
                value={formData.OS}
                onChange={handleChange}
              />
            </label>
          </div>
        );
        break;
      case "ELECTRONIC_INFORMATION":
        return (
          <div>
            <label>
              OS
              <input
                type="text"
                name="OS"
                value={formData.OS}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              시스템
              <input
                type="text"
                name="system"
                value={formData.system}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              DB종류
              <input
                type="text"
                name="DBType"
                value={formData.DBType}
                onChange={handleChange}
              />
            </label>
          </div>
        );
        break;
      case "DOCUMENT":
        return (
          <div>
            <label>
              문서등급
              <select
                name="documentGrade"
                value={formData.documentGrade}
                onChange={handleChange}
              >
                <option value="CONFIDENTIAL">대외비</option>
                <option value="INTERNAL">내부용</option>
                <option value="PUBLIC">일반</option>
              </select>
            </label>
            <br />
            <label>
              문서형태
              <select
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
              >
                <option value="GENERAL_DOCUMENT">일반문서</option>
                <option value="CONTRACTS_AND_LEGAL_DOCUMENTS">
                  계약 및 법적문서
                </option>
                <option value="REPORTS_AND_PRESENTATIONS">
                  보고서 및 프레젠테이션
                </option>
                <option value="FORMS_AND_TEMPLATES">양식 및 서식</option>
              </select>
            </label>
            <br />
            <label>
              문서링크
              <input
                type="text"
                name="documentLink"
                value={formData.documentLink}
                onChange={handleChange}
              />
            </label>
          </div>
        );
        break;
      case "PATENTS_AND_TRADEMARKS":
        return (
          <div>
            <label>
              출원일자
              <input
                type="date"
                name="applicationDate"
                value={formData.applicationDate}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              등록일자
              <input
                type="date"
                name="registrationDate"
                value={formData.registrationDate}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              만료일자
              <input
                type="date"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              특허/상표 상태
              <select
                name="patentTrademarkStatus"
                value={formData.patentTrademarkStatus}
                onChange={handleChange}
              >
                <option value="PCT_APPLICATION">PCT 출원</option>
                <option value="APPLICATION">출원</option>
                <option value="REGISTERED">등록</option>
                <option value="EXPIRED">만료</option>
              </select>
            </label>
            <br />
            <label>
              출원국가
              <select
                name="countryApplication"
                value={formData.countryApplication}
                onChange={handleChange}
              >
                <option value="KOREA">한국</option>
                <option value="USA">미국</option>
                <option value="JAPAN">일본</option>
                <option value="CHINA">중국</option>
                <option value="GERMANY">독일</option>
              </select>
            </label>
            <br />
            <label>
              특허분류
              <select
                name="patentClassification"
                value={formData.patentClassification}
                onChange={handleChange}
              >
                <option value="NEW_MATERIALS">신소재</option>
                <option value="INCUBATION">인큐베이션</option>
              </select>
            </label>
            <br />
            <label>
              특허세목
              <select
                name="patentItem"
                value={formData.patentItem}
                onChange={handleChange}
              >
                <option value="COMPOSITE_MATERIALS">복합재</option>
                <option value="CORPORATE_VENTURE">신소재</option>
              </select>
            </label>
            <br />
            <label>
              출원번호
              <input
                type="date"
                name="applicationNo"
                value={formData.applicationNo}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              발명자
              <input
                type="date"
                name="inventor"
                value={formData.inventor}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              권리권자
              <input
                type="date"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              관련문서
              <input
                type="date"
                name="relatedDocuments"
                value={formData.relatedDocuments}
                onChange={handleChange}
              />
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>기본 자산 정보 및 관리 정보</h2>
        <label>
          자산분류
          {/* <input
            type="text"
            name="assetClassification"
            value={formData.assetClassification}
            onChange={handleChange}
          /> */}
          <select
            onChange={handleCategoryChange}
            value={formData.assetCategories}
            name="assetCategories"
          >
            <option value="INFORMATION_PROTECTION_SYSTEM">
              정보보호시스템
            </option>
            <option value="APPLICATION_PROGRAM">응용프로그램</option>
            <option value="SOFTWARE">소프트웨어</option>
            <option value="ELECTRONIC_INFORMATION">전자정보</option>
            <option value="DOCUMENT">문서</option>
            <option value="PATENTS_AND_TRADEMARKS">특허 및 상표</option>
            <option value="ITSYSTEM_EQUIPMENT">IT장비-시스템</option>
            <option value="ITNETWORK_EQUIPMENT">IT장비-네트워크</option>
            <option value="TERMINAL">단말기</option>
            <option value="FURNITURE">가구</option>
            <option value="DEVICES">기기</option>
            <option value="CAR">차량</option>
            <option value="OTHERASSETS">기타</option>
          </select>
        </label>
        <br />
        <label>
          자산명
          <input
            type="text"
            name="assetName"
            value={formData.assetName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          자산기준
          <select
            name="assetBasis"
            value={formData.assetBasis}
            onChange={handleChange}
          >
            <option value="COMMON">일반</option>
            <option value="TISAX">TISAX</option>
          </select>
        </label>
        <br />
        <label>
          제조사
          <input
            type="text"
            name="manufacturingCompany"
            value={formData.manufacturingCompany}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          목적
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          부서
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="IT부">IT부</option>
            <option value="관리부">관리부</option>
            <option value="영업부">영업부</option>
            <option value="마케팅부">마케팅부</option>
            <option value="생산부">생산부</option>
            <option value="운영부">운영부</option>
            <option value="인사부">인사부</option>
          </select>
        </label>
        <br />
        <label>
          위치
          <select
            name="assetLocation"
            value={formData.assetLocation}
            onChange={handleChange}
          >
            <option value="본관 지하 문서고">본관 지하 문서고</option>
            <option value="본관 1층">본관 1층</option>
            <option value="본관 1층 접견실">본관 1층 접견실</option>
            <option value="본관 2층">본관 2층</option>
            <option value="본관 2층 사장실">본관 2층 사장실</option>
            <option value="본관 2층 기술연구소 사무실">
              본관 2층 기술연구소 사무실
            </option>
            <option value="본관 2층 대회의실">본관 2층 대회의실</option>
            <option value="본관 2층 대표이사실">본관 2층 대표이사실</option>
            <option value="본관 3층 창고">본관 3층 창고</option>
            <option value="MDCG">MDCG</option>
            <option value="공장동">공장동</option>
          </select>
        </label>
        <br />
        {/* <label>
          사용자
          <input
            type="text"
            name="assetUser"
            value={formData.assetUser}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          소유자
          <input
            type="text"
            name="assetOwner"
            value={formData.assetOwner}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          보안담당자
          <input
            type="text"
            name="assetSecurityManager"
            value={formData.assetSecurityManager}
            onChange={handleChange}
          />
        </label> */}
        <br />
        <label>
          수량
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          소유권
          <select
            name="ownership"
            value={formData.ownership}
            onChange={handleChange}
          >
            <option value="OWNED">소유</option>
            <option value="LEASED">임대</option>
          </select>
        </label>
        <br />
        <label>
          사용상태
          <select
            name="useState"
            value={formData.useState}
            onChange={handleChange}
          >
            <option value="신규">신규</option>
            <option value="사용중">사용중</option>
            <option value="유지관리 중">유지관리 중</option>
            <option value="예비">예비</option>
            <option value="퇴직/폐기">퇴직/폐기</option>
          </select>
        </label>
        <br />
        <label>
          가동여부
          <select
            name="operationStatus"
            value={formData.operationStatus}
            onChange={handleChange}
          >
            <option value="가동중">가동중</option>
            <option value="미가동">미가동</option>
            <option value="고장">고장</option>
          </select>
        </label>
        <br />
        <label>
          도입일자
          <input
            type="text"
            name="introducedDate"
            value={formData.introducedDate}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          기밀성
          <input
            type="number"
            name="confidentiality"
            value={formData.confidentiality}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          무결성
          <input
            type="number"
            name="integrity"
            value={formData.integrity}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          가용성
          <input
            type="number"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          비고
          <textarea name="note" value={formData.note} onChange={handleChange} />
        </label>
      </div>
      <div>
        <h2>재무 및 구매정보</h2>
        <label>
          구매비용
          <input
            type="number"
            name="purchaseCost"
            value={formData.purchaseCost}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          구매날짜
          <input
            type="text"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          내용연수
          <input
            type="number"
            name="usefulLife"
            value={formData.usefulLife}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          감가상각방법
          <select
            name="depreciationMethod"
            value={formData.depreciationMethod}
            onChange={handleChange}
          >
            <option value="정액법">정액법</option>
            <option value="정률법">정률법</option>
          </select>
        </label>
        <br />
        <label>
          구입처
          <input
            type="text"
            name="purchaseSource"
            value={formData.purchaseSource}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          구입처연락처
          <input
            type="text"
            name="contactInformation"
            value={formData.contactInformation}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          취득경로
          <input
            type="text"
            name="acquisitionRoute"
            value={formData.acquisitionRoute}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          유지기간
          <input
            type="number"
            name="maintenancePeriod"
            value={formData.maintenancePeriod}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <h2>자산분류별 컬럼</h2>
        {renderAdditionalFields()}
      </div>

      <button type="submit">제출</button>
    </form>
  );
};

export default Regist;

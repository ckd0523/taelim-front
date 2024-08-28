//기본 자산 정보
import { useState } from "react";
import AssetCategories from "./AssetCategories";
import PurchasingInfo from "./PurchasingInfo";

//기본 자산 정보 및 관리 정보 컬럼
const BasisAssetInfo = ({ formData, handleChange }) => {
  return (
    <div>
      <label>
        자산분류
        <select
          name="assetClassification"
          value={formData.assetClassification}
          onChange={handleChange}
        >
          <option value="INFORMATION_PROTECTION_SYSTEM">정보보호시스템</option>
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
          <option value="IT_DEPARTMENT">IT부</option>
          <option value="ADMINISTRATIVE_DEPARTMENT">관리부</option>
          <option value="SALES_DEPARTMENT">영업부</option>
          <option value="MARKETING_DEPARTMENT">마케팅부</option>
          <option value="PRODUCTION_DEPARTMENT">생산부</option>
          <option value="OPERATIONS_DEPARTMENT">운영부</option>
          <option value="HUMAN_RESOURCES_DEPARTMENT">인사부</option>
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
          <option value="MAIN_B1_DOCUMENT_STORAGE">본관 지하 문서고</option>
          <option value="MAIN_1F">본관 1층</option>
          <option value="MAIN_1F_RECEPTION_ROOM">본관 1층 접견실</option>
          <option value="MAIN_2F">본관 2층</option>
          <option value="MAIN_2F_PRESIDENT_OFFICE">본관 2층 사장실</option>
          <option value="MAIN_2F_RESEARCH_OFFICE">
            본관 2층 기술연구소 사무실
          </option>
          <option value="MAIN_2F_CONFERENCE_ROOM">본관 2층 대회의실</option>
          <option value="MAIN_2F_CEO_OFFICE">본관 2층 대표이사실</option>
          <option value="MAIN_3F_STORAGE">본관 3층 창고</option>
          <option value="MDCG">MDCG</option>
          <option value="FACTORY_BUILDING">공장동</option>
        </select>
      </label>
      <br />
      <label>
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
      </label>
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
          <option value="NEW">신규</option>
          <option value="IN_USE">사용중</option>
          <option value="UNDER_MAINTENANCE">유지관리 중</option>
          <option value="RESERVED">예비</option>
          <option value="RETIRED_DISCARDED">퇴직/폐기</option>
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
          <option value="OPERATING">가동중</option>
          <option value="NOT_OPERATING">미가동</option>
          <option value="MALFUNCTION">고장</option>
        </select>
      </label>
      <br />
      <label>
        도입일자
        <input
          type="date"
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
      <br />
      <h2>재무 및 구매정보</h2>
      <PurchasingInfo formData={formData} handleChange={handleChange} />
      <br />
      <h2>자산분류별 컬럼</h2>
      <AssetCategories
        formData={formData}
        assetClassification={formData.assetClassification}
        handleChange={handleChange}
      />
    </div>
  );
};

export default BasisAssetInfo;

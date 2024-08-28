import axios from "axios";
import BasisAssetInfo from "./BasisAssetInfo";
import { useState } from "react";

//자산등록
const AssetRegister = () => {
  const [formData, setFormData] = useState({
    assetClassification: "INFORMATION_PROTECTION_SYSTEM",
    assetName: "",
    assetBasis: "COMMON",
    manufacturingCompany: "",
    purpose: "",
    department: "IT_DEPARTMENT",
    assetLocation: "MAIN_B1_DOCUMENT_STORAGE",
    assetUser: "",
    assetOwner: "",
    assetSecurityManager: "",
    quantity: 1,
    ownership: "OWNED",
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
    maintenancePeriod: "",
    serviceScope: "",
    os: "",
    relatedDB: "",
    ip: "",
    serverId: "",
    serverPassword: "",
    companyManager: "",
    screenNumber: 0,
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
    equipmentType: "",
    rackUnit: "",
    powerSupply: "",
    coolingSystem: "",
    interfacePorts: "",
    formFactor: "",
    expansionSlots: "",
    graphicsCard: "",
    portConfiguration: "",
    numberOfPorts: "",
    supportedProtocols: "",
    firmwareVersion: "",
    networkSpeed: "",
    productSerialNumber: "",
    securityControl: "MONITORING",
    kaitsKeeper: "",
    V3OfficeSecurity: "",
    appCheckPro: "",
    tgate: "",
    furnitureSize: "",
    deviceType: "",
    modelNumber: "",
    connectionType: "",
    powerSpecifications: "",
    displacement: 0,
    doorsCount: 0,
    engineType: "GASOLINE",
    carType: "SEDAN",
    identificationNo: "",
    carColor: "",
    modelYear: 0,
    otherDescription: "",
    usageFrequency: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <div>
        <h2>기본 자산 정보 및 관리 정보</h2>
        <BasisAssetInfo formData={formData} handleChange={handleChange} />
      </div>
      <button type="submit" onClick={handleSubmit}>
        저장
      </button>
    </div>
  );
};

export default AssetRegister;

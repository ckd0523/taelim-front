import axios from "axios";
import BasisAssetInfo from "./BasisAssetInfo";
import { useState } from "react";
const AssetRegister = () => {
  const [formData, setFormData] = useState({
    assetCategories: "정보보호시스템",
    assetName: "",
    assetBasis: "COMMON",
    manufacturingCompany: "",
    purpose: "",
    department: "IT_DEPARTMENT",
    assetLocation: "",
    assetUser: "",
    assetOwner: "",
    assetSecurityManager: "",
    quantity: 1,
    ownership: "",
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
    OS: "",
    relatedDB: "",
    IP: "",
    screenNumber: 0,
    documentGrade: "",
    documentType: "",
    documentLink: "",
    applicationDate: "",
    registrationDate: "",
    expirationDate: "",
    patentTrademarkStatus: "",
    countryApplication: "",
    patentClassification: "",
    patentItem: "",
    applicationNo: "",
    inventor: "",
    assignee: "",
    relatedDocuments: "",
    deviceType: "",
    modelNumber: "",
    connectionType: "",
    powerSpecifications: "",
    displacement: 0,
    doorsCount: 0,
    engineType: "",
    carType: "",
    identificationNo: "",
    carColor: "",
    modelYear: 0,
    furnitureSize: "",
    otherDescription: "",
    usageFrequency: "",
  });

  const fetchAssetRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/asset/register",
        formData, // 요청 본문에 보낼 데이터
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert("자산이 성공적으로 등록되었습니다.");
    } catch (error) {
      console.error("에러 발생:", error);
      alert("자산 등록 중 오류가 발생했습니다.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value === "" ? null : value,
    }));
  };

  return (
    <form method="post">
      <div>
        <h2>기본 자산 정보 및 관리 정보</h2>
        <BasisAssetInfo formData={formData} handleChange={handleChange} />
      </div>
      <button type="submit" onClick={fetchAssetRegister}>
        저장
      </button>
    </form>
  );
};

export default AssetRegister;

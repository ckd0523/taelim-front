//자산분류별 컬럼

const AssetCategories = ({ assetClassification, formData, handleChange }) => {
  const renderAdditionalFields = () => {
    switch (assetClassification) {
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
                name="os"
                value={formData.os}
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
                name="ip"
                value={formData.ip}
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
      case "SOFTWARE":
        return (
          <div>
            <label>
              IP
              <input
                type="text"
                name="ip"
                value={formData.ip}
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
                name="os"
                value={formData.os}
                onChange={handleChange}
              />
            </label>
          </div>
        );
      case "ELECTRONIC_INFORMATION":
        return (
          <div>
            <label>
              OS
              <input
                type="text"
                name="os"
                value={formData.os}
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
                name="dbtype"
                value={formData.dbtype}
                onChange={handleChange}
              />
            </label>
          </div>
        );
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
                type="text"
                name="applicationNo"
                value={formData.applicationNo}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              발명자
              <input
                type="text"
                name="inventor"
                value={formData.inventor}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              권리권자
              <input
                type="text"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              관련문서
              <input
                type="text"
                name="relatedDocuments"
                value={formData.relatedDocuments}
                onChange={handleChange}
              />
            </label>
          </div>
        );
      case "ITSYSTEM_EQUIPMENT":
        return (
          <div>
            <label>
              장비유형
              <input
                type="text"
                name="equipmentType"
                value={formData.equipmentType}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              랙유닛
              <input
                type="number"
                name="rackUnit"
                value={formData.rackUnit}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              전원공급장치
              <input
                type="text"
                name="powerSupply"
                value={formData.powerSupply}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              쿨링시스템
              <input
                type="text"
                name="coolingSystem"
                value={formData.coolingSystem}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              인터페이스 포트
              <input
                type="text"
                name="interfacePorts"
                value={formData.interfacePorts}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              폼팩터
              <input
                type="text"
                name="formFactor"
                value={formData.formFactor}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              확장슬롯수
              <input
                type="number"
                name="expansionSlots"
                value={formData.expansionSlots}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              그래픽카드
              <input
                type="text"
                name="graphicsCard"
                value={formData.graphicsCard}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              포트 구성
              <input
                type="text"
                name="portConfiguration"
                value={formData.portConfiguration}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              모니터 포함여부
              <br />
              <label>
                <input
                  type="radio"
                  value="포함"
                  checked={formData.monitorIncluded === true}
                  onChange={handleChange}
                />
                포함
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="미포함"
                  checked={formData.monitorIncluded === false}
                  onChange={handleChange}
                />
                미포함
              </label>
            </label>
          </div>
        );
      case "ITNETWORK_EQUIPMENT":
        return (
          <div>
            <label>
              장비유형
              <input
                type="text"
                name="equipmentType"
                value={formData.equipmentType}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              포트수
              <input
                type="number"
                name="numberOfPorts"
                value={formData.numberOfPorts}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              지원프로토콜
              <input
                type="text"
                name="supportedProtocols"
                value={formData.supportedProtocols}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              펌웨어 버전
              <input
                type="text"
                name="firmwareVersion"
                value={formData.firmwareVersion}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              네트워크 속도
              <input
                type="number"
                name="networkSpeed"
                value={formData.networkSpeed}
                onChange={handleChange}
              />
            </label>
            <br />
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
          </div>
        );
      case "TERMINAL":
        return (
          <div>
            <label>
              IP
              <input
                type="text"
                name="ip"
                value={formData.ip}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              제품 시리얼 번호
              <input
                type="text"
                name="productSerialNumber"
                value={formData.productSerialNumber}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              OS
              <input
                type="text"
                name="os"
                value={formData.os}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              보안관제
              <select
                name="securityControl"
                value={formData.securityControl}
                onChange={handleChange}
              >
                <option value="MONITORING">관제중</option>
                <option value="ANOMALY_DETECTED">이상감지</option>
                <option value="MONITORING_COMPLETED">관제완료</option>
              </select>
            </label>
            <br />
            <label>
              내부정보 유출 방지
              <input
                type="date"
                name="kaitsKeeper"
                value={formData.kaitsKeeper}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              악성코드,랜섬웨어 탐지
              <input
                type="date"
                name="V3OfficeSecurity"
                value={formData.V3OfficeSecurity}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              안티랜섬웨어
              <input
                type="date"
                name="appCheckPro"
                value={formData.appCheckPro}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              NAC agent
              <input
                type="date"
                name="tgate"
                value={formData.tgate}
                onChange={handleChange}
              />
            </label>
            <br />
          </div>
        );
      case "FURNITURE":
        return (
          <div>
            <label>
              크기
              <input
                type="text"
                name="furnitureSize"
                value={formData.furnitureSize}
                onChange={handleChange}
              />
            </label>
            <br />
          </div>
        );
      case "DEVICES":
        return (
          <div>
            <label>
              기기유형
              <input
                type="text"
                name="deviceType"
                value={formData.deviceType}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              모델번호
              <input
                type="text"
                name="modelNumber"
                value={formData.modelNumber}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              연결방식
              <input
                type="text"
                name="connectionType"
                value={formData.connectionType}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              전원사양
              <input
                type="text"
                name="powerSpecifications"
                value={formData.powerSpecifications}
                onChange={handleChange}
              />
            </label>
            <br />
          </div>
        );
      case "CAR":
        return (
          <div>
            <label>
              배기량
              <input
                type="number"
                name="displacement"
                value={formData.displacement}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              차량의 문 수
              <input
                type="number"
                name="doorsCount"
                value={formData.doorsCount}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              엔진 형식
              <select
                name="engineType"
                value={formData.engineType}
                onChange={handleChange}
              >
                <option value="GASOLINE">가솔린</option>
                <option value="DIESEL">디젤</option>
                <option value="HYBRID">하이브리드</option>
                <option value="ELECTRIC">전기</option>
              </select>
            </label>
            <br />
            <label>
              차량 종류
              <select
                name="carType"
                value={formData.carType}
                onChange={handleChange}
              >
                <option value="SEDAN">승용차</option>
                <option value="SUV">SUV</option>
                <option value="TRUCK">트럭</option>
                <option value="VAN">밴</option>
              </select>
            </label>
            <br />
            <label>
              차량 식별번호
              <input
                type="text"
                name="identificationNo"
                value={formData.identificationNo}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              차량 색상
              <input
                type="text"
                name="carColor"
                value={formData.carColor}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              연식
              <input
                type="number"
                name="modelYear"
                value={formData.modelYear}
                onChange={handleChange}
              />
            </label>
            <br />
          </div>
        );
      case "OTHERASSETS":
        return (
          <div>
            <label>
              기타 세부 설명
              <input
                type="text"
                name="otherDescription"
                value={formData.otherDescription}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              사용 빈도
              <input
                type="text"
                name="usageFrequency"
                value={formData.usageFrequency}
                onChange={handleChange}
              />
            </label>
            <br />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div>{renderAdditionalFields()}</div>
    </>
  );
};
export default AssetCategories;

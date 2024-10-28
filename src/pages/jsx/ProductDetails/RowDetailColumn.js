// 자산 분류에 따른 동적 열 정의 함수
export const getClassificationColumns = (classification) => {
	switch (classification) {
		case '정보보호시스템':
			return [{ Header: '서비스범위', accessor: 'serviceScope' }];

		case '응용프로그램':
			return [
				{ Header: '서비스범위', accessor: 'serviceScope' },
				{ Header: 'OS', accessor: 'os' },
				{ Header: '관련DB', accessor: 'relatedDB' },
				{ Header: 'IP', accessor: 'ip' },
				{ Header: '화면수', accessor: 'screenNumber' },
			];

		case '소프트웨어':
			return [
				{ Header: 'IP', accessor: 'ip' },
				{ Header: 'ID', accessor: 'serverId' },
				{ Header: 'PW', accessor: 'serverPassword' },
				{ Header: '담당업체', accessor: 'companyManager' },
				{ Header: 'OS', accessor: 'os' },
			];

		case '전자정보':
			return [
				{ Header: 'OS', accessor: 'os' },
				{ Header: '시스템', accessor: 'system' },
				{ Header: 'DB종류', accessor: 'dbtype' },
			];

		case '문서':
			return [
				{ Header: '문서등급', accessor: 'documentGrade' },
				{ Header: '문서형태', accessor: 'documentType' },
				{ Header: '문서링크', accessor: 'documentLink' },
			];

		case '특허 및 상표':
			return [
				{ Header: '출원일자', accessor: 'applicationDate' },
				{ Header: '등록일자', accessor: 'registrationDate' },
				{ Header: '만료일자', accessor: 'expirationDate' },
				{ Header: '특허/상표 상태', accessor: 'patentTrademarkStatus' },
				{ Header: '출원국가', accessor: 'countryApplication' },
				{ Header: '특허분류', accessor: 'patentClassification' },
				{ Header: '특허세목', accessor: 'patentItem' },
				{ Header: '출원번호', accessor: 'applicationNo' },
				{ Header: '발명자', accessor: 'inventor' },
				{ Header: '권리권자', accessor: 'assignee' },
				{ Header: '관련문서', accessor: 'relatedDocuments' },
			];

		case 'IT 장비 - 시스템':
			return [
				{ Header: '장비유형', accessor: 'equipmentType' },
				{ Header: '랙유닛', accessor: 'rackUnit' },
				{ Header: '전원공급장치', accessor: 'powerSupply' },
				{ Header: '쿨링시스템', accessor: 'coolingSystem' },
				{ Header: '인터페이스 포트', accessor: 'interfacePorts' },
				{ Header: '폼팩터', accessor: 'formFactor' },
				{ Header: '확장슬롯수', accessor: 'expansionSlots' },
				{ Header: '그래픽카드', accessor: 'graphicsCard' },
				{ Header: '포트 구성', accessor: 'portConfiguration' },
				{ Header: '모니터 포함여부', accessor: 'monitorIncluded' },
			];

		case 'IT 장비 – 네트워크':
			return [
				{ Header: '장비유형', accessor: 'equipmentType' },
				{ Header: '포트수', accessor: 'numberOfPorts' },
				{ Header: '지원프로토콜', accessor: 'supportedProtocols' },
				{ Header: '펌웨어 버전', accessor: 'firmwareVersion' },
				{ Header: '네트워크 속도', accessor: 'networkSpeed' },
				{ Header: '서비스범위', accessor: 'serviceScope' },
			];

		case '단말기':
			return [
				{ Header: 'IP', accessor: 'ip' },
				{ Header: '제품 시리얼 번호', accessor: 'productSerialNumber' },
				{ Header: 'OS', accessor: 'os' },
				{ Header: '보안관제', accessor: 'securityControl' },
				{ Header: '내부정보 유출 방지', accessor: 'kaitsKeeper' },
				{ Header: '악성코드,랜섬웨어 탐지', accessor: 'V3OfficeSecurity' },
				{ Header: '안티랜섬웨어', accessor: 'appCheckPro' },
				{ Header: 'NAC agent', accessor: 'tgate' },
			];

		case '가구':
			return [{ Header: '크기', accessor: 'furnitureSize' }];

		case '기기':
			return [
				{ Header: '기기유형', accessor: 'deviceType' },
				{ Header: '모델번호', accessor: 'modelNumber' },
				{ Header: '연결방식', accessor: 'connectionType' },
				{ Header: '전원사양', accessor: 'powerSpecifications' },
			];

		case '차량':
			return [
				{ Header: '배기량', accessor: 'displacement' },
				{ Header: '차량의 문 수', accessor: 'doorsCount' },
				{ Header: '엔진 형식', accessor: 'engineType' },
				{ Header: '차량 종류', accessor: 'carType' },
				{ Header: '차량 식별번호', accessor: 'identificationNo' },
				{ Header: '차량 색상', accessor: 'carColor' },
				{ Header: '연식', accessor: 'modelYear' },
			];

		case '기타':
			return [
				{ Header: '기타 세부 설명', accessor: 'otherDescription' },
				{ Header: '사용 빈도', accessor: 'usageFrequency' },
			];

		default:
			return [];
	}
};

// 중요성 점수를 계산
export const calculateImportanceScore = (formaccessor) => {
	if (formaccessor) {
		const { confidentiality, integrity, availability } = formaccessor;
		return (confidentiality || 0) + (integrity || 0) + (availability || 0);
	}
	return 0;
};

// 중요성 등급을 계산
export const calculateImportanceRating = (score) => {
	if (score >= 7 && score <= 9) return 'A급';
	if (score >= 5 && score <= 6) return 'B급';
	if (score >= 3 && score <= 4) return 'C급';
	return 'N/A';
};
const RowDetailColumn = {
	getClassificationColumns,
	calculateImportanceScore,
	calculateImportanceRating,
};
export default RowDetailColumn;

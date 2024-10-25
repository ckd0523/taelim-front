import classNames from 'classnames';

/* status column render */
// 중요성 점수 및 등급 계산 함수
const calculateImportance = (row) => {
	const confidentiality = row.confidentiality || 0; // 기본값 설정
	const integrity = row.integrity || 0; // 기본값 설정
	const availability = row.availability || 0; // 기본값 설정

	const score = confidentiality + integrity + availability;

	let grade = '';
	if (score >= 1 && score <= 3) {
		grade = 'C';
	} else if (score >= 4 && score <= 6) {
		grade = 'B';
	} else if (score >= 7 && score <= 9) {
		grade = 'A';
	}

	return { score, grade };
};
// get all columns
const columns = () => [
	{
		Header: '기초 자산',
		accessor: 'assetBasis', // 기초 자산
	},
	{
		Header: '자산 분류',
		accessor: 'assetClassification', // 자산 분류
	},
	{
		Header: '자산 이름',
		accessor: 'assetName', // 자산 이름
	},
	{
		Header: '자산 코드',
		accessor: 'assetCode', // 자산 코드
	},
	{
		Header: '자산 위치',
		accessor: 'assetLocation', // 자산 위치
	},
	{
		Header: '자산 사용자',
		accessor: 'assetUser', // 자산 사용자
	},
	{
		Header: '자산 소유자',
		accessor: 'assetOwner', // 자산 소유자
	},
	{
		Header: '자산 보안 관리자',
		accessor: 'assetSecurityManager', // 자산 보안 관리자
	},

	{
		Header: '부서',
		accessor: 'department', // 부서
	},

	{
		Header: '제조사',
		accessor: 'manufacturingCompany', // 제조 회사
	},

	{
		Header: '목적',
		accessor: 'purpose', // 목적
	},
	{
		Header: '수량',
		accessor: 'quantity', // 수량
	},
];

const columns1 = () => [
	{
		Header: '사용 상태',
		accessor: 'useState', // 사용 상태
	},
	{
		Header: '가동 여부',
		accessor: 'operationStatus', // 운영 상태
	},
	{
		Header: '도입 날짜',
		accessor: 'introducedDate', // 도입 날짜
	},
	{
		Header: '소유 형태',
		accessor: 'ownership', // 소유 형태
	},
	{
		Header: '기밀성',
		accessor: 'confidentiality', // 기밀성
	},
	{
		Header: '무결성',
		accessor: 'integrity', // 무결성
	},
	{
		Header: '가용성',
		accessor: 'availability', // 가용성
	},

	{
		Header: '중요성 점수',
		accessor: (row) => calculateImportance(row).score, // 중요성 점수
		id: 'importanceScore', // 고유 ID 설정
	},
	{
		Header: '중요성 등급',
		accessor: (row) => calculateImportance(row).grade, // 중요성 등급
		id: 'importanceGrade', // 고유 ID 설정
	},
	{
		Header: '비고',
		accessor: 'note', // 비고
	},
];

//재무 관리
const columns2 = () => [
	{
		Header: '구매 비용',
		accessor: 'purchaseCost', // 구매 비용
	},
	{
		Header: '구매 날짜',
		accessor: 'purchaseDate', // 구매 날짜
	},
	{
		Header: '내용 연수',
		accessor: 'usefulLife', // 유효 수명
	},
	{
		Header: '감가상각 방법',
		accessor: 'depreciationMethod', // 감가상각 방법
	},
	{
		Header: '구입처',
		accessor: 'purchaseSource', // 구매 출처
	},
	{
		Header: '구입처 연락처',
		accessor: 'contactInformation', // 연락처
	},
	{
		Header: '취득 경로',
		accessor: 'acquisitionRoute', // 취득 경로
	},
	{
		Header: '유지 기간',
		accessor: 'maintenancePeriod', // 유지 관리 기간
	},
];

export { columns, columns1, columns2 };

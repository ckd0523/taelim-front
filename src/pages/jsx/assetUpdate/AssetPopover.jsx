import React from 'react';
import {
	Popover,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
	Button,
} from '@mui/material';
import { styled } from '@mui/system';

// 스타일 적용된 TableCell
const StyledTableCell = styled(TableCell, {
	shouldForwardProp: (prop) => prop !== 'isHeader',
})(({ theme, isHeader }) => ({
	textAlign: 'center',
	border: '1px solid #ddd',
	...(isHeader && {
		backgroundColor: '#e3f2fd', // 파란색 배경
		fontWeight: 'bold',
	}),
}));

// 스타일 적용된 TableRow
const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(even)': {
		backgroundColor: '#f5f5f5', // 배경색 지정 (선택적)
	},
}));

// 스타일 적용된 TableContainer
const PaddedTableContainer = styled(TableContainer)(({ theme }) => ({
	padding: '0 1cm', // 좌우 여백 1cm
	maxWidth: '100%', // 최대 너비를 화면 너비에 맞추기
	overflowX: 'auto', // 수평 스크롤 활성화
}));

const StyledTable = styled(Table)(({ theme }) => ({
	width: 'calc(100% - 2cm)', // 테이블의 너비를 조정
}));

const getClassificationColumns = (classification) => {
	switch (classification) {
		case 'INFORMATION_PROTECTION_SYSTEM':
			return [{ title: '서비스범위', data: 'serviceScope' }];

		case 'APPLICATION_PROGRAM':
			return [
				{ title: '서비스범위', data: 'serviceScope' },
				{ title: 'OS', data: 'os' },
				{ title: '관련DB', data: 'relatedDB' },
				{ title: 'IP', data: 'ip' },
				{ title: '화면수', data: 'screenNumber' },
			];

		case 'SOFTWARE':
			return [
				{ title: 'IP', data: 'ip' },
				{ title: 'ID', data: 'serverId' },
				{ title: 'PW', data: 'serverPassword' },
				{ title: '담당업체', data: 'companyManager' },
				{ title: 'OS', data: 'os' },
			];

		case 'ELECTRONIC_INFORMATION':
			return [
				{ title: 'OS', data: 'os' },
				{ title: '시스템', data: 'system' },
				{ title: 'DB종류', data: 'dbtype' },
			];

		case 'DOCUMENT':
			return [
				{ title: '문서등급', data: 'documentGrade' },
				{ title: '문서형태', data: 'documentType' },
				{ title: '문서링크', data: 'documentLink' },
			];

		case 'PATENTS_AND_TRADEMARKS':
			return [
				{ title: '출원일자', data: 'applicationDate' },
				{ title: '등록일자', data: 'registrationDate' },
				{ title: '만료일자', data: 'expirationDate' },
				{ title: '특허/상표 상태', data: 'patentTrademarkStatus' },
				{ title: '출원국가', data: 'countryApplication' },
				{ title: '특허분류', data: 'patentClassification' },
				{ title: '특허세목', data: 'patentItem' },
				{ title: '출원번호', data: 'applicationNo' },
				{ title: '발명자', data: 'inventor' },
				{ title: '권리권자', data: 'assignee' },
				{ title: '관련문서', data: 'relatedDocuments' },
			];

		case 'ITSYSTEM_EQUIPMENT':
			return [
				{ title: '장비유형', data: 'equipmentType' },
				{ title: '랙유닛', data: 'rackUnit' },
				{ title: '전원공급장치', data: 'powerSupply' },
				{ title: '쿨링시스템', data: 'coolingSystem' },
				{ title: '인터페이스 포트', data: 'interfacePorts' },
				{ title: '폼팩터', data: 'formFactor' },
				{ title: '확장슬롯수', data: 'expansionSlots' },
				{ title: '그래픽카드', data: 'graphicsCard' },
				{ title: '포트 구성', data: 'portConfiguration' },
				{ title: '모니터 포함여부', data: 'monitorIncluded' },
			];

		case 'ITNETWORK_EQUIPMENT':
			return [
				{ title: '장비유형', data: 'equipmentType' },
				{ title: '포트수', data: 'numberOfPorts' },
				{ title: '지원프로토콜', data: 'supportedProtocols' },
				{ title: '펌웨어 버전', data: 'firmwareVersion' },
				{ title: '네트워크 속도', data: 'networkSpeed' },
				{ title: '서비스범위', data: 'serviceScope' },
			];

		case 'TERMINAL':
			return [
				{ title: 'IP', data: 'ip' },
				{ title: '제품 시리얼 번호', data: 'productSerialNumber' },
				{ title: 'OS', data: 'os' },
				{ title: '보안관제', data: 'securityControl' },
				{ title: '내부정보 유출 방지', data: 'kaitsKeeper' },
				{ title: '악성코드,랜섬웨어 탐지', data: 'V3OfficeSecurity' },
				{ title: '안티랜섬웨어', data: 'appCheckPro' },
				{ title: 'NAC agent', data: 'tgate' },
			];

		case 'FURNITURE':
			return [{ title: '크기', data: 'furnitureSize' }];

		case 'DEVICES':
			return [
				{ title: '기기유형', data: 'deviceType' },
				{ title: '모델번호', data: 'modelNumber' },
				{ title: '연결방식', data: 'connectionType' },
				{ title: '전원사양', data: 'powerSpecifications' },
			];

		case 'CAR':
			return [
				{ title: '배기량', data: 'displacement' },
				{ title: '차량의 문 수', data: 'doorsCount' },
				{ title: '엔진 형식', data: 'engineType' },
				{ title: '차량 종류', data: 'carType' },
				{ title: '차량 식별번호', data: 'identificationNo' },
				{ title: '차량 색상', data: 'carColor' },
				{ title: '연식', data: 'modelYear' },
			];

		case 'OTHERASSETS':
			return [
				{ title: '기타 세부 설명', data: 'otherDescription' },
				{ title: '사용 빈도', data: 'usageFrequency' },
			];

		default:
			return [];
	}
};

const AssetPopover = ({
	open,
	anchorEl,
	onClose,
	selectedRowData,
	handleEditRequest,
	handleMaintenanceRegistration,
}) => {
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
		if (score >= 7 && score <= 9) return 'A급';
		if (score >= 5 && score <= 6) return 'B급';
		if (score >= 3 && score <= 4) return 'C급';
		return 'N/A';
	};

	const importanceScore = calculateImportanceScore();
	const importanceRating = calculateImportanceRating(importanceScore);
	const classification = selectedRowData?.assetClassification;
	const columns = getClassificationColumns(classification);

	return (
		<Popover
			id="simple-popover"
			open={open}
			anchorEl={anchorEl}
			onClose={onClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			PaperProps={{
				style: {
					maxWidth: 'calc(100vw - 40px)',
					overflow: 'hidden',
				},
			}}
		>
			<Paper>
				<PaddedTableContainer component={Paper}>
					<Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>
						기본 자산 정보 및 관리정보
					</Typography>
					<StyledTable>
						<TableBody>
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
							<TableRow>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.assetCode : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.assetName : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.assetBasis : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.manufacturingCompany : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.purpose : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.department : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.assetLocation : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.assetUser : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.assetOwner : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.assetSecurityManager : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.useState : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.operationStatus : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.introducedDate : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.confidentiality : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.integrity : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.availability : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>{importanceScore || 'N/A'}</StyledTableCell>
								<StyledTableCell>{importanceRating || 'N/A'}</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.note : 'N/A'}
								</StyledTableCell>
							</TableRow>
						</TableBody>
					</StyledTable>
					<Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>
						재무 및 구매 정보
					</Typography>
					<StyledTable>
						<TableBody>
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
							<TableRow>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.purchaseCost : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.purchaseDate : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.usefulLife : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.depreciationMethod : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.purchaseSource : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.contactInformation : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.acquisitionRoute : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.maintenancePeriod : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.residualValue : 'N/A'}
								</StyledTableCell>
								<StyledTableCell>
									{selectedRowData ? selectedRowData.currentValue : 'N/A'}
								</StyledTableCell>
							</TableRow>
						</TableBody>
					</StyledTable>

					{/* 자산 분류에 따른 세 번째 테이블 추가 */}
					{/* classification에 따른 동적 테이블 생성*/}
					{classification && (
						<>
							<Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>
								{classification} 정보
							</Typography>
							<StyledTable>
								<TableBody>
									<StyledTableRow>
										{columns.map((col) => (
											<StyledTableCell key={col.title} isHeader>
												{col.title}
											</StyledTableCell>
										))}
									</StyledTableRow>
									{/* 데이터가 없으므로 데이터 샘플을 추가하거나 상태에 맞게 데이터를 넣어야 합니다 */}
									<TableRow>
										{columns.map((col) => (
											<StyledTableCell key={col.title}>
												{selectedRowData
													? selectedRowData[col.data]
													: 'N/A'}
											</StyledTableCell>
										))}
									</TableRow>
								</TableBody>
							</StyledTable>
						</>
					)}
				</PaddedTableContainer>

				<Paper sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
					<Button onClick={handleEditRequest} sx={{ mx: 1 }}>
						수정요청
					</Button>
					<Button onClick={handleMaintenanceRegistration} sx={{ mx: 1 }}>
						유비보수 등록
					</Button>
					<Button onClick={onClose} sx={{ mx: 1 }}>
						닫기
					</Button>
				</Paper>
			</Paper>
		</Popover>
	);
};

export default AssetPopover;

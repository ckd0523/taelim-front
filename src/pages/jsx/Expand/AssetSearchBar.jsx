import { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Form, CardBody } from 'react-bootstrap';
import { TextInput, CustomDatePicker, Form as RHForm } from '@/components';
import Select from 'react-select';

const SearchForm = ({ onSearch }) => {
	// 검색값 설정
	const [assetCode, setAssetCode] = useState('');
	const [assetName, setAssetName] = useState('');
	const [assetUser, setAssetUser] = useState('');
	const [selectedAssetLocation, setSelectedAssetLocation] = useState(null); // assetLocation을 선택할 때 사용
	const [selectedDepartment, setSelectedDepartment] = useState(null); // department을 선택 처리
	const [introducedDate, setIntroduceDate] = useState('');
	const [selectedStartDate, setSelectedStartDate] = useState(null); // 이건 아직 안됨
	const [selectedEndDate, setSelectedEndDate] = useState(null); //  이건 아직 안됨

	const assetLocationOptions = [
		{ value: '', label: '전체' }, // 전체 옵션 추가
		{
			value: 'MAIN_B1_DOCUMENT_STORAGE',
			label: '본관 지하 문서고',
		},
		{ value: 'MAIN_1F', label: '본관 1층' },
		{
			value: 'MAIN_1F_RECEPTION_ROOM',
			label: '본관 1층 접견실',
		},
		{ value: 'MAIN_2F', label: '본관 2층' },
		{
			value: 'MAIN_2F_PRESIDENT_OFFICE',
			label: '본관 2층 사장실',
		},
		{
			value: 'MAIN_2F_RESEARCH_OFFICE',
			label: '본관 2층 기술연구소 사무실',
		},
		{
			value: 'MAIN_2F_CONFERENCE_ROOM',
			label: '본관 2층 대회의실',
		},
		{
			value: 'MAIN_2F_CEO_OFFICE',
			label: '본관 2층 대표이사실',
		},
		{
			value: 'MAIN_3F_STORAGE',
			label: '본관 3층 창고',
		},
		{
			value: 'MDCG',
			label: 'MDCG 천장',
		},
		{
			value: 'FACTORY_BUILDING',
			label: '공장동',
		},
	];
	const departmentOptions = [
		{ value: '', label: '전체' }, // 전체 옵션 추가
		{ value: 'MANAGEMENT_PLANNING_OFFICE', label: '경영기획실' },
		{
			value: 'MANAGEMENT_TEAM',
			label: '관리팀',
		},
		{ value: 'SALES_TEAM', label: '영업팀' },
		{ value: 'PURCHASE_TEAM', label: '구매팀' },
		{ value: 'QUALITY_TEAM', label: '품질팀' },
		{ value: 'PRODUCTION_TEAM', label: '생산팀' },
		{
			value: 'TECHNOLOGY_RESEARCH_TEAM',
			label: '기술연구소',
		},
		{
			value: 'NULL',
			label: 'N/A',
		},
	];
	// 폼 값 변경처리
	const handleFormChange = (e) => {
		const { name, value } = e.target;
		switch (name) {
			case 'assetCode':
				setAssetCode(value);
				break;
			case 'assetName':
				setAssetName(value);
				break;
			// case 'department':
			// 	setDepartment(value);
			// 	break;
			case 'assetUser':
				setAssetUser(value);
				break;
			// case 'assetLocation':
			// 	setAssetLocation(value);
			// 	break;
			default:
				break;
		}
	};
	// assetLocation 선택 처리
	const handleAssetLocationChange = (selectedOption) => {
		setSelectedAssetLocation(selectedOption);
	};
	// department 선택 처리
	const handleDepartmentChange = (selectedOption1) => {
		setSelectedDepartment(selectedOption1);
	};

	// 날짜 포맷 함수
	const formatDate = (date) => {
		if (!date) return null;
		const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
		return new Date(date).toLocaleDateString('fr-CA', options).replace(/-/g, '-');
	};

	// 검색 버튼 클릭시 부모로 검색 조건 전달
	const handleSearchClick = () => {
		onSearch({
			assetCode,
			assetName,
			assetUser,
			assetLocationEnum: selectedAssetLocation?.value || '', // 선택된 자산 위치
			departmentEnum: selectedDepartment?.value || '', // 선택된 부서
			startDate: formatDate(selectedStartDate), // 선택한 시작 날짜 포맷
			endDate: formatDate(selectedEndDate), // 선택한 종료 날짜 포맷
		});
	};

	const handleResetClick = () => {
		setAssetCode('');
		setAssetName('');
		setAssetUser('');
		setSelectedAssetLocation(null);
		setSelectedDepartment(null);
		setIntroduceDate('');
		setSelectedStartDate(null);
		setSelectedEndDate(null);
		onSearch({}); // 검색 조건 초기화 전달
	};

	// react-select의 스타일 커스터마이징
	const customSelectStyles = {
		container: (provided) => ({
			...provided,
			width: '100%', // 원하는 너비 설정
		}),
	};
	return (
		<div
		// style={{
		// 	border: '1px solid #000000', // 실선의 색상
		// 	borderRadius: '8px', // 둥근 모서리
		// 	backgroundColor: '#f2f7ff', // 옅은 파란색 배경
		// 	padding: '16px', // 여백 추가
		// 	marginBottom: '20px', // 아래 여백 추가
		// }}
		>
			<Row>
				<Col>
					<Card>
						<CardBody>
							<RHForm onChange={handleFormChange}>
								<Row>
									<Col xxl={2} xl={6} lg={6} sm={6} md={6} xs={6}>
										<Form.Label>자산명</Form.Label>
										<Form.Control
											name="assetName"
											type="text"
											placeholder="자산명을 입력하세요"
											value={assetName}
											onChange={handleFormChange}
										/>
									</Col>
									<Col xxl={2} xl={6} lg={6} sm={6} md={6} xs={6}>
										<Form.Label>자산위치</Form.Label>
										{/* <Form.Control
											name="assetLocation"
											type="text"
											placeholder="자산위치를 입력하세요"
											// value={assetLocationOptions}
											// onChange={handleFormChange}
										/> */}
										<Select
											options={assetLocationOptions}
											onChange={handleAssetLocationChange}
											value={selectedAssetLocation}
											styles={{
												container: (provided) => ({
													...provided,
													width: '100%',
												}),
											}}
											placeholder="위치를 선택하세요" // 여기에 placeholder 추가
										/>
									</Col>
									<Col xxl={2} xl={6} lg={6} sm={6} md={6} xs={6}>
										<Form.Label>사용자</Form.Label>
										<Form.Control
											name="assetUser"
											type="text"
											placeholder="사용자를 입력하세요"
											value={assetUser}
											onChange={handleFormChange}
										/>
									</Col>
									<Col xxl={2} xl={6} lg={6} sm={6} md={6} xs={6}>
										<Form.Label>부서</Form.Label>

										<Select
											options={departmentOptions}
											onChange={handleDepartmentChange}
											value={selectedDepartment}
											styles={{
												container: (provided) => ({
													...provided,
													width: '100%',
												}),
											}}
											placeholder="부서를 선택하세요" // 여기에 placeholder 추가
										/>
									</Col>
									<Col xxl={4} lg={12} sm={12} md={12} xs={12}>
										<Form.Label>취득일자</Form.Label>
										<Row>
											<Col lg={4} sm={4} md={4} xs={4}>
												<CustomDatePicker
													hideAddon={true}
													dateFormat="yyyy-MM-dd"
													value={selectedStartDate}
													onChange={(date) => setSelectedStartDate(date)} // 시작 날짜 상태 업데이트
												/>
											</Col>
											<Col
												lg={1}
												sm={1}
												md={1}
												xs={1}
												className="justify-content-center pt-1 text-center fw-bold"
											>
												~
											</Col>
											<Col lg={4} sm={4} md={4} xs={4}>
												<CustomDatePicker
													hideAddon={true}
													dateFormat="yyyy-MM-dd"
													value={selectedEndDate}
													onChange={(date) => setSelectedEndDate(date)} // 종료 날짜 상태 업데이트
												/>
											</Col>
											<Col className="d-flex align-items-center justify-content-end mt-1">
												<Button
													variant="dark"
													type="button"
													onClick={handleSearchClick}
												>
													<i className="ri-search-line font-22"></i>
												</Button>
												&nbsp; &nbsp;
												<Button
													variant="dark"
													type="button"
													onClick={handleResetClick}
												>
													<i className=" ri-find-replace-line font-22"></i>
												</Button>
											</Col>
										</Row>
									</Col>
								</Row>
							</RHForm>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export { SearchForm };

import { useState } from 'react';
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
		{ value: 'IT_DEPARTMENT', label: 'IT부' },
		{
			value: 'ADMINISTRATIVE_DEPARTMENT',
			label: '관리부',
		},
		{ value: 'SALES_DEPARTMENT', label: '영업부' },
		{ value: 'MARKETING_DEPARTMENT', label: '마케팅부' },
		{ value: 'PRODUCTION_DEPARTMENT', label: '생산부' },
		{ value: 'OPERATIONS_DEPARTMENT', label: '운영부' },
		{
			value: 'HUMAN_RESOURCES_DEPARTMENT',
			label: '인사부',
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

	// 검색 버튼 클릭시 부모로 검색 조건 전달
	const handleSearchClick = () => {
		onSearch({
			assetCode,
			assetName,
			assetUser,
			assetLocationEnum: selectedAssetLocation?.value || '', // 선택된 자산 위치
			departmentEnum: selectedDepartment?.value || '', // 선택된 부서
			introducedDate,
		});
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
									<Col lg={2}>
										<Form.Label>자산명</Form.Label>
										<Form.Control
											name="assetName"
											type="text"
											placeholder="자산명을 입력하세요"
											value={assetName}
											onChange={handleFormChange}
										/>
									</Col>
									<Col lg={2}>
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
											styles={{
												container: (provided) => ({
													...provided,
													width: '100%',
												}),
											}}
											placeholder="자산위치를 선택하세요" // 여기에 placeholder 추가
										/>
									</Col>
									<Col lg={2}>
										<Form.Label>사용자</Form.Label>
										<Form.Control
											name="assetUser"
											type="text"
											placeholder="사용자를 입력하세요"
											value={assetUser}
											onChange={handleFormChange}
										/>
									</Col>
									<Col lg={2}>
										<Form.Label>부서</Form.Label>
										{/* <Form.Control
											name="department"
											type="text"
											placeholder="부서를 입력하세요"
											// value={department}
											// onChange={handleFormChange}
										/> */}
										<Select
											options={departmentOptions}
											onChange={handleDepartmentChange}
											styles={{
												container: (provided) => ({
													...provided,
													width: '100%',
												}),
											}}
											placeholder="부서를 선택하세요" // 여기에 placeholder 추가
										/>
									</Col>
									<Col>
										<Form.Label>취득일자</Form.Label>
										<Row>
											<Col lg={4}>
												<CustomDatePicker
													hideAddon={true}
													dateFormat="yyyy-MM-dd"
													value={introducedDate}
													onChange={(date) => setSelectedStartDate(date)}
												/>
											</Col>
											<Col
												lg={1}
												className="justify-content-center pt-1 text-center fw-bold"
											>
												~
											</Col>
											<Col lg={4}>
												<CustomDatePicker
													hideAddon={true}
													dateFormat="yyyy-MM-dd"
													value={introducedDate}
													onChange={(date) => setSelectedEndDate(date)}
												/>
											</Col>
											<Col>
												<Button
													variant="dark"
													type="button"
													onClick={handleSearchClick}
												>
													검색
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
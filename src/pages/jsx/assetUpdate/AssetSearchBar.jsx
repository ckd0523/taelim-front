import { useState } from 'react';
import { Row, Col, Button, Card, Form } from 'react-bootstrap';
import { TextInput, CustomDatePicker, Form as RHForm } from '@/components';
import Select from 'react-select';

const SearchForm = ({ onSearch }) => {
	// 검색값 설정
	const [assetCode, setAssetCode] = useState('');
	const [assetName, setAssetName] = useState('');
	const [department, setDepartment] = useState('');
	const [assetOwner, setAssetOwner] = useState('');
	const [assetLocation, setAssetLocation] = useState('');
	//const [introducedDate, setIntroduceDate] = useState('');
	const [selectedStartDate, setSelectedStartDate] = useState(null); // 이건 아직 안됨
	const [selectedEndDate, setSelectedEndDate] = useState(null); //  이건 아직 안됨

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
			case 'department':
				setDepartment(value);
				break;
			case 'assetOwner':
				setAssetOwner(value);
				break;
			case 'assetLocation':
				setAssetLocation(value);
				break;
			default:
				break;
		}
	};

	// 검색 버튼 클릭시 부모로 검색 조건 전달
	const handleSearchClick = () => {
		onSearch({
			assetCode,
			assetName,
			department,
			assetOwner,
			assetLocation,
			selectedStartDate,
			selectedEndDate,
		});
	};
	return (
		<div
			style={{
				border: '1px solid #000000', // 실선의 색상
				borderRadius: '8px', // 둥근 모서리
				backgroundColor: '#f2f7ff', // 옅은 파란색 배경
				padding: '16px', // 여백 추가
				marginBottom: '20px', // 아래 여백 추가
			}}
		>
			<RHForm onChange={handleFormChange}>
				<Row className="mb-4">
					{/* 검색 필터 상단 */}
					<Col md={3} className="d-flex align-items-center">
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Form.Label className="me-2 mb-0" style={{ width: '40%' }}>
								자산명
							</Form.Label>
							<Form.Control
								name="assetName"
								type="text"
								placeholder="자산명을 입력하세요..."
								value={assetName}
								onChange={handleFormChange}
							/>
						</div>
					</Col>
					<Col md={3} className="d-flex align-items-center">
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Form.Label className="me-2 mb-0" style={{ width: '40%' }}>
								자산위치
							</Form.Label>
							<Form.Control
								name="assetLocation"
								type="text"
								placeholder="자산위치를 입력하세요..."
								value={assetLocation}
								onChange={handleFormChange}
							/>
						</div>
					</Col>
					<Col md={3} className="d-flex align-items-center">
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Form.Label className="me-2 mb-0" style={{ width: '40%' }}>
								사용자
							</Form.Label>
							<Form.Control
								name="assetOwner"
								type="text"
								placeholder="사용자를 입력하세요..."
								value={assetOwner}
								onChange={handleFormChange}
							/>
						</div>
					</Col>
					<Col md={3} className="d-flex align-items-center">
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Form.Label className="me-2 mb-0" style={{ width: '40%' }}>
								부서
							</Form.Label>
							<Form.Control
								name="department"
								type="text"
								placeholder="부서를 입력하세요..."
								value={department}
								onChange={handleFormChange}
							/>
						</div>
					</Col>
				</Row>
				<Row className="mb-1">
					{/* 검색 필터 하단 */}
					<Col md={4} className="d-flex align-items-center">
						<Form.Label
							htmlFor="acquisitionStartDate"
							className="me-2 mb-0"
							style={{ width: '40%' }}
						>
							취득일자
						</Form.Label>
						<Row>
							<Col>
								<CustomDatePicker
									hideAddon={true}
									dateFormat="yyyy-MM-dd"
									value={selectedStartDate}
									onChange={(date) => setSelectedStartDate(date)}
								/>
							</Col>
							<Col>
								<CustomDatePicker
									hideAddon={true}
									dateFormat="yyyy-MM-dd"
									value={selectedEndDate}
									onChange={(date) => setSelectedEndDate(date)}
								/>
							</Col>
						</Row>
					</Col>
					<Col md={8} className="d-flex justify-content-end">
						<Button variant="primary" type="button" onClick={handleSearchClick}>
							검색
						</Button>
					</Col>
				</Row>
			</RHForm>
		</div>
	);
};

export { SearchForm };

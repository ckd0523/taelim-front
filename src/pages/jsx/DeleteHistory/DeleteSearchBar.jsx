import { useState } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { TextInput, CustomDatePicker, Form as RHForm } from '@/components';
import Select from 'react-select';

const SearchForm = ({ onSearch }) => {
	// 검색을 위한 column 들 설정
	const [assetName, setAssetName] = useState('');
	const [assetCode, setAssetCode] = useState('');
	const [deleteReason, setDeleteReason] = useState('');
	const [deleteBy, setDeleteBy] = useState('');
	const [deleteMethod, setDeleteMethod] = useState('');
	const [deleteLocation, setDeleteLocation] = useState('');
	// 날짜는 아직 못함
	const [selectedStartDate, setSelectedStartDate] = useState(null);
	const [selectedEndDate, setSelectedEndDate] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;

		switch (name) {
			case 'assetCode':
				setAssetCode(value);
				break;
			case 'assetName':
				setAssetName(value);
				break;
			case 'deleteReason':
				setDeleteReason(value);
				break;
			case 'deleteBy':
				setDeleteBy(value);
				break;
			case 'deleteMethod':
				setDeleteMethod(value);
				break;
			case 'deleteLocation':
				setDeleteLocation(value);
				break;
			default:
				break;
		}
	};
	// 검색 버튼 클릭 시 부모로 검색 조건 전달
	const handleSearch = () => {
		onSearch({
			assetCode,
			assetName,
			deleteReason,
			deleteBy,
			deleteMethod,
			deleteLocation,
			selectedStartDate,
			selectedEndDate,
		});
	};

	return (
		<RHForm onChange={handleChange}>
			<Card>
				<Card.Body className="pb-0">
					<Row>
						{/* 하단 (padding-bottom)만 0으로 설정 - pb-0 제거 */}

						<Col lg={3}>
							<label className="form-label">자산명</label> <br />
							<TextInput
								type="text"
								name="assetName"
								containerClass={'mb-3'}
								value={assetName}
								key="text"
								onChange={handleChange}
							/>
						</Col>
						<Col lg={3}>
							<label className="form-label">자산코드</label> <br />
							<TextInput
								type="text"
								name="assetCode"
								containerClass={'mb-3'}
								value={assetCode}
								key="text"
								onChange={handleChange}
							/>
						</Col>
						<Col lg={3}>
							<label className="form-label">폐기사유</label> <br />
							<TextInput
								type="text"
								name="deleteReason"
								containerClass={'mb-3'}
								value={deleteReason}
								key="text"
								onChange={handleChange}
							/>
						</Col>
						<Col lg={3}>
							<label className="form-label">폐기방법</label> <br />
							<TextInput
								type="text"
								name="deleteMethod"
								containerClass={'mb-3'}
								value={deleteMethod}
								key="text"
								onChange={handleChange}
							/>
						</Col>
					</Row>
					<Row>
						<Col lg={4}>
							<div className="text-lg mt-xl-0 mt-2">
								<label className="form-label">폐기일자</label> <br />
								<Row>
									<Col>
										<CustomDatePicker
											hideAddon={true}
											dateFormat="yyyy-MM-dd"
											value={selectedStartDate}
											onChange={(date) => {
												setSelectedStartDate(date);
											}}
										/>
									</Col>
									~
									<Col>
										<CustomDatePicker
											hideAddon={true}
											dateFormat="yyyy-MM-dd"
											value={selectedEndDate}
											onChange={(date) => {
												setSelectedEndDate(date);
											}}
										/>
									</Col>
								</Row>
							</div>
						</Col>

						<Col lg={3}>
							<label className="form-label">폐기위치</label> <br />
							<TextInput
								type="text"
								name="selectedRequester"
								containerClass={'mb-3'}
								value={deleteLocation}
								key="text"
								onChange={handleChange}
							/>
						</Col>
						<Col lg={3}>
							<label className="form-label">폐기자</label> <br />
							<TextInput
								type="text"
								name="DeleteBy"
								containerClass={'mb-3'}
								value={deleteBy}
								key="text"
								onChange={handleChange}
							/>
						</Col>

						<Col lg={2} className="d-flex align-items-center justify-content-end">
							<Button
								variant="primary"
								type="button"
								onClick={() => {
									handleSearch();
								}}
							>
								검색
							</Button>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</RHForm>
	);
};
export { SearchForm };

import { useState } from 'react';
import { Row, Col, Button, Card, CardBody } from 'react-bootstrap';
import { TextInput, CustomDatePicker, Form as RHForm } from '@/components';
import '../MaintainHistory/Searchbar.css';

const SearchForm = ({ onSearch }) => {
	// 검색을 위한 column 들 설정
	const [assetName, setAssetName] = useState('');
	const [assetCode, setAssetCode] = useState('');
	const [deleteReason, setDeleteReason] = useState('');
	const [deleteBy, setDeleteBy] = useState('');
	const [deleteMethod, setDeleteMethod] = useState('');
	const [deleteLocation, setDeleteLocation] = useState('');
	const [showSearchForm, setShowSearchForm] = useState(false);
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
		<>
			<Row>
				<Col>
					<div>
						<h4 className="px-2 header-title">폐기이력</h4>
					</div>
				</Col>
				<Col xs="auto" style={{ paddingRight: '0' }}>
					<Button
						className="d-flex align-items-center"
						style={{
							height: '40px',
							background: '#fff',
							border: '#ffff',
							boxShadow: 'none',
							color: '#000000ce',
						}}
						onClick={() => setShowSearchForm((prev) => !prev)}
					>
						{showSearchForm ? (
							<i className="uil-plus font-24 "></i>
						) : (
							<i className="uil-plus font-24 "></i>
						)}
					</Button>
				</Col>
				<Col xs="auto" style={{ paddingLeft: '0' }}>
					<form>
						<fieldset style={{ display: 'flex', alignItems: 'center' }}>
							<input
								type="search"
								style={{
									width: '200px',
									height: '40px',
									float: 'left',
									border: 'none',
								}}
							/>
							<button
								type="submit"
								style={{
									height: '40px',
									width: '50px',
									float: 'left',
									border: 'none',
								}}
								onClick={() => handleSearch()}
							>
								<i class="ri-search-line font-22"></i>
							</button>
						</fieldset>
					</form>
				</Col>
			</Row>
			{showSearchForm && (
				<Row className="pt-3">
					<Col>
						<Card>
							<CardBody>
								<RHForm onChange={handleChange}>
									<Row>
										{/* 하단 (padding-bottom)만 0으로 설정 - pb-0 제거 */}

										<Col lg={2}>
											<label className="form-label">자산명</label>
											<TextInput
												type="text"
												name="assetName"
												value={assetName}
												key="text"
												onChange={handleChange}
											/>
										</Col>
										<Col lg={2}>
											<label className="form-label">폐기자</label>
											<TextInput
												type="text"
												name="DeleteBy"
												value={deleteBy}
												key="text"
												onChange={handleChange}
											/>
										</Col>
										<Col lg={2}>
											<label className="form-label">폐기사유</label>
											<TextInput
												type="text"
												name="deleteReason"
												value={deleteReason}
												key="text"
												onChange={handleChange}
											/>
										</Col>
										<Col lg={4}>
											<div className="text-lg mt-xl-0 mt-2">
												<label className="form-label">폐기일자</label>
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

										<Col
											lg={2}
											className="pt-3 d-flex align-items-center justify-content-end"
										>
											<Button
												variant="dark"
												type="button"
												onClick={() => {
													handleSearch();
												}}
											>
												검색
											</Button>
										</Col>
									</Row>
								</RHForm>
							</CardBody>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};
export { SearchForm };

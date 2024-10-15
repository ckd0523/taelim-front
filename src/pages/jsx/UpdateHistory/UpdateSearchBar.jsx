import { useState } from 'react';
import { Row, Col, Button, Card, CardBody } from 'react-bootstrap';
import { TextInput, CustomDatePicker, Form as RHForm } from '@/components';
import Select from 'react-select';

const SearchForm = ({ onSearch }) => {
	const [showSearchForm, setShowSearchForm] = useState(false);
	const [assetCode, setAssetCode] = useState('');
	const [assetName, setAssetName] = useState('');
	const [updateReason, setUpdateReason] = useState('');
	const [updateBy, setUpdateBy] = useState('');
	const [selectedStartDate, setSelectedStartDate] = useState(null);
	const [selectedEndDate, setSelectedEndDate] = useState(null);

	// 폼 값 변경 처리
	const handleFormChange = (e) => {
		const { name, value } = e.target;
		switch (name) {
			case 'assetCode':
				setAssetCode(value);
				break;
			case 'assetName':
				setAssetName(value);
				break;
			case 'updateReason':
				setUpdateReason(value);
				break;
			case 'updateBy':
				setUpdateBy(value);
				break;
			default:
				break;
		}
	};

	// 검색 버튼 클릭 시 부모로 검색 조건 전달
	const handleSearchClick = () => {
		onSearch({
			assetCode,
			assetName,
			updateReason,
			updateBy,
			selectedStartDate,
			selectedEndDate,
		});
	};

	return (
		<>
			<Row className="pt-3 align-items-center">
				<Col>
					<h4 className="d-flex justify-content-start">수정이력</h4>
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
							{/* 하단 (padding-bottom)만 0으로 설정 - pb-0 제거 */}
							<Card.Body className="pb-0">
								<RHForm onChange={handleFormChange}>
									<Row className="mb-2">
										<Col lg={2}>
											<label className="form-label">자산코드</label>
											<TextInput
												type="text"
												name="assetCode"
												containerClass={'mb-3'}
												value={assetCode}
												onChange={handleFormChange}
											/>
										</Col>
										<Col lg={2}>
											<label className="form-label">자산명</label>
											<TextInput
												type="text"
												name="assetName"
												containerClass={'mb-3'}
												value={assetName}
												onChange={handleFormChange}
											/>
										</Col>
										<Col lg={2}>
											<label className="form-label">수정사유</label>
											<Select
												name="updateReason"
												options={[
													{ value: '', label: '선택하세요' },
													{ value: '사유 1', label: '사유 1' },
													{ value: '사유 2', label: '사유 2' },
													{ value: '사유 3', label: '사유 3' },
												]}
												value={{
													value: updateReason,
													label: updateReason || '선택하세요',
												}} // 현재 선택된 값 설정
												onChange={(selectedOption) => {
													setUpdateReason(selectedOption.value); // 선택된 값으로 상태 업데이트
												}}
											/>
										</Col>
										<Col lg={2}>
											<label className="form-label">수정요청자</label>
											<TextInput
												type="text"
												name="updateBy"
												value={updateBy}
												onChange={handleFormChange}
											/>
										</Col>

										<Col lg={4}>
											<div className="text-lg mt-xl-0 mt-2">
												<label className="form-label">수정일자</label>{' '}
												<br />
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
											lg={10}
											className="d-flex align-items-center justify-content-end"
										></Col>
										<Col
											lg={2}
											className="d-flex align-items-center justify-content-end"
										>
											<Button
												variant="dark"
												type="button"
												onClick={handleSearchClick}
											>
												검색
											</Button>
										</Col>
									</Row>
								</RHForm>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export { SearchForm };

import { useState } from 'react';
import { Row, Col, Card, CardBody, Button, InputGroup, Form } from 'react-bootstrap';
import Select from 'react-select';
import { CustomDatePicker } from '@/components';
import assetSurveyLocation from './assetSurveyLocation';
import '../MaintainHistory/Searchbar.css';

const SearchBar = ({ setData, originalData }) => {
	//assetSurveyLocation이 등록할 때도 쓰기 때문에 여기서 따로 추가
	const locations = [{ value: '', label: '전체' }, ...assetSurveyLocation];
	const [showSearchForm, setShowSearchForm] = useState(false);
	const [round, setRound] = useState('');
	const [surveyBy, setSurveyBy] = useState('');
	const [location, setLocation] = useState('');
	const [surveyStartDate, setSurveyStartDate] = useState(null);
	const [surveyEndDate, setSurveyEndDate] = useState(null);
	// 전체검색추가
	const [searchKeyword, setSearchKeyword] = useState('');

	//원본 데이터를 필터에 넣고 setData를 해줌
	//원본 데이터는 set이 안되기 때문에 원본에서 계속 필터가 이루어짐
	const setTableData = () => {
		const filteredData = originalData.filter((originalData) => {
			return (
				//includes는 문자열만 가능!!!!!!!!!
				(round === '' || originalData.round == round) &&
				(surveyBy === '' || originalData.assetSurveyBy.includes(surveyBy)) &&
				(location === '' || originalData.assetSurveyLocation === location) &&
				(surveyStartDate === null ||
					new Date(originalData.assetSurveyStartDate) >= surveyStartDate) &&
				(surveyEndDate === null ||
					new Date(originalData.assetSurveyEndDate) <= surveyEndDate)
			);
		});
		console.log('originalTableData' + JSON.stringify(originalData));
		console.log('위치 label : ' + location);
		setData(filteredData);

		//검색 후 검색어 초기화
		setRound('');
		setSurveyBy('');
		setLocation('');
		setSurveyStartDate(null);
		setSurveyEndDate(null);
	};

	//console.log("회차 : " + round);
	// 전체검색 기능 추가
	const handleSearch2 = (e) => {
		e.preventDefault();

		const keyword = (searchKeyword || '').replace(/\s+/g, '').toLowerCase().trim();

		if (!keyword) {
			setData(originalData);
			return;
		}

		const filteredData = originalData.filter((item) => {
			const matchsKeyword = Object.values(item).some(
				(value) =>
					typeof value === 'string' &&
					(value || '').replace(/\s+/g, '').toLowerCase().includes(keyword)
			);
			return matchsKeyword;
		});

		setData(filteredData);
		setSearchKeyword('');
	};
	return (
		<>
			<Row>
				<Col>
					<div>
						<h4 className="d-flex justify-content-start">자산 조사</h4>
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
								placeholder="검색어를 입력하세요."
								style={{
									width: '200px',
									height: '40px',
									float: 'left',
									border: 'none',
								}}
								value={searchKeyword}
								onChange={(e) => setSearchKeyword(e.target.value)}
							/>
							<button
								className="button"
								type="submit"
								style={{
									height: '40px',
									width: '50px',
									float: 'left',
									border: 'none',
								}}
								onClick={handleSearch2}
							>
								<i className="ri-search-line font-22"></i>
							</button>
						</fieldset>
					</form>
				</Col>
			</Row>
			{showSearchForm && (
				<Row className="pt-3">
					<Col>
						<Card>
							<Card.Body>
								<Row>
									<Col lg={2}>
										<label>회차</label>
										<InputGroup>
											<Form.Control
												type="number"
												name="round"
												min="1"
												value={round}
												onChange={(e) => setRound(e.target.value)}
											/>
										</InputGroup>
									</Col>
									<Col lg={2}>
										<label>조사자</label>
										<InputGroup>
											<Form.Control
												type="text"
												name="surveyBy"
												value={surveyBy}
												onChange={(e) => setSurveyBy(e.target.value)}
											/>
										</InputGroup>
									</Col>
									<Col lg={3}>
										<label>위치</label>
										<Select
											placeholder="위치를 선택하세요"
											className="react-select"
											classNamePrefix="react-select"
											options={locations}
											// location이 "전체"인 경우에도 value를 '전체'로 설정하여 placeholder로 가지 않도록 처리
											value={
												location === ''
													? locations[0]
													: locations.find(
															(option) => option.label === location
													  )
											}
											onChange={(selectedOption) => {
												//백에서 location이 한글 즉 label 값으로 넘어오기 때문에 전체일 때의 경우를 한 번 더 생각
												// "전체" 선택 시 location을 빈 문자열로 설정, 그 외에는 label 값을 설정
												setLocation(
													selectedOption && selectedOption.value === ''
														? ''
														: selectedOption.label
												);
											}}
										/>
									</Col>

									<Col>
										<Row className="justify-content-start">
											<label>자산 조사일</label>
											<Col lg={4}>
												<div className="mb-3">
													<CustomDatePicker
														hideAddon={true}
														value={surveyStartDate}
														onChange={(date) => {
															setSurveyStartDate(date);
														}}
														dateFormat="yyyy-MM-dd"
													/>
												</div>
											</Col>
											<Col
												lg={1}
												className="d-flex justify-content-center pt-1 text-center fw-bold"
											>
												~
											</Col>
											<Col lg={4}>
												<div className="mb-3">
													<CustomDatePicker
														hideAddon={true}
														value={surveyEndDate}
														onChange={(date) => {
															setSurveyEndDate(date);
														}}
														dateFormat="yyyy-MM-dd"
													/>
												</div>
											</Col>
											<Col lg={3}>
												<Button variant="dark" onClick={setTableData}>
													검색
												</Button>
											</Col>
										</Row>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default SearchBar;

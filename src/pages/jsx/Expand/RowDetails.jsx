import React, { useState, useEffect } from 'react';
import { Table as BootstrapTable, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

const RowDetails = ({
	row,
	selectedRowData,
	importanceScore,
	importanceRating,
	dynamicColumns,
	AssetCode,
	onClose,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({});
	const [showModal, setShowModal] = useState(false); // 모달 열기/닫기 상태
	const [isLoading, setIsLoading] = useState(true); // 로딩 상태

	useEffect(() => {
		const fetchRowData = async () => {
			if (!AssetCode) return;

			setIsLoading(true); // 데이터 요청 시작
			try {
				console.log(`Fetching data for assetCode: ${AssetCode}`);
				const response = await axios.get(`http://133.186.153.78:8080/asset/${AssetCode}`);
				console.log('Fetched data:', response.data);
				setFormData(response.data);
			} catch (error) {
				console.error('Error fetching asset data:', error);
			} finally {
				setIsLoading(false); // 데이터 요청 완료
			}
		};

		fetchRowData(); // useEffect에서 fetchRowData 호출
	}, [AssetCode]); // AssetCode가 변경될 때마다 호출

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleNextClick = () => {
		setShowModal(true);
	};

	const handleInputChange = (e, key) => {
		setFormData({ ...formData, [key]: e.target.value });
	};

	const handleModalClose = () => setShowModal(false);

	const handleSubmit = () => {
		// 수정 요청 처리 로직
		setShowModal(false);
	};

	const renderCellContent = (key) => {
		if (isEditing) {
			return (
				<Form.Control
					type="text"
					value={formData[key] || ''}
					onChange={(e) => handleInputChange(e, key)}
				/>
			);
		}
		return formData[key] || 'N/A';
	};

	if (isLoading) {
		return <p>데이터를 불러오는 중입니다...</p>;
	}

	return (
		<>
			{/* 기본 자산 정보 및 관리 정보 테이블 */}
			<h4>기본 자산 정보 및 관리 정보</h4>
			<BootstrapTable striped bordered hover className="table-detail">
				<thead>
					<tr>
						<th>자산코드</th>
						<th>자산명</th>
						<th>자산기준</th>
						<th>제조사</th>
						<th>목적</th>
						<th>부서</th>
						<th>위치</th>
						<th>사용자</th>
						<th>소유자</th>
						<th>보안담당자</th>
						<th>사용상태</th>
						<th>가동여부</th>
						<th>도입일자</th>
						<th>기밀성</th>
						<th>무결성</th>
						<th>가용성</th>
						<th>중요성점수</th>
						<th>중요성등급</th>
						<th>비고</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{renderCellContent('assetCode')}</td>
						<td>{renderCellContent('assetName')}</td>
						<td>{renderCellContent('assetBasis')}</td>
						<td>{renderCellContent('manufacturingCompany')}</td>
						<td>{renderCellContent('purpose')}</td>
						<td>{renderCellContent('department')}</td>
						<td>{renderCellContent('assetLocation')}</td>
						<td>{renderCellContent('assetUser')}</td>
						<td>{renderCellContent('assetOwner')}</td>
						<td>{renderCellContent('assetSecurityManager')}</td>
						<td>{renderCellContent('useState')}</td>
						<td>{renderCellContent('operationStatus')}</td>
						<td>{renderCellContent('introducedDate')}</td>
						<td>{renderCellContent('confidentiality')}</td>
						<td>{renderCellContent('integrity')}</td>
						<td>{renderCellContent('availability')}</td>
						<td>{renderCellContent('importanceScore')}</td>
						<td>{renderCellContent('importanceRating')}</td>
						<td>{renderCellContent('note')}</td>
					</tr>
				</tbody>
			</BootstrapTable>

			{/* 재무 및 구매 정보 테이블 */}
			<h4>재무 및 구매 정보</h4>
			<BootstrapTable striped bordered hover className="table-detail">
				<thead>
					<tr>
						<th>구매비용</th>
						<th>구매날짜</th>
						<th>내용연수</th>
						<th>감가상각방법</th>
						<th>구입처</th>
						<th>구입처 연락처</th>
						<th>취득경로</th>
						<th>유지기간</th>
						<th>잔존가치</th>
						<th>현재가치</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{renderCellContent('purchaseCost')}</td>
						<td>{renderCellContent('purchaseDate')}</td>
						<td>{renderCellContent('usefulLife')}</td>
						<td>{renderCellContent('depreciationMethod')}</td>
						<td>{renderCellContent('purchaseSource')}</td>
						<td>{renderCellContent('contactInformation')}</td>
						<td>{renderCellContent('acquisitionRoute')}</td>
						<td>{renderCellContent('maintenancePeriod')}</td>
						<td>{renderCellContent('residualValue')}</td>
						<td>{renderCellContent('currentValue')}</td>
					</tr>
				</tbody>
			</BootstrapTable>

			{/* classification에 따른 동적 열 테이블 */}
			{dynamicColumns.length > 0 ? (
				<>
					<h4>classification에 따른 칼럼</h4>
					<BootstrapTable striped bordered hover className="table-detail">
						<thead>
							<tr>
								{dynamicColumns.map((col) => (
									<th key={col.title}>{col.title}</th>
								))}
							</tr>
						</thead>
						<tbody>
							<tr>
								{dynamicColumns.map((col) => (
									<td key={col.title}>
										{isEditing ? (
											<Form.Control
												type="text"
												value={formData[col.data] || ''}
												onChange={(e) => handleInputChange(e, col.data)}
											/>
										) : (
											formData[col.data] || 'N/A'
										)}
									</td>
								))}
							</tr>
						</tbody>
					</BootstrapTable>

					{/* 버튼 */}
					<Row className="mt-3">
						<Col className="text-end">
							{isEditing ? (
								<>
									<Button
										variant="primary"
										className="me-2"
										onClick={handleNextClick}
									>
										다음
									</Button>
								</>
							) : (
								<>
									<Button
										variant="primary"
										className="me-2"
										onClick={handleEditClick}
									>
										수정
									</Button>
									<Button variant="secondary" className="me-2">
										유지보수등록
									</Button>
								</>
							)}
							<Button variant="danger" onClick={onClose}>
								닫기
							</Button>
						</Col>
					</Row>

					{/* 모달 */}
					<Modal show={showModal} onHide={handleModalClose}>
						<Modal.Header closeButton>
							<Modal.Title>수정 요청</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form>
								<Form.Group className="mb-3">
									<Form.Label>구분</Form.Label>
									<Form.Control type="text" value="수정" readOnly />
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label>수정사유</Form.Label>
									<Form.Select>
										<option>사유 1</option>
										<option>사유 2</option>
										<option>사유 3</option>
									</Form.Select>
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label>수정내용</Form.Label>
									<Form.Control as="textarea" rows={3} />
								</Form.Group>
							</Form>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleModalClose}>
								취소
							</Button>
							<Button variant="primary" onClick={handleSubmit}>
								수정 요청
							</Button>
							<Button variant="primary" onClick={handleSubmit}>
								수정
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			) : (
				<p>데이터를 불러오는 중입니다...</p>
			)}
		</>
	);
};

export default RowDetails;

import React from 'react';
import { Table as BootstrapTable, Row, Col, Button } from 'react-bootstrap';
import './style.css';

const RowDetails = ({
	row,
	selectedRowData,
	importanceScore,
	importanceRating,
	dynamicColumns,
}) => {
	if (!row.isExpanded || !selectedRowData) return null;

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
						<td>{selectedRowData.assetCode || 'N/A'}</td>
						<td>{selectedRowData.assetName || 'N/A'}</td>
						<td>{selectedRowData.assetBasis || 'N/A'}</td>
						<td>{selectedRowData.manufacturingCompany || 'N/A'}</td>
						<td>{selectedRowData.purpose || 'N/A'}</td>
						<td>{selectedRowData.department || 'N/A'}</td>
						<td>{selectedRowData.assetLocation || 'N/A'}</td>
						<td>{selectedRowData.assetUser || 'N/A'}</td>
						<td>{selectedRowData.assetOwner || 'N/A'}</td>
						<td>{selectedRowData.assetSecurityManager || 'N/A'}</td>
						<td>{selectedRowData.useState || 'N/A'}</td>
						<td>{selectedRowData.operationStatus || 'N/A'}</td>
						<td>{selectedRowData.introducedDate || 'N/A'}</td>
						<td>{selectedRowData.confidentiality || 'N/A'}</td>
						<td>{selectedRowData.integrity || 'N/A'}</td>
						<td>{selectedRowData.availability || 'N/A'}</td>
						<td>{importanceScore || 'N/A'}</td>
						<td>{importanceRating || 'N/A'}</td>
						<td>{selectedRowData.note || 'N/A'}</td>
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
						<td>{selectedRowData.purchaseCost || 'N/A'}</td>
						<td>{selectedRowData.purchaseDate || 'N/A'}</td>
						<td>{selectedRowData.usefulLife || 'N/A'}</td>
						<td>{selectedRowData.depreciationMethod || 'N/A'}</td>
						<td>{selectedRowData.purchaseSource || 'N/A'}</td>
						<td>{selectedRowData.contactInformation || 'N/A'}</td>
						<td>{selectedRowData.acquisitionRoute || 'N/A'}</td>
						<td>{selectedRowData.maintenancePeriod || 'N/A'}</td>
						<td>{selectedRowData.residualValue || 'N/A'}</td>
						<td>{selectedRowData.currentValue || 'N/A'}</td>
					</tr>
				</tbody>
			</BootstrapTable>

			{/* classification에 따른 동적 열 테이블 */}
			{selectedRowData && dynamicColumns.length > 0 ? (
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
									<td key={col.title}>{selectedRowData[col.data] || 'N/A'}</td>
								))}
							</tr>
						</tbody>
					</BootstrapTable>

					{/* 버튼 */}
					<Row className="mt-3">
						<Col className="text-end">
							<Button variant="primary" className="me-2">
								수정
							</Button>
							<Button variant="secondary" className="me-2">
								유지보수등록
							</Button>
							<Button variant="danger">닫기</Button>
						</Col>
					</Row>
				</>
			) : (
				<p>데이터를 불러오는 중입니다...</p>
			)}
		</>
	);
};

export default RowDetails;

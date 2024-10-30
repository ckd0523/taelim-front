import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';

const HistoryTableUpdate = ({ updateHistory }) => {
	return (
		<div style={{ padding: '20px', border: '1px solid #ccc' }}>
			<BootstrapTable striped bordered hover className="table-detail">
				<thead style={{ textAlign: 'center' }}>
					<tr>
						<th>번호</th>
						<th>자산코드</th>
						<th>자산명</th>
						<th>수정일자</th>
						<th>수정요청자</th>
						<th>수정사유</th>
						<th>수정내용</th>
					</tr>
				</thead>
				<tbody style={{ textAlign: 'center' }}>
					{updateHistory.length > 0 ? (
						updateHistory.map((update, index) => (
							<tr key={index}>
								<td>{update.updateNo || index + 1}</td>
								<td>{update.assetCode}</td>
								<td>{update.assetName}</td>
								<td>{update.updateDate}</td>
								<td>{update.updateBy || '정보 없음'}</td>
								<td>{update.updateReason || '정보 없음'}</td>
								<td>{update.updateDetail || '정보 없음'}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="7" style={{ textAlign: 'center' }}>
								저장된 수정이력이 없습니다.
							</td>
						</tr>
					)}
				</tbody>
			</BootstrapTable>
		</div>
	);
};

export { HistoryTableUpdate };

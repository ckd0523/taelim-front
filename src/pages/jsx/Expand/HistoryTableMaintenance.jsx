import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';

const HistoryTableMaintenance = ({ repairHistory }) => {
	return (
		<div style={{ padding: '20px', border: '1px solid #ccc' }}>
			<BootstrapTable striped bordered hover className="table-detail">
				<thead>
					<tr>
						<th>번호</th>
						<th>자산코드</th>
						<th>자산명</th>
						<th>수정요청자</th>
						<th>수정시작일자</th>
						<th>수정완료일자</th>
						<th>수정사유</th>
						<th>보수상태</th>
					</tr>
				</thead>
				<tbody>
					{/* 유지보수 이력 데이터를 맵핑하여 출력 */}
					{repairHistory.length > 0 ? (
						repairHistory.map((repair, index) => (
							<tr key={index}>
								<td>{repair.repairNo || index + 1}</td>
								<td>{repair.assetCode}</td>
								<td>{repair.assetName}</td>
								<td>{repair.repairBy}</td>
								<td>{repair.repairStartDate}</td>
								<td>{repair.repairEnDate}</td>
								<td>{repair.repairResult}</td>
								<td>{repair.status}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="7" style={{ textAlign: 'center' }}>
								등록된 유지보수이력이 없습니다.
							</td>
						</tr>
					)}
				</tbody>
			</BootstrapTable>
		</div>
	);
};

export { HistoryTableMaintenance };

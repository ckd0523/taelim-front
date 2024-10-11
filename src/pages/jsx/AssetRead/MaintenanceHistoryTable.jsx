import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';

const MaintenanceHistoryTable = ({ repairHistory }) => {
	return (
		<div style={{ padding: '20px', border: '2px solid #000' }}>
			<BootstrapTable striped bordered hover className="table-detail">
				<thead>
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
				<tbody>
					{/* 유지보수 이력 데이터를 맵핑하여 출력 */}
					{repairHistory.map((repair, index) => (
						<tr key={index}>
							<td>{repair.repairNo || index + 1}</td>
							<td>{repair.assetCode}</td>
							<td>{repair.repairBy}</td>
							<td>{repair.repairResult}</td>
							<td>{repair.repairStartDate}</td>
							<td>{repair.repairEnDate}</td>
							<td>{repair.status}</td>
						</tr>
					))}
				</tbody>
			</BootstrapTable>
		</div>
	);
};

export { MaintenanceHistoryTable };

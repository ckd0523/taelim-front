import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';

const HistoryTableMaintenance = ({ repairHistory }) => {
	// 보수 상태 계산 함수
	const getRepairStatus = (repair) => {
		const { repairStartDate, repairEnDate, repairResult, repairFileDtos } = repair;

		// 보수전, 보수후 파일이 있는지 체크
		const hasBeforeAndAfterFiles =
			repairFileDtos?.some((file) => file.repairType === '보수전') &&
			repairFileDtos?.some((file) => file.repairType === '보수후');

		// 모든 조건을 만족하면 "완료", 그렇지 않으면 "진행중"
		if (repairStartDate && repairEnDate && repairResult && hasBeforeAndAfterFiles) {
			return '완료';
		}
		return '진행중';
	};

	return (
		<div style={{ padding: '20px', border: '1px solid #ccc' }}>
			<BootstrapTable striped bordered hover className="table-detail">
				<thead style={{ textAlign: 'center' }}>
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
				<tbody style={{ textAlign: 'center' }}>
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
								<td>{getRepairStatus(repair) || '알 수 없음'}</td>
								{/* 보수 상태 표시 */}
							</tr>
						))
					) : (
						<tr>
							<td colSpan="8" style={{ textAlign: 'center' }}>
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

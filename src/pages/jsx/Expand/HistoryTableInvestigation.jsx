import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';

const HistoryTableInvestigation = ({ surveyHistory }) => {
	return (
		<div style={{ padding: '20px', border: '1px solid #ccc' }}>
			<BootstrapTable striped bordered hover className="table-detail">
				<thead style={{ textAlign: 'center' }}>
					<tr>
						<th>번호</th>
						<th>자산코드</th>
						<th>자산명</th>
						<th>회차</th>
						<th>자산위치</th>
						<th>자산조사자</th>
						<th>정위치유무</th>
						<th>상태</th>
						<th>내용</th>
					</tr>
				</thead>
				<tbody style={{ textAlign: 'center' }}>
					{/* 조사 이력 데이터를 맵핑하여 출력 */}
					{surveyHistory.length > 0 ? (
						surveyHistory.map((survey, index) => (
							<tr key={index}>
								<td>{survey.assetSurveyDetailNo}</td>
								<td>{survey.assetCode}</td>
								<td>{survey.assetName}</td>
								<td>{survey.round}</td>
								<td>{survey.assetSurveyLocation}</td>
								<td>{survey.assetSurveyBy}</td>
								{/* exactLocation 값이 true면 "정위치 유", false면 "정위치 무" */}
								<td>{survey.exactLocation ? '위치' : ''}</td>
								{/* assetStatus 값이 fales면 "정상", true면 "파손" */}
								<td>{survey.assetStatus ? '파손' : '정상'}</td>
								<td>{survey.assetSurveyContent}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="10" style={{ textAlign: 'center' }}>
								등록된 자산조사 이력이 없습니다.
							</td>
						</tr>
					)}
				</tbody>
			</BootstrapTable>
		</div>
	);
};

export { HistoryTableInvestigation };
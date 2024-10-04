import { Row, Col, Tab, Tabs, Nav, Table as BootstrapTable } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

const Tabs1 = ({ updateList, repairList, surveyList }) => {
	console.log('잘들어오나', updateList);
	return (
		<>
			<div style={{ marginTop: '20px' }}>
				<Tabs defaultActiveKey="updateHistory" id="uncontrolled-tab-example">
					<Tab eventKey="updateHistory" title="수정이력">
						<div style={{ padding: '20px', border: '2px solid #000' }}>
							<BootstrapTable striped bordered hover className="table-detail">
								<thead>
									<tr>
										<th>번호</th>
										<th>자산코드</th>
										<th>수정일자</th>
										<th>수정요청자</th>
										<th>수정사유</th>
										<th>수정내용</th>
									</tr>
								</thead>
								<tbody>
									{updateList.map((update, index) => (
										<tr key={index}>
											<td>{update.assetNo || index + 1}</td>
											<td>{update.assetCode}</td>
											<td>{update.demandDate}</td>
											<td>{update.demandBy || '정보 없음'}</td>
											<td>{update.updateReason || '정보 없음'}</td>
											<td>{update.updateDetail || '정보 없음'}</td>
										</tr>
									))}
								</tbody>
							</BootstrapTable>
						</div>
					</Tab>

					<Tab eventKey="maintenanceHistory" title="유지보수이력">
						{/* 유지보수이력 테이블 */}
						<div style={{ padding: '20px', border: '2px solid #000' }}>
							<BootstrapTable striped bordered hover className="table-detail">
								<thead>
									<tr>
										<th>번호</th>
										<th>자산코드</th>
										<th>유지보수자</th>
										<th>유지보수내용</th>
										<th>시작일자</th>
										<th>종료일자</th>
										<th>완료/진행중</th>
									</tr>
								</thead>
								<tbody>
									{/* 유지보수 이력 데이터를 맵핑하여 출력 */}
									{repairList.map((repair, index) => (
										<tr key={index}>
											<td>{repair.repairNo || index + 1}</td>
											<td>{repair.assetCode}</td>
											<td>{repair.repairBy}</td>
											<td>{repair.repairResult}</td>
											<td>{repair.repairStartDate}</td>
											<td>{repair.repairEndDate}</td>
											<td>{repair.repairStatus}</td>
										</tr>
									))}
								</tbody>
							</BootstrapTable>
						</div>
					</Tab>

					<Tab eventKey="investigationHistory" title="자산조사이력">
						{/* 자산조사이력 테이블 */}
						<div style={{ padding: '20px', border: '2px solid #000' }}>
							<BootstrapTable striped bordered hover className="table-detail">
								<thead>
									<tr>
										<th>번호</th>
										<th>자산코드</th>
										<th>자산명</th>
										<th>회차</th>
										<th>자산위치</th>
										<th>자산소유자</th>
										<th>자산담당자</th>
										<th>정위치유무</th>
										<th>상태</th>
										<th>내용</th>
									</tr>
								</thead>
								<tbody>
									{/* 조사 이력 데이터를 맵핑하여 출력 */}
									{surveyList.map((survey, index) => (
										<tr key={index}>
											<td>{survey.assetSurveyDetailNo}</td>
											<td>{survey.assetCode}</td>
											<td>{survey.assetName}</td>
											<td>{survey.round}</td>
											<td>{survey.assetSurveyLocation}</td>
											<td>{survey.assetSurveyBy}</td>
											<td>{survey.assetSurveyBy}</td>
											{/* exactLocation 값이 true면 "정위치 유", false면 "정위치 무" */}
											<td>
												{survey.exactLocation ? '정위치 유' : '정위치 무'}
											</td>
											{/* assetStatus 값이 true면 "정상", false면 "파손" */}
											<td>{survey.assetStatus ? '정상' : '파손'}</td>
											<td>{survey.assetSurveyContent}</td>
										</tr>
									))}
								</tbody>
							</BootstrapTable>
						</div>
					</Tab>
				</Tabs>
			</div>
		</>
	);
};

export default Tabs1;

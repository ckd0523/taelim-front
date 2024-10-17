import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import TotalAssetValue from './TotalAssetValue';
import RealTimeStatus from './RealTimeStatus';

const Dashboard = () => {
	return (
		<>
			<Row>
				<Col lg={6}>
					<TotalAssetValue />
				</Col>
				<Col lg={6}>
					<RealTimeStatus />
				</Col>
			</Row>
			<Row>
				<Col lg={4}>
					<p>자산유형</p>
				</Col>
				<Col lg={4}>
					<p>위치 현황</p>
				</Col>
				<Col lg={4}>
					<p>부서별 현황</p>
				</Col>
			</Row>
			<Row>
				<Col lg={6}>
					<Row>
						<p>중요알림 및 경고</p>
					</Row>
					<Row>
						<p>자산 가치 변화 분석</p>
					</Row>
				</Col>
				<Col lg={6}>
					<p>실시간 위치 추적 및 상태 모니터링</p>
				</Col>
			</Row>
		</>
	);
};
export { Dashboard };

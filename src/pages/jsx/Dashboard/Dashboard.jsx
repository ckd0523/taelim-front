import { useState } from 'react';
import { Row, Col, Table, Card } from 'react-bootstrap';

import TotalAssetValue from './TotalAssetValue';
import RealTimeStatus from './RealTimeStatus';
import ReactApexChart from 'react-apexcharts';
const DistributedColumnOps = {
	chart: {
		height: 380,
		type: 'bar',
		toolbar: {
			show: false,
		},
		events: {
			click: function (chart, w, e) {
				console.log(chart, w, e);
			},
		},
	},
	colors: [
		'#4E79A7', // 책상 (차분한 블루)
		'#F28E2B', // 의자 (따뜻한 오렌지)
		'#76B7B2', // 노트북 (시원한 청록)
		'#E15759', // 컴퓨터 (부드러운 레드)
		'#59A14F', // 복합기 (프레시 그린)
		'#acaba6', // 기타 (밝은 옐로우)
	],
	plotOptions: {
		bar: {
			columnWidth: '45%',
			distributed: true,
		},
	},
	dataLabels: {
		enabled: false,
	},
	series: [
		{
			data: [21, 22, 10, 28, 16, 30],
		},
	],
	xaxis: {
		categories: ['책상', '의자', '노트북', '컴퓨터', '복합기', '기타'],
		labels: {
			style: {
				colors: [
					'#4E79A7', // 책상 (차분한 블루)
					'#F28E2B', // 의자 (따뜻한 오렌지)
					'#76B7B2', // 노트북 (시원한 청록)
					'#E15759', // 컴퓨터 (부드러운 레드)
					'#59A14F', // 복합기 (프레시 그린)
					'#acaba6', // 기타 (밝은 옐로우),
				],
				fontSize: '14px',
			},
		},
	},
	yaxis: {
		title: {
			text: '개수',
		},
	},
	legend: {
		offsetY: 7,
	},
	grid: {
		row: {
			colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
			opacity: 0.2,
		},
		borderColor: '#f1f3fa',
	},
};
const ColumnWithRotatedlabelsOps = {
	annotations: {
		points: [
			{
				x: 'Bananas',
				seriesIndex: 0,
				label: {
					borderColor: '#3e60d5',
					offsetY: 0,
					style: {
						color: '#fff',
						background: '#3e60d5',
					},
					text: 'Bananas are good',
				},
			},
		],
	},
	chart: {
		height: 380,
		type: 'bar',
		stacked: 'true',
		toolbar: {
			show: false,
		},
	},
	plotOptions: {
		bar: {
			columnWidth: '50%',
			// endingShape: 'rounded'
		},
	},

	dataLabels: {
		enabled: false,
	},
	stroke: {
		width: 2,
	},
	colors: [
		'#4E79A7', // 책상 (차분한 블루)
		'#F28E2B', // 의자 (따뜻한 오렌지)
		'#76B7B2', // 노트북 (시원한 청록)
		'#E15759', // 컴퓨터 (부드러운 레드)
		'#59A14F', // 복합기 (프레시 그린)
		'#acaba6', // 기타 (밝은 옐로우),
	],
	series: [
		{
			name: '책상',
			data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87],
		},
		{
			name: '의자',
			data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87],
		},
		{
			name: '노트북',
			data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87],
		},
		{
			name: '컴퓨터',
			data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87],
		},
		{
			name: '복합기',
			data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87],
		},
		{
			name: '기타',
			data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87],
		},
	],
	grid: {
		borderColor: '#f1f3fa',
		padding: {
			top: 0,
			right: -2,
			bottom: -35,
			left: 10,
		},
	},
	xaxis: {
		labels: {
			rotate: -45,
		},
		categories: [
			'본관 지하 문서고',
			'본관 1층',
			'본관 1층 접견실',
			'본관 2층',
			'본관 2층 사장실',
			'본관 2층 기술연구소 사무실',
			'본관 2층 대회의실',
			'본관 2층 대표이사실',
			'본관 3층 창고',
			'MDCG 천장',
			'공장동',
		],
	},
	yaxis: {
		title: {
			text: '개수',
		},
	},
	fill: {
		type: 'gradient',
		gradient: {
			shade: 'light',
			type: 'horizontal',
			shadeIntensity: 0.25,
			gradientToColors: undefined,
			inverseColors: true,
			opacityFrom: 0.85,
			opacityTo: 0.85,
			stops: [50, 0, 100],
		},
	},
};
const Dashboard = () => {
	return (
		<>
			<Row className="p-3">
				<Col lg={4}>
					<TotalAssetValue />
				</Col>
				<Col lg={6}>
					<RealTimeStatus />
				</Col>
			</Row>
			<Row className="p-3">
				<Col lg={4}>
					<Card>
						<Card.Body>
							<h4 className="header-title">자산현황</h4>
							<div dir="ltr">
								<ReactApexChart
									className="apex-charts"
									options={DistributedColumnOps}
									height={380}
									series={DistributedColumnOps.series}
									type="bar"
								/>
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col lg={4}>
					<Card>
						<Card.Body>
							<h4 className="header-title">위치현황</h4>
							<div dir="ltr">
								<ReactApexChart
									className="apex-charts"
									options={ColumnWithRotatedlabelsOps}
									height={380}
									series={ColumnWithRotatedlabelsOps.series}
									type="bar"
								/>
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col lg={4}>
					<p>부서별 현황</p>
				</Col>
			</Row>
			<Row className="p-3">
				<Col lg={6}>
					<Row>
						<h4 className="header-title">중요알림 및 경고</h4>
						<Table className="border-black">
							<thead className="table-dark">
								<tr>
									<th>유지보수</th>
									<th>계약만료</th>
									<th>이상지출</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>3건</td>
									<td>1건</td>
									<td>-</td>
								</tr>
							</tbody>
						</Table>
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

import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import './TotalAssetValue.css'; // 추가: CSS 파일로 스타일을 분리합니다.

const TotalAssetRatio = () => {
	const totalAssetValueOpts = {
		chart: {
			type: 'donut',
			height: '100%', // 차트 높이를 100%로 설정
			width: '100%',  // 차트 너비를 100%로 설정
			responsive: [
				{
					breakpoint: 1024,
					options: {
						chart: {
							height: '80%', // 태블릿 이하에서는 차트 크기를 줄임
						},
					},
				},
			],
		},
		colors: [
			'#f02424da', '#f0932fdf', '#ebe82be7', '#4b8e08dd', '#2a8cc9',
			'#1527ae', '#a842ec', '#d524d5', '#36899cea', '#1e8f80',
			'#a43e65', '#0a4e7889', '#9ea4a2',
		],
		labels: [
			'정보보호시스템', '응용프로그램', '소프트웨어', '전자정보', '문서',
			'특허 및 상표', 'IT 장비 - 시스템', 'IT 장비 – 네트워크', '단말기',
			'가구', '기기', '차량', '기타',
		],
		legend: {
			show: true,
			position: 'right', // 기본적으로 왼쪽에 위치
			horizontalAlign: 'center',
			verticalAlign: 'middle',
			floating: false,
			fontSize: '14px',
			offsetX: 0,
			offsetY: 7,
		},
	};

	const totalAssetValueData = [
		300.56, 154.02, 154.02, 154.02, 154.02, 154.02, 154.02,
		154.02, 154.02, 154.02, 154.02, 135.18, 48.96,
	];

	return (
		<Card>
			<Card.Body>
				<h4 className="header-title">분류별 자산 비율</h4>
				<div className="chart-container">
					<Chart
						options={totalAssetValueOpts}
						series={totalAssetValueData}
						type="donut"
						className="apex-charts mb-2 mt-2"
					/>
				</div>
			</Card.Body>
		</Card>
	);
};

export default TotalAssetRatio;

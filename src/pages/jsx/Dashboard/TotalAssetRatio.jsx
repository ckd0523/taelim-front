import { Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
//import ChartDataLabels from 'chartjs-plugin-datalabels';

// Chart.js에 필요한 요소 및 플러그인 등록
ChartJS.register(ArcElement, Tooltip, Legend);

const TotalAssetRatio = () => {
	const data = {
		labels: [
			'정보보호시스템', '응용프로그램', '소프트웨어', '전자정보', '문서',
			'특허 및 상표', 'IT 장비 - 시스템', 'IT 장비 – 네트워크', '단말기',
			'가구', '기기', '차량', '기타',
		],
		datasets: [{
			data: [
				300.56, 154.02, 154.02, 154.02, 154.02, 154.02, 154.02,
				154.02, 154.02, 154.02, 154.02, 135.18, 100.96,
			],
			backgroundColor: [
				'#f02424da', '#f0932fdf', '#ebe82be7', '#4b8e08dd', '#2a8cc9',
				'#1527ae', '#a842ec', '#d524d5', '#36899cea', '#1e8f80',
				'#a43e65', '#0a4e7889', '#9ea4a2',
			],
			borderColor: '#fff',
			borderWidth: 2,
		}],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false, // 차트 크기를 부모 요소에 맞춤
		plugins: {
			legend: {
				position: 'right', // 범례를 오른쪽에 배치
				labels: {
					font: {
						size: 14,
					},
				},
			},
			datalabels: {
				formatter: (value, context) => {
					const total = context.dataset.data.reduce((acc, val) => acc + val, 0); // 전체 값 합산
					const percentage = (value / total) * 100;
					//console.log(percentage);

					// 퍼센트가 5% 이상일 경우에만 텍스트 표시
					return percentage >= 5 ? percentage.toFixed(2) + '%' : null;
				},
				color: '#fff', // 퍼센트 텍스트 색상
				font: {
					size: 14,
				},
				anchor: 'center', // 텍스트 위치
				align: 'center',
			},
			tooltip: {
				callbacks: {
					label: function (tooltipItem) {
						const total = tooltipItem.dataset.data.reduce((acc, val) => acc + val, 0);
						const value = tooltipItem.raw; // 각 데이터 값
						const percentage = (value / total * 100).toFixed(2); // 퍼센트 계산

						// 각 항목의 각도 계산 예시
						//const total = data.datasets[0].data.reduce((acc, val) => acc + val, 0);
						// const angles = data.datasets[0].data.map((value) => (value / total) * 360);

						// angles.forEach((angle, index) => {
						// 	console.log(`${data.labels[index]}: ${angle.toFixed(2)}도`);
						// });

						return `${value}개 (${percentage}%)`; // 툴팁에 표시할 내용
					},
				},
			},
		},
	};

	return (
		<Card>
			<Card.Body>
				<h4 className="header-title">분류별 자산 비율</h4>
				<div style={{ height: '333px' }}>
					<Doughnut data={data} options={options} />
				</div>
			</Card.Body>
		</Card>
	);
};

export default TotalAssetRatio;

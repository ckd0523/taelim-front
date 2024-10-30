import { Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // 추가

// Chart.js에 필요한 요소 및 플러그인 등록
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels); // ChartDataLabels 등록

const TotalAssetRatio = () => {
	const data = {
		labels: [
			'A: 정보보호시스템', 'B: 응용프로그램', 'C: 소프트웨어', 'D: 전자정보', 'E: 문서',
			'F: 특허 및 상표', 'G: IT 장비 - 시스템', 'H: IT 장비 – 네트워크', 'I: 단말기',
			'J: 가구', 'K: 기기', 'L: 차량', 'M: 기타',
		],
		datasets: [{
			data: [
				187, 95, 246, 133, 271, 164, 52, 299, 178, 205, 88, 152, 237,
			],
			backgroundColor: [
				'rgba(3, 39, 103, 1)', 'rgba(3, 39, 103, 0.9)', 'rgba(3, 39, 103, 0.9)',
				'rgba(3, 39, 103, 0.8)', 'rgba(3, 39, 103, 0.8)', 'rgba(3, 39, 103, 0.8)',
				'rgba(3, 39, 103, 0.7)', 'rgba(3, 39, 103, 0.7)', 'rgba(3, 39, 103, 0.6)',
				'rgba(3, 39, 103, 0.6)', 'rgba(3, 39, 103, 0.5)', 'rgba(3, 39, 103, 0.5)',
				'rgba(3, 39, 103, 0.4)',
			],
			borderColor: '#fff',
			borderWidth: 2,
		}],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'right',
				labels: {
					font: {
						size: 14,
					},
				},
			},
			datalabels: {
				formatter: (value, context) => {
					const labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
					const total = context.dataset.data.reduce((acc, val) => acc + val, 0); // 전체 값 합산
					const percentage = ((value / total) * 100).toFixed(2); // 비율 계산

					return `     ${labels[context.dataIndex]}\n ${percentage}%`; // 알파벳과 비율 표시
				},
				color: '#fff',
				font: {
					size: 14,
				},
				anchor: 'center',
				align: 'center',
			},
			tooltip: {
				callbacks: {
					label: function (tooltipItem) {
						const value = tooltipItem.raw;
						return `${value}개`; // 툴팁에 표시할 내용
					},
				},
			},
		},
	};

	return (
		<Card style={{ width: '100%', height: '93%' }}>
			<Card.Body>
				<h4 className="header-title">분류별 자산 비율</h4>
				<div style={{ width: "100%", height: "93%" }}>
					<Doughnut data={data} options={options} />
				</div>
			</Card.Body>
		</Card>
	);
};

export default TotalAssetRatio;

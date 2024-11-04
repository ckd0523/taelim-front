import { Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // 추가
import { assetType } from './AssetIndex';
import { useEffect } from 'react';
import api from '@/common/api/authAxios';
import { useState } from 'react';
import noData from './NoData';

const URL = import.meta.env.VITE_BASIC_URL;

// Chart.js에 필요한 요소 및 플러그인 등록
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels); // ChartDataLabels 등록

const TotalAssetRatio = () => {
	const [ratioData, setRatioData] = useState();
	const [isDataExist, setIsDataExist] = useState(false);

	useEffect(() => {
		const getAssetRatioData = async () => {
			const response = await api.get(`${URL}/???`);
			console.log(response); // 현민씨한테 백엔드 아직 못받음

			setRatioData(response.data);
			if (response.data) {
				setIsDataExist(true);
			}
		};

		getAssetRatioData();
	}, []);

	const data = {
		labels: assetType,
		datasets: [{
			data: ratioData,
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
				display: isDataExist,
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

					//console.log(ratioData[0] == -1);
					if (ratioData[0] == -1) {
						return `No Data`;
					}

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

						if (ratioData[0] == -1) {
							return `No Data`;
						}
						return `${value}개`; // 툴팁에 표시할 내용
					},
				},
			},
		},
	};

	const plugins = [
		{
			afterDraw: function (chart) {
				//console.log(chart);
				if (chart.data.datasets[0].data.length < 1) {
					let ctx = chart.ctx;
					let width = chart.width;
					let height = chart.height;
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.font = "30px Arial";
					ctx.fillText("No data to display", width / 2, height / 2);
					ctx.restore();
				}
			},
		},
	];

	return (
		<Card style={{ width: '100%', height: '93%' }}>
			<Card.Body>
				<h4 className="header-title">분류별 자산 비율</h4>
				<div style={{ width: "100%", height: "93%" }}>
					<Doughnut data={data} options={options} plugins={noData} />
				</div>
			</Card.Body>
		</Card>
	);
};

export default TotalAssetRatio;

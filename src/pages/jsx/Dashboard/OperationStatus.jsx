import { Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useState, useEffect } from 'react';
import api from '@/common/api/authAxios';
import noData from './NoData';

// Chart.js에 필요한 스케일과 요소를 등록합니다.
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const URL = import.meta.env.VITE_BASIC_URL;

const OperationStatus = () => {
	//const [operationData, setOperationData] = useState([0, 0, 0]); // 초기값 설정 (가동, 미가동, 고장)
	const [operationData, setOperationData] = useState();
	const [isDataExist, setIsDataExist] = useState(false);

	useEffect(() => {
		const getOperationData = async () => {
			const response = await api.get(`${URL}/chart/5`);
			console.log(response.data);

			setOperationData(Object.values(response.data)); // 데이터가 없으면 초기값 유지
			if (response.data) {
				setIsDataExist(true);
			}
		};

		getOperationData();
	}, []);

	// 데이터의 유효성에 따라 색상 동적으로 설정
	// const backgroundColors = ['#5a85dc', '#acaba6', '#e15759']; // 고정된 색상 배열
	// const getBackgroundColors = () =>
	// 	operationData.map((value, index) => (value > 0 ? backgroundColors[index] : '#e0e0e0')); // 데이터가 없으면 회색 처리

	const data = {
		labels: ['가동', '미가동', '고장'],
		datasets: [
			{
				data: operationData, // 데이터 배열
				backgroundColor: ['#5a85dc', '#acaba6', '#d88b3f'],
				borderColor: ['#5a85dc', '#acaba6', '#d88b3f'],
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: isDataExist, // 항상 범례 표시
				position: 'bottom',
				labels: {
					font: {
						size: 17,
					},
				},
			},
			datalabels: {
				color: '#fff',
				font: {
					size: 17,
				},
				anchor: 'center',
				align: 'center',
			},
			tooltip: {
				callbacks: {
					label: function (tooltipItem) {
						const value = tooltipItem.raw; // 각 데이터 값
						return `${value}개`; // 툴팁에 표시할 내용
					},
				},
			},
		},
	};

	return (
		<Card style={{ width: '100%', height: '93%' }}>
			<Card.Body>
				<h4 className="header-title">운용 현황</h4>
				<div style={{ width: '100%', height: '93%' }}>
					<Doughnut data={data} options={options} plugins={noData} />
				</div>
			</Card.Body>
		</Card>
	);
};

export default OperationStatus;

import { Button, Card, Col, Row } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import Select from 'react-select';
import { useState } from 'react';
import { useEffect } from 'react';
import { assetTypeNoAlpha } from './AssetIndex';
import api from '@/common/api/authAxios';
import noData from './NoData';
// import { setLabels } from 'react-chartjs-2/dist/utils';

const URL = import.meta.env.VITE_BASIC_URL;

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DepartmentStatus = ({ location }) => {
	const [departmentData, setDepartmentData] = useState();
	const [labels, setLabel] = useState([]);

	const handleData = async () => {
		const response = await api.get(`${URL}/chart/4`);
		console.log(location.label);
		console.log(response.data);
		console.log(response.data.경영기획실);
		const departmentName = location.label;

		if (response.data && response.data[departmentName]) {
			const classifications = Object.keys(response.data[departmentName]);
			setLabel(classifications);
			console.log(Object.values(response.data[departmentName]));

			setDepartmentData(Object.values(response.data[departmentName]));
		}
	};

	useEffect(() => {
		handleData();
	}, [location]);

	const data = {
		// labels: [
		// 	'정보보호시스템',
		// 	'응용프로그램',
		// 	'소프트웨어',
		// 	'전자정보',
		// 	'문서',
		// 	'특허 및 상표',
		// 	'IT 장비-시스템',
		// 	'IT 장비–네트워크',
		// 	'단말기',
		// 	'가구',
		// 	'기기',
		// 	'차량',
		// 	'기타',
		// ],
		labels: labels,
		datasets: [
			{
				data: departmentData,
				backgroundColor: [
					'rgba(24, 152, 51, 1)',
					'rgba(24, 152, 51, 1)',
					'rgba(24, 152, 51, 1)',
					'rgba(24, 152, 51, 1)',
					'rgba(24, 152, 51, 0.9)',
					'rgba(24, 152, 51, 0.9)',
					'rgba(24, 152, 51, 0.9)',
					'rgba(24, 152, 51, 0.9)',
					'rgba(24, 152, 51, 0.8)',
					'rgba(24, 152, 51, 0.8)',
					'rgba(24, 152, 51, 0.8)',
					'rgba(24, 152, 51, 0.8)',
					'rgba(24, 152, 51, 0.7)',
				],
			},
		],
	};

	// Define options for the bar chart
	const options = {
		responsive: true,
		maintainAspectRatio: false, // Card에 꽉 차도록 설정
		plugins: {
			legend: {
				position: 'right',
				display: false,
			},
			datalabels: {
				color: 'white',
			},
			tooltip: {
				callbacks: {
					label: function (tooltipItem) {
						//console.log(tooltipItem);
						const label = tooltipItem.dataset.label;
						const value = tooltipItem.raw; // 각 데이터 값
						return `${value}개`; // 툴팁에 표시할 내용
					},
				},
			},
		},
		scales: {
			y: {
				stacked: true,
				beginAtZero: true,
				title: {
					display: true,
					text: '개수',
				},
			},
			x: {
				stacked: true,
			},
		},
	};

	return (
		<>
			<div style={{ width: '100%', height: '90%' }}>
				<Bar data={data} options={options} plugins={noData} />
			</div>
		</>
	);
};

//---------------------------------------------------------------------------------------------

const DepartmentStatus2 = () => {
	//벨류는 현민씨 백엔드 보고 고쳐야함
	const [location, setLocation] = useState({ value: '0', label: '부서별 자산' });
	const [departmentData, setDepartmentData] = useState();

	useEffect(() => {
		const getDepartmentData = async () => {
			const response = await api.get(`${URL}/chart/3`);
			console.log(response.data);

			setDepartmentData(Object.values(response.data));
		};

		getDepartmentData();
	}, []);

	const data = {
		labels: [
			'구매팀',
			'경영기획실',
			'생산팀',
			'품질팀',
			'영업팀',
			'기술연구소',
			'기타',
			'관리팀',
		],
		datasets: [
			{
				label: '개수',
				data: departmentData, // y축 값
				backgroundColor: [
					'#4E79A7',
					'#F28E2B',
					'#76B7B2',
					'#E15759',
					'#59A14F',
					'#acaba6',
					'#032767',
				],
				borderColor: [
					'#4E79A7',
					'#F28E2B',
					'#76B7B2',
					'#E15759',
					'#59A14F',
					'#acaba6',
					'#032767',
				],
				borderWidth: 1,
				barThickness: 45, // columnWidth 설정
			},
		],
	};

	// Define options for the bar chart
	const options = {
		responsive: true,
		maintainAspectRatio: false, // Card에 꽉 차도록 설정
		plugins: {
			legend: {
				//position: 'top',
				display: false,
			},
			datalabels: {
				color: '#fff',
				font: {
					size: 17,
				},
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
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: '개수',
				},
			},
			x: {
				grid: {
					display: false, // x축 그리드 라인 비활성화
				},
				ticks: {
					font: {
						size: 12, // 원하는 폰트 사이즈로 설정
					},
				},
			},
		},
	};

	const handleLocation = (selectedOption) => {
		//console.log("아놔: " + JSON.stringify(selectedOption));
		setLocation(selectedOption);
	};

	return (
		<Card style={{ width: '100%', height: '93%' }}>
			<Card.Body>
				<Row>
					<Col>
						<h4 className="header-title">
							{location.value == 0 ? '부서별 자산현황' : `${location.label} 자산현황`}
						</h4>
					</Col>

					<Col sm={4}>
						<Select
							options={[
								//벨류는 현민씨 백엔드 보고 고쳐야함
								{ value: '0', label: '부서별 자산' },
								{ value: '1', label: '경영기획실' },
								{ value: '2', label: '관리팀' },
								{ value: '3', label: '영업팀' },
								{ value: '4', label: '구매팀' },
								{ value: '5', label: '품질팀' },
								{ value: '6', label: '생산팀' },
								{ value: '7', label: '기술연구소' },
							]}
							defaultValue={{ value: '0', label: '부서별 자산' }}
							onChange={handleLocation}
						/>
					</Col>
				</Row>

				{location.value == 0 ? (
					<div style={{ width: '100%', height: '87%' }}>
						<Bar data={data} options={options} plugins={noData} />
					</div>
				) : (
					<DepartmentStatus location={location} />
				)}
			</Card.Body>
		</Card>
	);
};

export { DepartmentStatus, DepartmentStatus2 };

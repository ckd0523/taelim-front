// import { Card, Col, Row } from 'react-bootstrap';
// import styled, { css } from 'styled-components';
// import bluePrint from '@/assets/images/BluePrint3.png';
// import { Bar } from 'react-chartjs-2';
// import {
// 	Chart as ChartJS,
// 	BarElement,
// 	CategoryScale,
// 	LinearScale,
// 	Tooltip,
// 	Legend,
// } from 'chart.js';
// import { useState } from 'react';
// import Select from 'react-select';
// import { assetLocation } from './AssetIndex.js';
// import { useEffect } from 'react';
// import { assetTypeNoAlpha } from './AssetIndex.js';
// import api from '@/common/api/authAxios.js';
// import noData from './NoData.js';

// const URL = import.meta.env.VITE_BASIC_URL;

// // Chart.js에 필요한 요소 및 플러그인 등록
// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// const BlueprintContainer = styled.div`
// 	position: relative;
// 	width: 100%; // Card의 가로 크기에 맞춤
// 	height: 100%; // Card의 세로 크기에 맞춤
// `;

// const GridOverlay = styled.div`
// 	position: absolute;
// 	top: 0;
// 	left: 0;
// 	width: 100%;
// 	height: 100%;
// 	display: grid;
// 	grid-template-columns: repeat(30, 1fr); /* 가로 30칸 */
// 	grid-template-rows: repeat(30, 1fr); /* 세로 30칸 */
// `;

// const GridCell = styled.div`
// 	border: 1px solid transparent; /* 기본 테두리는 투명하게 */
// 	/* border: 1px solid rgba(215, 212, 208, 1);  기본 테두리는 회색 */
// 	cursor: pointer;

// 	${({ mergeColumns, mergeRows, isMerged }) =>
// 		mergeColumns &&
// 		mergeRows &&
// 		isMerged &&
// 		css`
// 			grid-column: ${mergeColumns};
// 			grid-row: ${mergeRows};
// 			border: 3px solid rgba(255, 0, 0, 0.8); /* 병합된 셀 테두리 색상 */
// 		`}
// `;

// const LocationStatus = ({ setLocation }) => {
// 	const handleGridClick = (gridId) => {
// 		if (gridId === '1-1') {
// 			setLocation('본관');
// 		} else if (gridId === '1-2') {
// 			setLocation('MDCG');
// 		} else if (gridId === '1-3') {
// 			setLocation('공장동');
// 		}
// 	};

// 	return (
// 		<Card>
// 			<Card.Body>
// 				<h4 className="header-title">위치별 현황</h4>
// 				<BlueprintContainer>
// 					<img src={bluePrint} className="img-fluid" alt="Blue Print" />
// 					<GridOverlay>
// 						{Array.from({ length: 30 }).map((_, rowIndex) =>
// 							Array.from({ length: 30 }).map((_, colIndex) => {
// 								const gridId = `${rowIndex}-${colIndex}`;

// 								// 병합 영역 설정
// 								let mergeColumns;
// 								let mergeRows;
// 								let isMerged = false;
// 								if (gridId === '1-1') {
// 									// 첫 번째 병합 영역
// 									mergeColumns = '1 / span 4';
// 									mergeRows = '19 / span 11';
// 									isMerged = true;
// 								} else if (gridId === '1-2') {
// 									// 두 번째 병합 영역
// 									mergeColumns = '6 / span 4';
// 									mergeRows = '7 / span 12';
// 									isMerged = true;
// 								} else if (gridId === '1-3') {
// 									// 세 번째 병합 영역
// 									mergeColumns = '13 / span 12';
// 									mergeRows = '6 / span 20';
// 									isMerged = true;
// 								}

// 								return (
// 									<GridCell
// 										key={gridId}
// 										onClick={() => handleGridClick(gridId)}
// 										mergeColumns={mergeColumns}
// 										mergeRows={mergeRows}
// 										isMerged={isMerged} // 병합된 셀에만 테두리 표시
// 									/>
// 								);
// 							})
// 						)}
// 					</GridOverlay>
// 				</BlueprintContainer>
// 			</Card.Body>
// 		</Card>
// 	);
// };

// const SelectedLocation = ({ location }) => {
// 	const [axis, setAxis] = useState('x');
// 	const [chartData, setData] = useState();

// 	const handleAxis = (selectedValue) => {
// 		setAxis(selectedValue); // 선택된 값을 상태에 저장
// 	};

// 	// const handleLocation = async (selectedValue) => {
// 	// 	console.log(selectedValue);

// 	// 	const response = await api.get(`${URL}/chart/10/${selectedValue}`);
// 	// 	console.log(response.data);
// 	// 	setData(response.data);
// 	// };

// 	// useEffect(() => {
// 	// 	// const getLocationData = async () => {
// 	// 	// 	const response = await api.get(`${URL}/chart/10/${location}`);
// 	// 	// 	console.log(response.data);
// 	// 	// 	setData(response.data);
// 	// 	// };

// 	// 	handleLocation(location);
// 	// }, [location]);

// 	const fetchData = async () => {
// 		try {
// 			const response = await api.get(`${URL}/chart/10/${location}`);
// 			const assetLocationData = response.data;

// 			const assetClassificationCounts = Object.keys(assetLocationData).map(
// 				(classification) => {
// 					return assetLocationData[classification];
// 				}
// 			);
// 			setAssetClassifiacationLabels(Object.keys(assetLocationData));
// 			setData(assetClassificationCounts);
// 		} catch (error) {
// 			console.log(error);
// 			setData([]);
// 		}
// 	};

// 	useEffect(() => {
// 		// 	// const getLocationData = async () => {
// 		// 	// 	const response = await api.get(`${URL}/chart/10/${location}`);
// 		// 	// 	console.log(response.data);
// 		// 	// 	setData(response.data);
// 		// 	// };

// 		fetchData(location);
// 	}, [location]);

// 	const data = {
// 		labels: assetTypeNoAlpha,
// 		datasets: [
// 			{
// 				//label: '자산 수량',
// 				data: chartData || [],
// 				backgroundColor: [
// 					'rgba(42, 140, 201, 1)',
// 					'rgba(42, 140, 201, 1)',
// 					'rgba(42, 140, 201, 1)',
// 					'rgba(42, 140, 201, 1)',
// 					'rgba(42, 140, 201, 0.8)',
// 					'rgba(42, 140, 201, 0.8)',
// 					'rgba(42, 140, 201, 0.8)',
// 					'rgba(42, 140, 201, 0.8)',
// 					'rgba(42, 140, 201, 0.7)',
// 					'rgba(42, 140, 201, 0.7)',
// 					'rgba(42, 140, 201, 0.7)',
// 					'rgba(42, 140, 201, 0.7)',
// 					'rgba(42, 140, 201, 0.6)',
// 				],
// 				borderColor: '#fff',
// 				borderWidth: 1,
// 			},
// 		],
// 	};

// 	const options = {
// 		indexAxis: axis, // 가로 바 차트로 설정 (세로 차트로 하려면 'y' 제거)
// 		responsive: true,
// 		maintainAspectRatio: false,
// 		scales: {
// 			x: {
// 				beginAtZero: true,
// 				title: {
// 					display: axis != 'x',
// 					text: '개수',
// 				},
// 				grid: {
// 					display: false, // x축 그리드 라인 비활성화
// 				},
// 			},
// 			y: {
// 				ticks: {
// 					font: {
// 						size: 14,
// 					},
// 				},
// 				title: {
// 					display: axis != 'y',
// 					text: '개수',
// 				},
// 			},
// 		},
// 		plugins: {
// 			legend: {
// 				display: false,
// 			},
// 			datalabels: {
// 				color: '#fff',
// 				font: {
// 					size: 17,
// 				},
// 			},
// 			tooltip: {
// 				callbacks: {
// 					label: function (tooltipItem) {
// 						const total = tooltipItem.dataset.data.reduce((acc, val) => acc + val, 0);
// 						const value = tooltipItem.raw; // 각 데이터 값
// 						const percentage = ((value / total) * 100).toFixed(2); // 퍼센트 계산
// 						return `${value}개`; // 툴팁에 표시할 내용
// 					},
// 				},
// 			},
// 		},
// 	};

// 	return (
// 		<Card style={{ width: '100%', height: '95%' }}>
// 			<Card.Body>
// 				<Col sm={12} className="d-flex justify-content-between">
// 					<h4 className="header-title" style={{ display: 'inline' }}>
// 						{location} 자산 개수{' '}
// 					</h4>
// 					<Row>
// 						<Col>
// 							<Select
// 								options={[
// 									{ value: 'x', label: '세로' },
// 									{ value: 'y', label: '가로' },
// 								]}
// 								defaultValue={{ value: 'x', label: '세로' }} // 기본 값 설정
// 								onChange={(selectedOption) => handleAxis(selectedOption.value)}
// 							/>
// 						</Col>

// 						{location === '본관' && (
// 							<Col>
// 								<Select
// 									defaultValue={{ value: 'MAIN_1F', label: '본관 1층' }}
// 									options={assetLocation}
// 									onChange={(selectedOption) =>
// 										handleLocation(selectedOption.value)
// 									}
// 								/>
// 							</Col>
// 						)}
// 					</Row>
// 				</Col>

// 				<div style={{ width: '100%', height: '90%' }}>
// 					<Bar data={data} options={options} plugins={noData} />
// 				</div>
// 			</Card.Body>
// 		</Card>
// 	);
// };

// export { LocationStatus, SelectedLocation };
import { Card, Col, Row } from 'react-bootstrap';
import styled, { css } from 'styled-components';
import bluePrint from '@/assets/images/BluePrint3.png';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
} from 'chart.js';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { assetLocation } from './AssetIndex.js';
import api from '@/common/api/authAxios.js';
import noData from './NoData.js';

const URL = import.meta.env.VITE_BASIC_URL;

// Chart.js에 필요한 요소 및 플러그인 등록
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BlueprintContainer = styled.div`
<<<<<<< Updated upstream
  position: relative;
  width: 100%;  // Card의 가로 크기에 맞춤
  height: 100%; // Card의 세로 크기에 맞춤
  aspect-ratio: 16 / 9; /* 이미지의 가로세로 비율을 유지 */
`;

const ImageOverlay = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;  // 이미지 크기를 컨테이너에 맞춤
`;

const GridOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(30, 1fr); /* 가로 30칸 */
  grid-template-rows: repeat(30, 1fr); /* 세로 30칸 */
  aspect-ratio: 16 / 9; /* 이미지의 가로세로 비율을 유지 */
=======
	position: relative;
	width: 100%; // Card의 가로 크기에 맞춤
	height: 100%; // Card의 세로 크기에 맞춤
`;

const GridOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(30, 1fr); /* 가로 30칸 */
	grid-template-rows: repeat(30, 1fr); /* 세로 30칸 */
>>>>>>> Stashed changes
`;

const GridCell = styled.div`
	border: 1px solid transparent; /* 기본 테두리는 투명하게 */
	cursor: pointer;

	${({ mergeColumns, mergeRows, isMerged }) =>
		mergeColumns &&
		mergeRows &&
		isMerged &&
		css`
			grid-column: ${mergeColumns};
			grid-row: ${mergeRows};
			border: 3px solid rgba(255, 0, 0, 0.8); /* 병합된 셀 테두리 색상 */
		`}
`;

const LocationStatus = ({ setLocation }) => {
	const handleGridClick = (gridId) => {
		if (gridId === '1-1') {
			setLocation({ value: 'MAIN_1F', label: '본관' });
		} else if (gridId === '1-2') {
			setLocation({ value: 'MDCG', label: 'MDCG' });
		} else if (gridId === '1-3') {
			setLocation({ value: 'FACTORY_BUILDING', label: '공장동' });
		}
	};

<<<<<<< Updated upstream
  return (
    <Card style={{ width: '100%', height: '95%' }}>
      <Card.Body>
        <h4 className="header-title">위치별 현황</h4>
        <BlueprintContainer>
          <ImageOverlay src={bluePrint} className="img-fluid" alt="Blue Print" />
          <GridOverlay>
            {Array.from({ length: 30 }).map((_, rowIndex) =>
              Array.from({ length: 30 }).map((_, colIndex) => {
                const gridId = `${rowIndex}-${colIndex}`;

                // 병합 영역 설정
                let mergeColumns;
                let mergeRows;
                let isMerged = false;
                if (gridId === "1-1") { // 첫 번째 병합 영역
                  mergeColumns = "1 / span 4";
                  mergeRows = "18 / span 11";
                  isMerged = true;
                } else if (gridId === "1-2") { // 두 번째 병합 영역
                  mergeColumns = "6 / span 4";
                  mergeRows = "7 / span 11";
                  isMerged = true;
                } else if (gridId === "1-3") { // 세 번째 병합 영역
                  mergeColumns = "13 / span 12";
                  mergeRows = "6 / span 20";
                  isMerged = true;
                }
=======
	return (
		<Card>
			<Card.Body>
				<h4 className="header-title">위치별 현황</h4>
				<BlueprintContainer>
					<img src={bluePrint} className="img-fluid" alt="Blue Print" />
					<GridOverlay>
						{Array.from({ length: 30 }).map((_, rowIndex) =>
							Array.from({ length: 30 }).map((_, colIndex) => {
								const gridId = `${rowIndex}-${colIndex}`;

								// 병합 영역 설정
								let mergeColumns;
								let mergeRows;
								let isMerged = false;
								if (gridId === '1-1') {
									mergeColumns = '1 / span 4';
									mergeRows = '19 / span 11';
									isMerged = true;
								} else if (gridId === '1-2') {
									mergeColumns = '6 / span 4';
									mergeRows = '7 / span 12';
									isMerged = true;
								} else if (gridId === '1-3') {
									mergeColumns = '13 / span 12';
									mergeRows = '6 / span 20';
									isMerged = true;
								}
>>>>>>> Stashed changes

								return (
									<GridCell
										key={gridId}
										onClick={() => handleGridClick(gridId)}
										mergeColumns={mergeColumns}
										mergeRows={mergeRows}
										isMerged={isMerged}
									/>
								);
							})
						)}
					</GridOverlay>
				</BlueprintContainer>
			</Card.Body>
		</Card>
	);
};

const SelectedLocation = ({ location }) => {
	const [axis, setAxis] = useState('x');
	const [chartData, setData] = useState();
	const [assetClassifications, setAssetClassifications] = useState([]);

	const handleAxis = (selectedValue) => {
		setAxis(selectedValue);
	};

	const handleLocation = async (selectedValue) => {
		console.log(selectedValue);

		const response = await api.get(`${URL}/chart/10/${selectedValue}`);
		console.log(response.data);
		setData(response.data);
	};

	const fetchData = async () => {
		try {
			const response = await api.get(`${URL}/chart/10/${location.value}`);
			const assetLocationData = response.data;

			const classifications = Object.keys(assetLocationData); // Extract asset classifications
			setAssetClassifications(classifications);
			const assetClassificationCounts = Object.keys(assetLocationData).map(
				(classification) => {
					return assetLocationData[classification];
				}
			);
			// setAssetClassifiacationLabels(Object.keys(assetLocationData));
			setData(assetClassificationCounts);
		} catch (error) {
			console.log(error);
			setData([]);
		}
	};

	useEffect(() => {
		// const getLocationData = async () => {
		// 	const response = await api.get(`${URL}/chart/10/${location}`);
		// 	console.log(response.data);
		// 	setData(response.data);
		// };

		fetchData(location.value);
		// getLocationData();
	}, [location]);
	// const fetchData = async () => {
	// 	try {
	// 		const response = await api.get(`${URL}/chart/10/${location}`);
	// 		const assetLocationData = response.data;

	// 		// Prepare data for chart
	// 		const classifications = Object.keys(assetLocationData); // Extract asset classifications
	// 		setAssetClassifications(classifications);

	// 		const counts = classifications.map((classification) => {
	// 			return assetLocationData[classification]; // Count of assets for each classification
	// 		});

	// 		setChartData(counts); // Set chart data
	// 	} catch (error) {
	// 		console.log(error);
	// 		setChartData([]);
	// 	}
	// };

	// useEffect(() => {
	// 	if (location === 'MAIN_1F') {
	// 		fetchData();
	// 	}
	// 	fetchData();
	// }, [location]);

	const data = {
		labels: assetClassifications, // x-axis labels (asset classifications)
		datasets: [
			{
				data: chartData, // y-axis data (asset counts)
				backgroundColor: [
					'rgba(42, 140, 201, 1)',
					'rgba(42, 140, 201, 1)',
					'rgba(42, 140, 201, 1)',
					'rgba(42, 140, 201, 1)',
					'rgba(42, 140, 201, 0.8)',
				],
				borderColor: '#fff',
				borderWidth: 1,
			},
		],
	};

	const options = {
		indexAxis: axis,
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				beginAtZero: true,
				title: {
					display: axis !== 'x',
					text: '개수',
				},
				grid: {
					display: false,
				},
			},
			y: {
				ticks: {
					font: {
						size: 14,
					},
				},
				title: {
					display: axis !== 'y',
					text: '개수',
				},
			},
		},
		plugins: {
			legend: {
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
						// const total = tooltipItem.dataset.data.reduce((acc, val) => acc + val, 0);
						const value = tooltipItem.raw;
						// const percentage = ((value / total) * 100).toFixed(2);
						return `${value}개`;
					},
				},
			},
		},
	};

	return (
		<Card style={{ width: '100%', height: '95%' }}>
			<Card.Body>
				<Col sm={12} className="d-flex justify-content-between">
					<h4 className="header-title" style={{ display: 'inline' }}>
						{location.label} 자산 개수
					</h4>
					<Row>
						<Col>
							<Select
								options={[
									{ value: 'x', label: '세로' },
									{ value: 'y', label: '가로' },
								]}
								defaultValue={{ value: 'x', label: '세로' }}
								onChange={(selectedOption) => handleAxis(selectedOption.value)}
							/>
						</Col>
						{location.value === 'MAIN_1F' && (
							<Col>
								<Select
									style={{ whiteSpace: 'nowrap', width: 'auto' }}
									defaultValue={{ value: 'MAIN_1F', label: '본관 1층' }}
									options={assetLocation}
									onChange={(selectedOption) =>
										handleLocation(selectedOption.value)
									}
								/>
							</Col>
						)}
					</Row>
				</Col>

				<div style={{ width: '100%', height: '90%' }}>
					<Bar data={data} options={options} plugins={noData} />
				</div>
			</Card.Body>
		</Card>
	);
};

export { LocationStatus, SelectedLocation };

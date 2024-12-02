import { Card, Col, Row, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import noData from './NoData';
import { assetTypeNoAlpha } from './AssetIndex';
import { useState } from 'react';
import { useEffect } from 'react';
import api from '@/common/api/authAxios';

const URL = import.meta.env.VITE_BASIC_URL;

const PlannedDisposalStatus = () => {
	const today = new Date();
	const defaultDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
		2,
		'0'
	)}-${String(today.getDate()).padStart(2, '0')}`;
	console.log(defaultDate);

	const [disposalData, setDisposalData] = useState(defaultDate);
	const [dataValues, setDataValues] = useState([]);
	const [axis, setAxis] = useState('x');

	// const handleDate = async (selectedMonth) => {
	// 	//selectedMonth가 뭔지 정확히 알아야함
	// 	console.log(selectedMonth.target.value);
	// 	const response = await api.get(`${URL}/chart/9/${selectedMonth.target.value}`);
	// 	console.log(response.data);
	// 	setDisposalData(response.data);
	// };

	useEffect(() => {
		const getDisposalData = async () => {
			const response = await api.get(`${URL}/chart/9`);
			console.log('여기다', response.data);
			setDisposalData(response.data);
		};

		getDisposalData();
	}, []);

	const data = {
		labels: assetTypeNoAlpha,
		datasets: [
			{
				//label: '자산 수량',
				data: disposalData,
				backgroundColor: [
					'rgba(206, 110, 15, 1)',
					'rgba(206, 110, 15, 1)',
					'rgba(206, 110, 15, 1)',
					'rgba(206, 110, 15, 1)',
					'rgba(206, 110, 15, 0.9)',
					'rgba(206, 110, 15, 0.9)',
					'rgba(206, 110, 15, 0.9)',
					'rgba(206, 110, 15, 0.9)',
					'rgba(206, 110, 15, 0.8)',
					'rgba(206, 110, 15, 0.8)',
					'rgba(206, 110, 15, 0.8)',
					'rgba(206, 110, 15, 0.8)',
					'rgba(206, 110, 15, 0.7)',
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
		// 스케일 소수점 나타내는 부분 없애는 코드
		scales: {
			y: {
				stacked: true,
				ticks: {
					// 정수만 표시하도록 설정
					stepSize: 1, // 눈금 간격을 1로 설정
					callback: function (value) {
						// 소수점을 제거하고 정수만 표시
						if (Number.isInteger(value)) {
							return value;
						}
						return null;
					},
				},
				title: {
					display: true,
					text: '개수',
				},
			},
			x: {
				stacked: true,
			},
		},
		//  스케일 소수점 이 사이꺼
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
						const value = tooltipItem.formattedValue;
						return `${value}개`; // 툴팁에 표시할 내용
					},
				},
			},
		},
	};

	const renderTooltip = (props) => (
		<Tooltip id="tooltip" {...props}>
			<span style={{ fontSize: 15 }}>날짜 기준 3개월 데이터</span>
		</Tooltip>
	);

	return (
		<Card style={{ width: '100%', height: '93%' }}>
			<Card.Body>
				<Row>
					<Col>
						<h4 className="header-title" style={{ display: 'inline' }}>
							폐기 예정 현황
						</h4>
						<OverlayTrigger
							placement="top"
							delay={{ show: 100, hide: 50 }}
							overlay={renderTooltip}
						>
							<i className="ri-question-line" />
						</OverlayTrigger>
					</Col>

					{/* <Col sm={4}>
						<Form>
							<Form.Control
								type="date"
								defaultValue={defaultDate}
								onChange={handleDate}
							/>
						</Form>
					</Col> */}
				</Row>

				{/* <Col sm={4}>
            <Form>
              <Form.Control
                type='date'
                defaultValue={defaultDate}
                onChange={handleDate}
              />
            </Form>
          </Col> */}

				<div style={{ width: '100%', height: '87%' }}>
					<Bar data={data} options={options} plugins={noData} />
				</div>
			</Card.Body>
		</Card>
	);
};

export default PlannedDisposalStatus;

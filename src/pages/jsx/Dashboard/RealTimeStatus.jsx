import Chart from 'react-apexcharts';
import { Row, Col, Card, Table } from 'react-bootstrap';

const RealTimeStatus = () => {
	const StatusPieOpt = {
		chart: {
			height: 300,
			type: 'donut',
		},
		series: [75, 25],
		legend: {
			show: true,
			position: 'bottom',
			horizontalAlign: 'center',
			verticalAlign: 'middle',
			floating: false,
			fontSize: '14px',
			offsetX: 0,
			offsetY: 7,
		},
		labels: ['가동', '비가동'],
		colors: ['#5a85dc', '#cc5f5f'],
		responsive: [
			{
				breakpoint: 600,
				options: {
					chart: {
						height: 300,
					},
					legend: {
						show: false,
					},
				},
			},
		],
	};

	const StatusBarOpt = {
		chart: {
			height: 320,
			type: 'bar',
			toolbar: {
				show: false,
			},
		},
		plotOptions: {
			bar: {
				horizontal: true,
			},
		},
		dataLabels: {
			enabled: true,
		},
		series: [
			{
				data: [75, 20, 5, 0],
			},
		],
		colors: ['#5a85dc'],
		xaxis: {
			categories: ['사용중', '부서짐', '유지 보수 중', '기타'],
		},
		// states: {
		//     // hover: {
		//     //     // filter: 'none'
		//     // }
		// },
		grid: {
			borderColor: '#f1f3fa',
		},
		responsive: [
			{
				breakpoint: 600,
				options: {
					chart: {
						height: 240,
					},
					legend: {
						show: false,
					},
				},
			},
		],
	};

	return (
		<Card>
			<Card.Body>
				<h4 className="header-title">실시간 현황판</h4>
				<Row>
					<Col>
						<div className="d-flex justify-content-center">
							<Chart
								className="apex-charts"
								options={StatusPieOpt}
								height={250}
								width={300}
								series={StatusPieOpt.series}
								type="donut"
							/>
							<Chart
								className="apex-charts"
								options={StatusBarOpt}
								height={250}
								width={300}
								series={StatusBarOpt.series}
								type="bar"
							/>
						</div>
					</Col>
				</Row>
				<Row>
					<h4 className="header-title">자산총액</h4>
					<div className="d-flex justify-content-center">
						<Table className="border-black">
							<thead className="table-dark">
								<tr>
									<th>태림</th>
									<th>정부지원</th>
									<th>기타</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>122121</td>
									<td>12113</td>
									<td>1231321</td>
								</tr>
							</tbody>
						</Table>
					</div>
				</Row>
			</Card.Body>
		</Card>
	);
};
export default RealTimeStatus;

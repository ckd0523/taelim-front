import Chart from 'react-apexcharts';
import { Row, Col, Card, Table } from 'react-bootstrap';

const RealTimeStatus = () => {
	const StatusPieOpt = {
		chart: {
			height: 320,
			type: 'donut',
		},
		series: [25, 75],
		legend: {
			show: true,
			position: 'bottom',
			horizontalAlign: 'center',
			// verticalAlign: 'middle',
			floating: false,
			fontSize: '14px',
			offsetX: 0,
			offsetY: 7,
		},
		labels: ['비가동', '가동'],
		colors: ['#ffff00', '#000000'],
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
			enabled: false,
		},
		series: [
			{
				data: [75, 20, 5, 0],
			},
		],
		colors: ['#39afd1'],
		xaxis: {
			categories: ['Available', 'Broken', 'Repair', 'Other'],
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
						<div dir="ltr">
							<Chart
								className="apex-charts"
								options={StatusPieOpt}
								height={320}
								series={StatusPieOpt.series}
								type="donut"
							/>
						</div>
					</Col>
					<Col>
						<div dir="ltr">
							<Chart
								className="apex-charts"
								options={StatusBarOpt}
								height={320}
								series={StatusBarOpt.series}
								type="bar"
							/>
						</div>
					</Col>
				</Row>
				<Row className="mg-10">
					<h4 className="header-title">자산총액</h4>
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
				</Row>
			</Card.Body>
		</Card>
	);
};
export default RealTimeStatus;

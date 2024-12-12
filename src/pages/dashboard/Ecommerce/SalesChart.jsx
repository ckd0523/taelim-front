import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';

import { CardTitle } from '@/components';

const SalesChart = () => {
	const apexDonutOpts = {
		chart: {
			height: 340,
			type: 'donut',
		},
		colors: [
			'#727cf5',
			'#0acf97',
			'#fa5c7c',
			'#ffbc00',
			'#A5CAF6',
			'#086c62',
			'#ebe2ac',
			'#f27596',
			'#7f4600',
		],
		legend: {
			show: false,
		},
		responsive: [
			{
				breakpoint: 376,
				options: {
					chart: {
						width: 250,
						height: 250,
					},
					legend: {
						position: 'bottom',
					},
				},
			},
		],
	};

	const apexDonutData = [44, 55, 41, 17, 20, 15, 22, 10];

	return (
		<Card>
			<Card.Body>
				<CardTitle
					containerClass="d-flex align-items-center justify-content-between"
					title="각 분류별 자산의 개수"
					menuItems={[
						{ label: 'Sales Report' },
						{ label: 'Export Report' },
						{ label: 'Profit' },
						{ label: 'Action' },
					]}
				/>

				<Chart
					options={apexDonutOpts}
					series={apexDonutData}
					type="donut"
					height={500}
					className="apex-charts mb-2 mt-2"
				/>

				<div className="chart-widget-list">
					<p>
						<i className="mdi mdi-square text-primary"></i> 정보보호시스템
						<span className="float-end">$300.56</span>
					</p>
					<p>
						<i className="mdi mdi-square text-danger"></i> 응용프로그램
						<span className="float-end">$135.18</span>
					</p>
					<p>
						<i className="mdi mdi-square text-success"></i> 소프트웨어
						<span className="float-end">$48.96</span>
					</p>
					<p>
						<i className="mdi mdi-square text-warning"></i> 전자정보
						<span className="float-end">$154.02</span>
					</p>
					<p>
						<i className="mdi mdi-square" style={{ color: '#A5CAF6' }}></i> 문서
						<span className="float-end">$154.02</span>
					</p>
					<p>
						<i className="mdi mdi-square" style={{ color: '#086c62' }}></i> 특허 및 상표
						<span className="float-end">$154.02</span>
					</p>
					<p>
						<i className="mdi mdi-square" style={{ color: '#ebe2ac' }}></i> IT 장비 -
						시스템
						<span className="float-end">$154.02</span>
					</p>
					<p>
						<i className="mdi mdi-square" style={{ color: '#f27596' }}></i> IT 장비 –
						네트워크
						<span className="float-end">$154.02</span>
					</p>
					<p>
						<i className="mdi mdi-square" style={{ color: '#7f4600' }}></i> 단말기
						<span className="float-end">$154.02</span>
					</p>
					<p>
						<i className="mdi mdi-square"></i> 가구
						<span className="float-end">$154.02</span>
					</p>
					<p>
						<i className="mdi mdi-square"></i> 기기
						<span className="float-end">$154.02</span>
					</p>
					<p>
						<i className="mdi mdi-square"></i> 차량
						<span className="float-end">$154.02</span>
					</p>
					<p>
						<i className="mdi mdi-square"></i> 기타
						<span className="float-end">$154.02</span>
					</p>
				</div>
			</Card.Body>
		</Card>
	);
};

export default SalesChart;

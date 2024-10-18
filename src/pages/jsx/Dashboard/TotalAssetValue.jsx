import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';

const TotalAssetValue = () => {
	const totalAssetValueOpts = {
		chart: {
			height: 340,
			type: 'donut',
		},
		colors: [
			'#727cf5', // 정보보호시스템
			'#fa5c7c', // 응용프로그램
			'#0acf97', // 소프트웨어
			'#ffbc00', // 전자정보
			'#A5CAF6', // 문서
			'#086c62', // 특허 및 상표
			'#ebe2ac', // IT 장비 - 시스템
			'#f27596', // IT 장비 – 네트워크
			'#7f4600', // 단말기
			'#BB4513', // 가구
			'#4682B4', // 기기
			'#FF4500', // 차량
			'#708090', // 기타
		],
		labels: [
			'정보보호시스템',
			'응용프로그램',
			'소프트웨어',
			'전자정보',
			'문서',
			'특허 및 상표',
			'IT 장비 - 시스템',
			'IT 장비 – 네트워크',
			'단말기',
			'가구',
			'기기',
			'차량',
			'기타',
		],
		legend: {
			show: true,
			position: 'bottom',
			horizontalAlign: 'center',
			// verticalAlign: "middle",
			floating: false,
			fontSize: '14px',
			offsetX: 0,
			offsetY: 7,
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

	const totalAssetValueData = [
		300.56, // 정보보호시스템
		135.18, // 응용프로그램
		48.96, // 소프트웨어
		154.02, // 전자정보
		154.02, // 문서
		154.02, // 특허 및 상표
		154.02, // IT 장비 - 시스템
		154.02, // IT 장비 – 네트워크
		154.02, // 단말기
		154.02, // 가구
		154.02, // 기기
		154.02, // 차량
		154.02, // 기타
	];

	return (
		<Card>
			<Card.Body>
				<h4 className="header-title">총자산 가치</h4>
				<div dir="ltr">
					<Chart
						options={totalAssetValueOpts}
						series={totalAssetValueData}
						type="donut"
						height={500}
						className="apex-charts mb-2 mt-2"
					/>
				</div>
			</Card.Body>
		</Card>
	);
};

export default TotalAssetValue;

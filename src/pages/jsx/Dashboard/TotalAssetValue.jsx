import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';

const TotalAssetValue = () => {
	const totalAssetValueOpts = {
		chart: {
			height: 300,
			type: 'donut',
		},
		colors: [
			'#f02424da', // 정보보호시스템 (차분한 블루)
			'#f0932fdf', // 응용프로그램 (따뜻한 오렌지)
			'#ebe82be7', // 소프트웨어 (신선한 그린)
			'#4b8e08dd', // 전자정보 (부드러운 레드)
			'#2a8cc9', // 문서 (은은한 퍼플)
			'#1527ae', // 특허 및 상표 (중성적인 브라운)
			'#a842ec', // IT 장비 - 시스템 (산뜻한 핑크)
			'#d524d5', // IT 장비 – 네트워크 (중립적인 그레이)
			'#36899cea', // 단말기 (밝은 라임 그린)
			'#1e8f80', // 가구 (청록색)
			'#a43e65', // 기기 (부드러운 오렌지)
			'#0a4e7889', // 차량 (짙은 블루)
			'#9ea4a2', // 기타 (옅은 그린)
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
			position: 'left',
			horizontalAlign: 'center',
			verticalAlign: 'middle',
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
		135.18, // 응용프로그램
		48.96, // 소프트웨어
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
						height={390}
						width={600}
						className="apex-charts mb-2 mt-2"
					/>
				</div>
			</Card.Body>
		</Card>
	);
};

export default TotalAssetValue;

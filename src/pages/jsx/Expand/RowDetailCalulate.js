// 자산 분류에 따른 잔존가치율을 반환하는 함수
export const getResidualValueRate = (classification) => {
	switch (classification) {
		case '정보보호시스템':
			return 0.1; // 예시: 10%
		case '응용프로그램':
			return 0.15; // 예시: 15%
		case '소프트웨어':
			return 0.2; // 예시: 20%
		case '전자정보':
			return 0.05; // 예시: 5%
		case '문서':
			return 0.1; // 예시: 10%
		case '특허 및 상표':
			return 0.25; // 예시: 25%
		case 'IT 장비 - 시스템':
			return 0.3; // 예시: 30%
		case 'IT 장비 – 네트워크':
			return 0.3; // 예시: 30%
		case '단말기':
			return 0.2; // 예시: 20%
		case '가구':
			return 0.05; // 예시: 5%
		case '기기':
			return 0.1; // 예시: 10%
		case '차량':
			return 0.2; // 예시: 20%
		case '기타':
			return 0.05; // 예시: 5%
		default:
			return 0.0; // 기본값
	}
};

// 잔존가치를 계산하는 함수
export const calculateResidualValue = (formData) => {
	if (formData) {
		const { purchaseCost, purchaseDate, usefulLife, depreciationMethod, assetClassification } =
			formData;

		const currentDate = new Date();
		const purchaseDateObj = new Date(purchaseDate);

		// 경과 연수 계산 (일 수 기반)
		const elapsedYears = (currentDate - purchaseDateObj) / (1000 * 60 * 60 * 24 * 365); // 경과 연수 계산

		let residualValue;

		if (depreciationMethod === '정액법') {
			const residualValueRate = getResidualValueRate(assetClassification);

			residualValue = purchaseCost * residualValueRate;
		} else if (depreciationMethod === '정률법') {
			// 내용연수를 감가상각률로 변환
			const depreciationRate = 1 / usefulLife; // 내용연수로 계산된 감가상각률

			residualValue = purchaseCost * Math.pow(1 - depreciationRate, elapsedYears); // 경과연수 동안의 가치
		} else {
			throw new Error('Invalid depreciation method');
		}

		return Math.floor(residualValue); // 소수점 이하를 버리고 정수로 반환
	}
};

// 현재가치를 계산하는 함수
export const calculatePresentValue = (formData) => {
	if (formData) {
		const { purchaseCost, purchaseDate, usefulLife, depreciationMethod, assetClassification } =
			formData;

		const currentDate = new Date();
		const purchaseDateObj = new Date(purchaseDate);

		// 경과 연수 계산 (일 수 기반)
		const elapsedYears = (currentDate - purchaseDateObj) / (1000 * 60 * 60 * 24 * 365); // 경과 연수 계산
		//

		let presentValue;

		if (depreciationMethod === '정액법') {
			const residualValue = purchaseCost * getResidualValueRate(assetClassification);
			const depreciationBase = purchaseCost - residualValue; // 감가상각 대상 금액

			// 연간 감가상각액 계산
			const annualDepreciation = depreciationBase / usefulLife;

			const totalDepreciation = annualDepreciation * elapsedYears;

			presentValue = purchaseCost - totalDepreciation;
			// 경과연수가 내용연수를 초과하면 현재가치를 잔존가치로 대체
			if (elapsedYears >= usefulLife) {
				presentValue = residualValue;
			}
		} else if (depreciationMethod === '정률법') {
			// 내용연수를 감가상각률로 변환
			const depreciationRate = 1 / usefulLife; // 내용연수로 계산된 감가상각률
			presentValue = purchaseCost * Math.pow(1 - depreciationRate, elapsedYears); // 경과연수 동안의 가치
		} else {
			throw new Error('Invalid depreciation method');
		}

		return Math.floor(presentValue); // 소수점 이하를 버리고 정수로 반환
	}
};
const RowDetailCalaulate = {
	getResidualValueRate,
	calculateResidualValue,
	calculatePresentValue,
};
export default RowDetailCalaulate;

const assetLocation = [
	{ value: 'MAIN_1F', label: '본관 1층' },
	{ value: 'MAIN_1F_RECEPTION_ROOM', label: '본관 1층 접견실' },
	{ value: 'MAIN_2F', label: '본관 2층' },
	{ value: 'MAIN_2F_PRESIDENT_OFFICE', label: '본관 2층 사장실' },
	{ value: 'MAIN_2F_RESEARCH_OFFICE', label: '본관 2층 기술연구소 사무실' },
	{ value: 'MAIN_2F_CONFERENCE_ROOM', label: '본관 2층 대회의실' },
	{ value: 'MAIN_2F_CEO_OFFICE', label: '본관 2층 대표이사실' },
	{ value: 'MAIN_3F_STORAGE', label: '본관 3층 창고' },
	{ value: 'MAIN_B1_DOCUMENT_STORAGE', label: '본관 지하 문서고' },
];

const assetType = [
	'A: 정보보호시스템',
	'B: 응용프로그램',
	'C: 소프트웨어',
	'D: 전자정보',
	'E: 문서',
	'F: 특허 및 상표',
	'G: IT 장비 - 시스템',
	'H: IT 장비 – 네트워크',
	'I: 단말기',
	'J: 가구',
	'K: 기기',
	'L: 차량',
	'M: 기타',
];

const assetType2 = [
	'A: 소프트웨어',
	'B: 기타',
	'C: 특허 및 상표',
	'D: 전자정보',
	'E: 정보보호시스템',
	'F: 문서',
	'G: 단말기',
	'H: IT 장비 - 시스템',
	'I: IT 장비 – 네트워크',
	'J: 기기',
	'K: 가구',
	'L: 응용프로그램',
	'M: 차량',
];

const assetTypeNoAlpha = [
	'정보보호시스템',
	'응용프로그램',
	'소프트웨어',
	'전자정보',
	'문서',
	'특허 및 상표',
	'IT장비-시스템',
	'IT 장비–네트워크',
	'단말기',
	'가구',
	'기기',
	'차량',
	'기타',
];

export { assetLocation, assetType, assetType2, assetTypeNoAlpha };

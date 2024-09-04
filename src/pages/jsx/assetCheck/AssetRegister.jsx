import axios from 'axios';
import BasisAssetInfo from './BasisAssetInfo';
import { useState } from 'react';
import FileUpload from './FileUpload';
//import 'bootstrap/dist/css/bootstrap.min.css';

//자산등록
const AssetRegister = () => {
	const [files, setFiles] = useState([]);
	const [formData, setFormData] = useState({
		assetClassification: 'INFORMATION_PROTECTION_SYSTEM',
		assetName: '',
		assetBasis: 'COMMON',
		manufacturingCompany: '',
		purpose: '',
		department: 'IT_DEPARTMENT',
		assetLocation: 'MAIN_B1_DOCUMENT_STORAGE',
		assetUser: '',
		assetOwner: '',
		assetSecurityManager: '',
		quantity: 1,
		ownership: 'OWNED',
		operationStatus: 'OPERATING',
		introducedDate: new Date(),
		confidentiality: 0,
		integrity: 0,
		availability: 0,
		note: '',
		purchaseCost: 0,
		purchaseDate: new Date(),
		usefulLife: 0,
		depreciationMethod: 'FIXED_AMOUNT',
		purchaseSource: '',
		contactInformation: '',
		acquisitionRoute: '',
		maintenancePeriod: new Date(),
		serviceScope: '',
		os: '',
		relatedDB: '',
		ip: '',
		serverId: '',
		serverPassword: '',
		companyManager: '',
		screenNumber: 0,
		system: '',
		DBType: '',
		documentGrade: 'CONFIDENTIAL',
		documentType: 'GENERAL_DOCUMENT',
		documentLink: '',
		applicationDate: new Date(),
		registrationDate: new Date(),
		expirationDate: new Date(),
		patentTrademarkStatus: 'PCT_APPLICATION',
		countryApplication: 'KOREA',
		patentClassification: 'NEW_MATERIALS',
		patentItem: 'COMPOSITE_MATERIALS',
		applicationNo: '',
		inventor: '',
		assignee: '',
		relatedDocuments: '',
		equipmentType: '',
		rackUnit: '',
		powerSupply: '',
		coolingSystem: '',
		interfacePorts: '',
		formFactor: '',
		expansionSlots: '',
		graphicsCard: '',
		portConfiguration: '',
		monitorIncluded: true,
		numberOfPorts: '',
		supportedProtocols: '',
		firmwareVersion: '',
		networkSpeed: '',
		productSerialNumber: '',
		securityControl: 'MONITORING',
		kaitsKeeper: '',
		V3OfficeSecurity: new Date(),
		appCheckPro: new Date(),
		tgate: new Date(),
		furnitureSize: '',
		deviceType: '',
		modelNumber: '',
		connectionType: '',
		powerSpecifications: '',
		displacement: 0,
		doorsCount: 0,
		engineType: 'GASOLINE',
		carType: 'SEDAN',
		identificationNo: '',
		carColor: '',
		modelYear: 0,
		otherDescription: '',
		usageFrequency: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault(); // 페이지 새로고침 방지

		try {
			const assetResponse = await fetch('http://localhost:8080/asset/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData), // JSON으로 변환하여 전송
			});

			if (assetResponse.ok) {
				const assetNo = await assetResponse.text();
				alert('자산이 성공적으로 등록');

				console.log(typeof assetNo);

				if (files.length > 0) {
					const fileFormData = new FormData();
					fileFormData.append('assetNo', assetNo);
					fileFormData.append('file', files[0]);
					console.log(fileFormData.assetNo);

					const fileResponse = await fetch('http://localhost:8080/asset/file/upload', {
						method: 'POST',
						body: fileFormData,
					});

					if (fileResponse.ok) {
						alert('파일이 성공적으로 업로드됨');
					} else {
						alert('파일 업로드 실패');
					}
				}
			} else {
				alert('자산 등록 실패');
			}
		} catch (error) {
			console.error('에러발생 : ', error);
			alert('자산 등록 중 에러가 발생');
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
		console.log('name: ', name);
		console.log('value: ', value);
	};

	return (
		<div>
			<div>
				<BasisAssetInfo formData={formData} handleChange={handleChange} />
			</div>
			<div>
				<FileUpload files={files} setFiles={setFiles} />
			</div>
			<button type="submit" onClick={handleSubmit}>
				저장
			</button>
		</div>
	);
};

export { AssetRegister };

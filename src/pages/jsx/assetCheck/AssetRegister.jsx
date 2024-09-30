import BasisAssetInfo from './BasisAssetInfo';
import { useState } from 'react';
import FileUpload from './FileUpload';
import { Button, Row, Col, Container } from 'react-bootstrap';
import styled from 'styled-components';
const urlConfig = import.meta.env.VITE_BASIC_URL;
const ResponsivePadding = styled.div`
	@media (max-width: 768px) {
		padding-top: 20px;
	}

	@media (min-width: 769px) and (max-width: 1280px) {
		padding: 20px;
	}

	@media (min-width: 1281px) {
		padding: 50px;
	}
`;
//자산등록
const AssetRegister = () => {
	const [files, setFiles] = useState([]);
	const [formData, setFormData] = useState({
		assetClassification: '',
		assetName: '',
		assetBasis: '',
		manufacturingCompany: '',
		purpose: '',
		department: '',
		assetLocation: '',
		assetUser: '',
		assetOwner: '',
		assetSecurityManager: '',
		quantity: 1,
		ownership: '',
		usestate: '',
		operationStatus: '',
		introducedDate: new Date(),
		confidentiality: 0,
		integrity: 0,
		availability: 0,
		note: '',
		purchaseCost: 0,
		purchaseDate: new Date(),
		usefulLife: 0,
		depreciationMethod: '',
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
		documentGrade: '',
		documentType: '',
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
			const assetResponse = await fetch(`${urlConfig}/asset/register`, {
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
					for (let { file, fileType } of files) {
						const fileFormData = new FormData();
						fileFormData.append('assetNo', assetNo);
						fileFormData.append('file', file[0]);
						fileFormData.append('fileType', fileType);
						// console.log(fileFormData.assetNo);
						console.log('fileFormData:', fileFormData.get('file'));
						console.log('assetNo:', fileFormData.get('assetNo'));
						console.log('fileType:', fileFormData.get('fileType'));

						const fileResponse = await fetch(`${urlConfig}/asset/file/upload`, {
							method: 'POST',
							body: fileFormData,
						});

						if (fileResponse.ok) {
							alert('파일이 성공적으로 업로드됨');
						} else {
							alert('파일 업로드 실패');
						}
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
		<Container>
			<Row>
				<Col xs={12} md={8} lg={12}>
					<ResponsivePadding>
						<BasisAssetInfo formData={formData} handleChange={handleChange} />
					</ResponsivePadding>
				</Col>
			</Row>
			<Row>
				<Col xs={12} md={8} lg={12}>
					<ResponsivePadding>
						<FileUpload files={files} setFiles={setFiles} />
					</ResponsivePadding>
				</Col>
			</Row>
			<div className="pt-2 d-flex justify-content-center">
				<Button size="lg" variant="primary" type="submit" onClick={handleSubmit}>
					저장
				</Button>
				<p className="px-2"></p>
				<Button size="lg" variant="secondary" type="button">
					취소
				</Button>
			</div>
		</Container>
	);
};

export { AssetRegister };

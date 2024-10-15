import BasisAssetInfo from './BasisAssetInfo';
import { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import { Button, Row, Col, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AssetCategories from './AssetCategories';
import PurchasingInfo from './PurchasingInfo';
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
	const navigate = useNavigate();
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
		warrantyDetails: '',
		attachment: '',
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
				// setAlertMessage('자산이 등록되었습니다.');
				// setAlertVarient('success');
				// setShowAlert(true);
				Swal.fire({
					icon: 'success',
					title: '자산이 성공적으로 등록되었습니다.',
					text: '자산조회화면으로 이동',
				});
				setTimeout(() => {
					window.location.replace('/jsx/AssetPageTest');
				}, 1000);

				console.log(typeof assetNo);

				if (files.length > 0) {
					for (let { file, fileType } of files) {
						const fileFormData = new FormData();
						fileFormData.append('assetNo', assetNo);
						fileFormData.append('file', file);
						fileFormData.append('fileType', fileType);
						console.log('fileFormData:', fileFormData.get('file'));
						console.log('assetNo:', fileFormData.get('assetNo'));
						console.log('fileType:', fileFormData.get('fileType'));

						const fileResponse = await fetch(`${urlConfig}/asset/file/upload`, {
							method: 'POST',
							body: fileFormData,
						});

						if (!fileResponse.ok) {
							Swal.fire({
								icon: 'error',
								title: '파일 등록에 실패하였습니다.',
								text: '다시 업로드 시도해주세요',
							});
						}
					}
				}
			} else {
				Swal.fire({
					icon: 'error',
					title: '자산 등록을 실패하였습니다.',
					text: '항목을 다시 확인해주세요.',
				});
			}
		} catch (error) {
			console.error('에러발생 : ', error);
			Swal.fire({
				icon: 'error',
				title: '에러가 발생하였습니다.',
				text: error,
			});
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

	useEffect(() => {
		if (formData.contactInformation?.length === 10) {
			setFormData((prevState) => ({
				...prevState,
				contactInformation: formData.contactInformation
					.replace(/[^0-9.]/g, '')
					.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
					.replace(/(-{1,2})$/g, ''),
			}));
		}
		if (formData.contactInformation?.length === 13) {
			setFormData((prevState) => ({
				...prevState,
				contactInformation: formData.contactInformation
					.replace(/[^0-9.]/g, '')
					.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
					.replace(/(-{1,2})$/g, ''),
			}));
		}
	}, [formData.contactInformation]);
	return (
		<>
			<div className="pt-3 px-2">
				<h4 className="header-title">자산 등록</h4>
			</div>
			<Container>
				<Row>
					<ResponsivePadding>
						<Col xs={12} md={8} lg={12}>
							<BasisAssetInfo formData={formData} handleChange={handleChange} />
						</Col>
						<Col className="pt-1" xs={12} md={8} lg={12}>
							<AssetCategories
								formData={formData}
								assetClassification={formData.assetClassification}
								handleChange={handleChange}
								files={files}
								setFiles={setFiles}
							/>
						</Col>
						<Col xs={12} md={8} lg={12}>
							<PurchasingInfo formData={formData} handleChange={handleChange} />
						</Col>
						<Col xs={12} md={8} lg={12}>
							<FileUpload
								formData={formData}
								handleChange={handleChange}
								files={files}
								setFiles={setFiles}
							/>
						</Col>
					</ResponsivePadding>
				</Row>

				<div className="pt-2 d-flex justify-content-center">
					<Button
						style={{ fontSize: 17 }}
						className="btn-rounded"
						variant="dark"
						type="submit"
						onClick={handleSubmit}
					>
						저장
					</Button>
					<p className="px-2"></p>
					<Button
						style={{ fontSize: 17, background: '#acb6bd' }}
						className="btn-rounded"
						variant="secondary"
						type="button"
						onClick={() => {
							navigate('/jsx/AssetPageTest');
						}}
					>
						취소
					</Button>
				</div>
			</Container>
		</>
	);
};

export { AssetRegister };

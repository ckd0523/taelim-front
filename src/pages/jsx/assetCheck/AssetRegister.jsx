import BasisAssetInfo from './BasisAssetInfo';
import { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import { Button, Row, Col, Container, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AssetCategories from './AssetCategories';
import PurchasingInfo from './PurchasingInfo';
import { useFormValidation } from '@/pages/ui/forms/hooks';
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
	const { isValidated, handleSubmit } = useFormValidation();

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
		quantity: '',
		ownership: '',
		usestate: null,
		operationStatus: null,
		introducedDate: null,
		confidentiality: '',
		integrity: '',
		availability: '',
		note: '',
		purchaseCost: 0,
		purchaseDate: null,
		usefulLife: '',
		depreciationMethod: '',
		purchaseSource: '',
		contactInformation: '',
		acquisitionRoute: '',
		maintenancePeriod: null,
		serviceScope: '',
		os: '',
		relatedDB: '',
		ip: '',
		serverId: '',
		serverPassword: '',
		companyManager: '',
		screenNumber: '',
		system: '',
		DBType: '',
		documentGrade: null,
		documentType: null,
		documentLink: '',
		applicationDate: null,
		registrationDate: null,
		expirationDate: null,
		patentTrademarkStatus: '',
		countryApplication: '',
		patentClassification: null,
		patentItem: null,
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
		securityControl: null,
		kaitsKeeper: '',
		V3OfficeSecurity: null,
		appCheckPro: null,
		tgate: null,
		furnitureSize: '',
		deviceType: '',
		modelNumber: '',
		connectionType: '',
		powerSpecifications: '',
		displacement: '',
		doorsCount: '',
		engineType: null,
		carType: null,
		identificationNo: '',
		carColor: '',
		modelYear: '',
		otherDescription: '',
		usageFrequency: '',
		warrantyDetails: '',
		attachment: '',
	});
	const validatedForm = (e) => {
		let validateInput = [];
		console.log(formData.assetClassification);
		switch (formData.assetClassification) {
			case 'INFORMATION_PROTECTION_SYSTEM':
				validateInput = [
					formData.assetBasis,
					formData.assetName,
					formData.purpose,
					formData.department,
					formData.assetLocation,
					formData.quantity,
					formData.ownership,
					formData.usefulLife,
					formData.depreciationMethod,
					formData.maintenancePeriod,
					formData.serviceScope,
				];
				break;
			case 'APPLICATION_PROGRAM':
				validateInput = [
					formData.assetBasis,
					formData.assetName,
					formData.purpose,
					formData.department,
					formData.assetLocation,
					formData.quantity,
					formData.ownership,
					formData.usefulLife,
					formData.depreciationMethod,
					formData.maintenancePeriod,
					formData.serviceScope,
					formData.os,
					formData.ip,
				];
				break;
			case 'SOFTWARE':
				validateInput = [
					formData.assetBasis,
					formData.assetName,
					formData.purpose,
					formData.department,
					formData.assetLocation,
					formData.quantity,
					formData.ownership,
					formData.usefulLife,
					formData.depreciationMethod,
					formData.maintenancePeriod,
					formData.os,
					formData.ip,
					formData.serverPassword,
					formData.serverId,
				];
				break;
			case 'ELECTRONIC_INFORMATION':
				validateInput = [
					formData.assetBasis,
					formData.assetName,
					formData.purpose,
					formData.department,
					formData.assetLocation,
					formData.quantity,
					formData.ownership,
					formData.usefulLife,
					formData.depreciationMethod,
					formData.maintenancePeriod,
					formData.os,
					formData.system,
					formData.DBType,
				];
				break;
			case 'DOCUMENT':
				validateInput = [
					formData.assetBasis,
					formData.assetName,
					formData.purpose,
					formData.department,
					formData.assetLocation,
					formData.quantity,
					formData.ownership,
					formData.usefulLife,
					formData.depreciationMethod,
					formData.maintenancePeriod,
					formData.documentGrade,
					formData.documentType,
					formData.documentLink,
				];
				break;
			case 'PATENTS_AND_TRADEMARKS':
				validateInput = [
					formData.assetBasis,
					formData.assetName,
					formData.purpose,
					formData.department,
					formData.assetLocation,
					formData.quantity,
					formData.ownership,
					formData.usefulLife,
					formData.depreciationMethod,
					formData.maintenancePeriod,
					formData.applicationDate,
					formData.registrationDate,
					formData.patentTrademarkStatus,
					formData.countryApplication,
					formData.applicationNo,
					formData.inventor,
					formData.assignee,
				];
				break;
			case 'ITSYSTEM_EQUIPMENT':
				validateInput = [
					formData.assetBasis,
					formData.assetName,
					formData.purpose,
					formData.department,
					formData.assetLocation,
					formData.quantity,
					formData.ownership,
					formData.usefulLife,
					formData.depreciationMethod,
					formData.maintenancePeriod,
					formData.equipmentType,
				];
				break;
			case 'ITNETWORK_EQUIPMENT':
				validateInput = [
					formData.assetBasis,
					formData.assetName,
					formData.purpose,
					formData.department,
					formData.assetLocation,
					formData.quantity,
					formData.ownership,
					formData.usefulLife,
					formData.depreciationMethod,
					formData.maintenancePeriod,
					formData.equipmentType,
					formData.serviceScope,
				];
				break;
			case 'TERMINAL':
				validateInput = [
					formData.assetBasis,
					formData.assetName,
					formData.purpose,
					formData.department,
					formData.assetLocation,
					formData.quantity,
					formData.ownership,
					formData.usefulLife,
					formData.depreciationMethod,
					formData.maintenancePeriod,
					formData.ip,
					formData.os,
				];
				break;
			case 'devices':
				validateInput = [
					formData.assetBasis,
					formData.assetName,
					formData.purpose,
					formData.department,
					formData.assetLocation,
					formData.quantity,
					formData.ownership,
					formData.usefulLife,
					formData.depreciationMethod,
					formData.maintenancePeriod,
					formData.deviceType,
				];
				break;
			case 'CAR':
				validateInput = [
					formData.assetBasis,
					formData.assetName,
					formData.purpose,
					formData.department,
					formData.assetLocation,
					formData.quantity,
					formData.ownership,
					formData.usefulLife,
					formData.depreciationMethod,
					formData.maintenancePeriod,
					formData.carType,
					formData.identificationNo,
				];
				break;
			default:
				validateInput = [
					formData.assetBasis,
					formData.assetName,
					formData.purpose,
					formData.department,
					formData.assetLocation,
					formData.quantity,
					formData.ownership,
					formData.usefulLife,
					formData.depreciationMethod,
					formData.maintenancePeriod,
				];
		}
		for (let fields of validateInput) {
			if (!fields) {
				return false;
			}
		}
		return true;
	};
	const handleOnSubmit = async (e) => {
		e.preventDefault(); // 페이지 새로고침 방지
		handleSubmit(e);
		// const form = e.target.closest('form');

		// if (!validateInput || form.checkValidity() === false) {
		// 	e.stopPropagation();
		// 	return;
		// }
		if (!validatedForm()) {
			Swal.fire({
				icon: 'error',
				title: '필수 항목을 채워주세요.',
				text: '모든 필수 항목을 채워야 합니다',
			});
			return;
		}
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
				<form noValidate onSubmit={handleOnSubmit}>
					<Row>
						<ResponsivePadding>
							<Col xs={12} md={8} lg={12}>
								<BasisAssetInfo
									isValidated={isValidated}
									formData={formData}
									handleChange={handleChange}
									handleSubmit={handleSubmit}
								/>
							</Col>
							<Col className="pt-1" xs={12} md={8} lg={12}>
								<AssetCategories
									isValidated={isValidated}
									formData={formData}
									assetClassification={formData.assetClassification}
									handleChange={handleChange}
									files={files}
									setFiles={setFiles}
									handleSubmit={handleSubmit}
								/>
							</Col>
							<Col xs={12} md={8} lg={12}>
								<PurchasingInfo
									isValidated={isValidated}
									formData={formData}
									handleChange={handleChange}
									handleSubmit={handleSubmit}
								/>
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
							style={{ background: '#5e83bb', border: 'none', fontSize: 17 }}
							className="btn-rounded"
							variant="dark"
							type="submit"
							// onClick={handleOnSubmit}
							// onClick={handleSubmit}
						>
							저장
						</Button>
						<p className="px-2"></p>
						<Button
							style={{ fontSize: 17 }}
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
				</form>
			</Container>
		</>
	);
};

export { AssetRegister };

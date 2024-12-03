//자산분류별 컬럼
import { Accordion, Card, Row, Col, Form } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap';
import './ButtonStyle.css';
import { TextInput } from '@/components/Form';
import { useForm, FormProvider } from 'react-hook-form';
import { CustomDatePicker } from '@/components/Form';
import { BsCaretUpFill } from 'react-icons/bs';
import { BsCaretDownFill } from 'react-icons/bs';
import Select from 'react-select';
import { useState } from 'react';
import styled from 'styled-components';
const StyledCard = styled.div`
	display: flex;
	flex-direction: column;

	@media (max-width: 767px) {
		width: 100%;
		margin: 0 auto;
		display: flex;
	}

	@media (min-width: 768px) and (max-width: 1023px) {
		width: 100%;
		margin: 0 auto;
		display: flex;
	}

	@media (min-width: 1024px) {
		width: 100%;
		margin: 0 auto;
		display: flex;
	}
`;

const StyledCardBody = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
function CustomToggle({ children, eventKey }) {
	const [isOpen, setIsOpen] = useState(false);
	const decoratedOnClick = useAccordionButton(eventKey, () => setIsOpen((prevOpen) => !prevOpen));
	return (
		<button
			className="custom-button px-3 pt-2 fw-bold"
			type="button"
			style={{ backgroundColor: '#6081ab4e', textAlign: 'left' }}
			onClick={decoratedOnClick}
		>
			{isOpen ? (
				<BsCaretUpFill style={{ paddingRight: '10' }} size="30" color="#2222226b" />
			) : (
				<BsCaretDownFill style={{ paddingRight: '10' }} size="30" color="#2222226b" />
			)}
			{children}
		</button>
	);
}
const documentGrade = [
	{ value: 'CONFIDENTIAL', label: '대외비' },
	{ value: 'INTERNAL', label: '내부용' },
	{ value: 'PUBLIC', label: '일반' },
];
const documentType = [
	{ value: 'GENERAL_DOCUMENT', label: '일반문서' },
	{
		value: 'CONTRACTS_AND_LEGAL_DOCUMENTS',
		label: '계약 및 법적문서',
	},
	{
		value: 'REPORTS_AND_PRESENTATIONS',
		label: '보고서 및 프레젠테이션',
	},
	{
		value: 'FORMS_AND_TEMPLATES',
		label: '양식 및 서식',
	},
];
const patentTrademarkStatus = [
	{ value: 'PCT_APPLICATION', label: 'PCT 출원' },
	{
		value: 'APPLICATION',
		label: '출원',
	},
	{
		value: 'REGISTERED',
		label: '등록',
	},
	{
		value: 'EXPIRED',
		label: '만료',
	},
];
const countryApplication = [
	{ value: 'KOREA', label: '한국' },
	{
		value: 'USA',
		label: '미국',
	},
	{
		value: 'JAPAN',
		label: '일본',
	},
	{
		value: 'CHINA',
		label: '중국',
	},
	{
		value: 'GERMANY',
		label: '독일',
	},
];
const patentClassification = [
	{ value: 'NEW_MATERIALS', label: '신소재' },
	{
		value: 'INCUBATION',
		label: '인큐베이션',
	},
];
const patentItem = [
	{ value: 'COMPOSITE_MATERIALS', label: '복합재' },
	{
		value: 'CORPORATE_VENTURE',
		label: '신소재',
	},
];
const securityControl = [
	{ value: 'MONITORING', label: '관제중' },
	{
		value: 'ANOMALY_DETECTED',
		label: '이상감지',
	},
	{
		value: 'MONITORING_COMPLETED',
		label: '관제완료',
	},
];
const engineType = [
	{ value: 'GASOLINE', label: '가솔린' },
	{ value: 'DIESEL', label: '디젤' },
	{ value: 'HYBRID', label: '하이브리드' },
	{ value: 'ELECTRIC', label: '전기' },
];
const carType = [
	{ value: 'SEDAN', label: '승용차' },
	{ value: 'SUV', label: 'SUV' },
	{ value: 'TRUCK', label: '트럭' },
	{ value: 'VAN', label: '밴' },
];

const AssetCategories = ({
	isValidated,
	handleSubmit,
	files = [],
	setFiles,
	assetClassification,
	formData,
	handleChange,
}) => {
	const handleFileUpload = (e, fileType) => {
		const uploadFile = e.target.files[0];
		const updateFiles = [
			...files.filter((f) => f.fileType !== fileType),
			{ file: uploadFile, fileType },
		];
		setFiles(updateFiles);
		console.log(updateFiles);
	};

	const methods = useForm({
		defaultValues: formData,
		mode: 'onBlur',
	});

	const { handleSubmit: reactHookHandleSubmit } = methods;
	const onSubmit = (data) => {
		handleSubmit(data);
	};
	const renderAdditionalFields = () => {
		switch (assetClassification) {
			case 'INFORMATION_PROTECTION_SYSTEM':
				return (
					<div style={{ paddingBottom: '20px' }}>
						<Accordion defaultActiveKey="0">
							<StyledCard className="card">
								<CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
								<Accordion.Collapse eventKey="0">
									<FormProvider {...methods}>
										<Form
											validated={isValidated}
											onSubmit={reactHookHandleSubmit(onSubmit)}
										>
											<StyledCardBody className="card-body">
												<Row className="px-4">
													<Col lg={5}>
														<Form.Label>서비스범위</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="서비스범위를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.serviceScope}
															onChange={handleChange}
															name="serviceScope"
														/>
													</Col>
												</Row>
											</StyledCardBody>
										</Form>
									</FormProvider>
								</Accordion.Collapse>
							</StyledCard>
						</Accordion>
					</div>
				);

			case 'APPLICATION_PROGRAM':
				return (
					<div style={{ paddingBottom: '20px' }}>
						<Accordion defaultActiveKey="0">
							<StyledCard className="card">
								<CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
								<Accordion.Collapse eventKey="0">
									<FormProvider {...methods}>
										<Form
											validated={isValidated}
											onSubmit={reactHookHandleSubmit(onSubmit)}
										>
											<StyledCardBody className="card-body">
												<Row className="justify-content-md-center">
													<Col lg={5}>
														<Form.Label>서비스범위</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="서비스범위를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.serviceScope}
															onChange={handleChange}
															name="serviceScope"
														/>
														<Form.Label>사용 OS</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="OS를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.os}
															onChange={handleChange}
															name="os"
														/>
														<Form.Label>관련DB</Form.Label>
														<Form.Control
															placeholder="관련DB를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.relatedDB}
															onChange={handleChange}
															name="relatedDB"
														/>
													</Col>
													<Col
														lg={1}
														className="d-flex align-items-stretch"
													>
														<div className="vertical-divider"></div>
													</Col>
													<Col lg={5}>
														<Form.Label>IP</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="IP를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.ip}
															onChange={handleChange}
															name="ip"
														/>
														<Form.Label>화면수</Form.Label>
														<Form.Control
															placeholder="화면수를 입력해주세요"
															className="mb-2"
															type="number"
															value={formData.screenNumber}
															onChange={handleChange}
															name="screenNumber"
														/>
													</Col>
												</Row>
											</StyledCardBody>
										</Form>
									</FormProvider>
								</Accordion.Collapse>
							</StyledCard>
						</Accordion>
					</div>
				);
			case 'SOFTWARE':
				return (
					<div style={{ paddingBottom: '20px' }}>
						<Accordion defaultActiveKey="0">
							<StyledCard className="card">
								<CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
								<Accordion.Collapse eventKey="0">
									<FormProvider {...methods}>
										<Form
											validated={isValidated}
											onSubmit={reactHookHandleSubmit(onSubmit)}
										>
											<StyledCardBody className="card-body">
												<Row className="justify-content-md-center">
													<Col lg={5}>
														<Form.Label>IP</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="IP를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.ip}
															onChange={handleChange}
															name="ip"
														/>
														<Form.Label>ID</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="ID를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.serverId}
															onChange={handleChange}
															name="serverId"
														/>
														<Form.Label>PW</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="PW를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.serverPassword}
															onChange={handleChange}
															name="serverPassword"
														/>
													</Col>
													<Col
														lg={1}
														className="d-flex align-items-stretch"
													>
														<div className="vertical-divider"></div>
													</Col>
													<Col lg={5}>
														<Form.Label>담당업체</Form.Label>
														<Form.Control
															placeholder="담당업체를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.companyManager}
															onChange={handleChange}
															name="companyManager"
														/>
														<Form.Label>사용 OS</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="사용 OS를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.os}
															onChange={handleChange}
															name="os"
														/>
													</Col>
												</Row>
											</StyledCardBody>
										</Form>
									</FormProvider>
								</Accordion.Collapse>
							</StyledCard>
						</Accordion>
					</div>
				);
			case 'ELECTRONIC_INFORMATION':
				return (
					<div style={{ paddingBottom: '20px' }}>
						<Accordion defaultActiveKey="0">
							<StyledCard className="card">
								<CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
								<Accordion.Collapse eventKey="0">
									<FormProvider {...methods}>
										<Form
											validated={isValidated}
											onSubmit={reactHookHandleSubmit(onSubmit)}
										>
											<StyledCardBody className="card-body">
												<Row className="justify-content-md-center">
													<Col lg={5}>
														<Form.Label>사용 OS</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="사용 OS를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.os}
															onChange={handleChange}
															name="os"
														/>
														<Form.Label>시스템</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="시스템을 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.system}
															onChange={handleChange}
															name="system"
														/>
													</Col>
													<Col
														lg={1}
														className="d-flex align-items-stretch"
													>
														<div className="vertical-divider"></div>
													</Col>
													<Col lg={5}>
														<Form.Label>DB종류</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="DB종류를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.dbtype}
															onChange={handleChange}
															name="dbtype"
														/>
													</Col>
												</Row>
											</StyledCardBody>
										</Form>
									</FormProvider>
								</Accordion.Collapse>
							</StyledCard>
						</Accordion>
					</div>
				);
			case 'DOCUMENT':
				return (
					<div style={{ paddingBottom: '20px' }}>
						<Accordion defaultActiveKey="0">
							<StyledCard className="card">
								<CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
								<Accordion.Collapse eventKey="0">
									<FormProvider {...methods}>
										<Form
											validated={isValidated}
											onSubmit={reactHookHandleSubmit(onSubmit)}
										>
											<StyledCardBody className="card-body">
												<Row className="justify-content-md-center">
													<Col lg={5}>
														<Form.Label className="mb-2 c fw-bold">
															문서등급
														</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Select
															required
															className="mb-3"
															placeholder="문서등급을 선택해주세요"
															name="documentGrade"
															value={formData.documentGrade || ''}
															onChange={(selectedOption) =>
																handleChange({
																	target: {
																		name: 'documentGrade',
																		value:
																			selectedOption.target
																				.value === ''
																				? null
																				: selectedOption
																						.target
																						.value,
																	},
																})
															}
														>
															<option value="" disabled>
																문서등급을 선택해주세요.
															</option>
															{documentGrade.map((option) => (
																<option
																	key={option.value}
																	value={option.value}
																>
																	{option.label}
																</option>
															))}
														</Form.Select>
														<Form.Label className="mb-2 c fw-bold">
															문서형태
														</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Select
															required
															className="mb-3"
															placeholder="문서형태 선택해주세요"
															name="documentType"
															value={formData.documentType}
															onChange={(selectedOption) =>
																handleChange({
																	target: {
																		name: 'documentType',
																		value: selectedOption.target
																			.value,
																	},
																})
															}
														>
															<option value="" disabled>
																문서형태 선택해주세요
															</option>
															{documentType.map((option) => (
																<option
																	key={option.value}
																	value={option.value}
																>
																	{option.label}
																</option>
															))}
														</Form.Select>
													</Col>
													<Col
														lg={1}
														className="d-flex align-items-stretch"
													>
														<div className="vertical-divider"></div>
													</Col>
													<Col lg={5}>
														<Form.Label>문서링크</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="문서링크를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.documentLink}
															onChange={handleChange}
															name="documentLink"
														/>
													</Col>
												</Row>
											</StyledCardBody>
										</Form>
									</FormProvider>
								</Accordion.Collapse>
							</StyledCard>
						</Accordion>
					</div>
				);
			case 'PATENTS_AND_TRADEMARKS':
				return (
					<div style={{ paddingBottom: '20px' }}>
						<Accordion defaultActiveKey="0">
							<StyledCard className="card">
								<CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
								<Accordion.Collapse eventKey="0">
									<FormProvider {...methods}>
										<Form
											validated={isValidated}
											onSubmit={reactHookHandleSubmit(onSubmit)}
										>
											<StyledCardBody className="card-body">
												<Row className="justify-content-md-center">
													<Col lg={5}>
														<div className="form-group mb-2">
															<Form.Label className="form-label">
																출원일자
															</Form.Label>
															<Form.Label className="text-danger">
																＊
															</Form.Label>
															<br />
															<Form.Control
																required
																type="date"
																name="applicationDate"
																value={
																	formData.applicationDate || ''
																}
																onChange={(date) =>
																	handleChange({
																		target: {
																			name: 'applicationDate',
																			value: date.target.value
																				? date.target.value
																				: null,
																		},
																	})
																}
															/>
														</div>
														<div className="form-group mb-2">
															<Form.Label className="form-label">
																등록일자
															</Form.Label>
															<Form.Label className="text-danger">
																＊
															</Form.Label>
															<Form.Control
																required
																type="date"
																name="registrationDate"
																value={
																	formData.registrationDate || ''
																}
																onChange={(date) =>
																	handleChange({
																		target: {
																			name: 'registrationDate',
																			value: date.target.value
																				? date.target.value
																				: null,
																		},
																	})
																}
															/>
														</div>
														<div className="form-group mb-2">
															<Form.Label className="form-label">
																만료일자
															</Form.Label>
															<Form.Control
																type="date"
																name="expirationDate"
																value={
																	formData.expirationDate || ''
																}
																onChange={(date) =>
																	handleChange({
																		target: {
																			name: 'expirationDate',
																			value: date.target.value
																				? date.target.value
																				: null,
																		},
																	})
																}
															/>
														</div>
														<Form.Label className="mb-2 c fw-bold">
															특허/상표 상태
														</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Select
															required
															className="mb-2"
															placeholder="특허/상표 상태를 선택해주세요"
															name="patentTrademarkStatus"
															value={formData.patentTrademarkStatus}
															onChange={(selectedOption) =>
																handleChange({
																	target: {
																		name: 'patentTrademarkStatus',
																		value: selectedOption.target
																			.value,
																	},
																})
															}
														>
															<option value="" disabled>
																특허/상표 상태를 선택해주세요.
															</option>
															{patentTrademarkStatus.map((option) => (
																<option
																	value={option.value}
																	key={option.value}
																>
																	{option.label}
																</option>
															))}
														</Form.Select>
														<Form.Label className="mb-2 c fw-bold">
															출원국가
														</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Select
															required
															className="mb-2"
															placeholder="출원국가를 선택해주세요"
															name="countryApplication"
															value={formData.countryApplication}
															onChange={(selectedOption) =>
																handleChange({
																	target: {
																		name: 'countryApplication',
																		value: selectedOption.target
																			.value,
																	},
																})
															}
														>
															<option value="" disabled>
																출원국가를 선택해주세요.
															</option>
															{countryApplication.map((option) => (
																<option
																	value={option.value}
																	key={option.value}
																>
																	{option.label}
																</option>
															))}
														</Form.Select>
														<Form.Label className="mb-2 c fw-bold">
															특허분류
														</Form.Label>
														<Form.Select
															required
															className="mb-2"
															placeholder="특허분류를 선택해주세요"
															name="patentClassification"
															value={
																formData.patentClassification || ''
															}
															onChange={(selectedOption) =>
																handleChange({
																	target: {
																		name: 'patentClassification',
																		value:
																			selectedOption.target
																				.value === ''
																				? null
																				: selectedOption
																						.target
																						.value,
																	},
																})
															}
														>
															<option value="" disabled>
																특허분류를 선택해주세요.
															</option>
															{patentClassification.map((option) => (
																<option
																	value={option.value}
																	key={option.value}
																>
																	{option.label}
																</option>
															))}
														</Form.Select>
													</Col>
													<Col
														lg={1}
														className="d-flex align-items-stretch"
													>
														<div className="vertical-divider"></div>
													</Col>
													<Col lg={5}>
														<Form.Label className="mb-2 c fw-bold">
															특허세목
														</Form.Label>
														<Form.Select
															className="mb-2"
															placeholder="특허세목을 선택해주세요"
															name="patentItem"
															value={formData.patentItem || ''}
															onChange={(selectedOption) =>
																handleChange({
																	target: {
																		name: 'patentItem',
																		value:
																			selectedOption.target
																				.value === ''
																				? null
																				: selectedOption
																						.target
																						.value,
																	},
																})
															}
														>
															<option value="" disabled>
																특허세목을 선택해주세요.
															</option>
															{patentItem.map((option) => (
																<option
																	value={option.value}
																	key={option.value}
																>
																	{option.label}
																</option>
															))}
														</Form.Select>
														<Form.Label>출원번호</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="출원번호를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.applicationNo}
															onChange={handleChange}
															name="applicationNo"
														/>
														<Form.Label>발명자</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="발명자를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.inventor}
															onChange={handleChange}
															name="inventor"
														/>
														<Form.Label>권리권자</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="권리권자를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.assignee}
															onChange={handleChange}
															name="assignee"
														/>
														<Form.Label>관련문서</Form.Label>
														<Form.Control
															type="file"
															onChange={(file) =>
																handleFileUpload(
																	file,
																	'PATENT_DOCUMENTS'
																)
															}
														/>
													</Col>
												</Row>
											</StyledCardBody>
										</Form>
									</FormProvider>
								</Accordion.Collapse>
							</StyledCard>
						</Accordion>
					</div>
				);
			case 'ITSYSTEM_EQUIPMENT':
				return (
					<div style={{ paddingBottom: '20px' }}>
						<Accordion defaultActiveKey="0">
							<StyledCard className="card">
								<CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
								<Accordion.Collapse eventKey="0">
									<FormProvider {...methods}>
										<Form
											validated={isValidated}
											onSubmit={reactHookHandleSubmit(onSubmit)}
										>
											<StyledCardBody className="card-body">
												<Row className="justify-content-md-center">
													<Col lg={5}>
														<Form.Label>장비유형</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="장비유형을 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.equipmentType}
															onChange={handleChange}
															name="equipmentType"
														/>
														<Form.Label>랙유닛</Form.Label>
														<Form.Control
															placeholder="랙유닛을 입력해주세요"
															className="mb-2"
															type="number"
															value={formData.rackUnit}
															onChange={handleChange}
															name="rackUnit"
														/>
														<Form.Label>전원공급장치</Form.Label>
														<Form.Control
															placeholder="전원공급장치를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.powerSupply}
															onChange={handleChange}
															name="powerSupply"
														/>
														<Form.Label>쿨링시스템</Form.Label>
														<Form.Control
															placeholder="쿨링시스템을 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.coolingSystem}
															onChange={handleChange}
															name="coolingSystem"
														/>
														<Form.Label>인터페이스 포트</Form.Label>
														<Form.Control
															placeholder="인터페이스 포트를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.interfacePorts}
															onChange={handleChange}
															name="interfacePorts"
														/>
													</Col>
													<Col
														lg={1}
														className="d-flex align-items-stretch"
													>
														<div className="vertical-divider"></div>
													</Col>
													<Col lg={5}>
														<Form.Label>폼팩터</Form.Label>
														<Form.Control
															placeholder="폼팩터를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.formFactor}
															onChange={handleChange}
															name="formFactor"
														/>
														<Form.Label>확장슬롯수</Form.Label>
														<Form.Control
															placeholder="확장슬롯수를 입력해주세요"
															className="mb-2"
															type="number"
															value={formData.expansionSlots}
															onChange={handleChange}
															name="expansionSlots"
														/>
														<Form.Label>그래픽카드</Form.Label>
														<Form.Control
															placeholder="그래픽카드를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.graphicsCard}
															onChange={handleChange}
															name="graphicsCard"
														/>
														<Form.Label>포트 구성</Form.Label>
														<Form.Control
															placeholder="포트 구성을 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.portConfiguration}
															onChange={handleChange}
															name="portConfiguration"
														/>
														<Form.Group className="mt-2">
															<Form.Label className="form-label">
																모니터 포함여부
															</Form.Label>
															<div>
																<Form.Check
																	label="포함"
																	type="radio"
																	name="monitorIncluded"
																	// containerClass={"form-check-inline"}
																	value="true"
																	checked={
																		formData.monitorIncluded ===
																		true
																	}
																	onChange={(e) =>
																		handleChange({
																			target: {
																				name: 'monitorIncluded',
																				value:
																					e.target
																						.value ===
																					'true',
																			},
																		})
																	}
																/>
																<Form.Check
																	label="미포함"
																	type="radio"
																	name="monitorIncluded"
																	// containerClass={"form-check-inline"}
																	value="false"
																	checked={
																		formData.monitorIncluded ===
																		false
																	}
																	onChange={(e) =>
																		handleChange({
																			target: {
																				name: 'monitorIncluded',
																				value:
																					e.target
																						.value ===
																					'true',
																			},
																		})
																	}
																/>
															</div>
														</Form.Group>
													</Col>
												</Row>
											</StyledCardBody>
										</Form>
									</FormProvider>
								</Accordion.Collapse>
							</StyledCard>
						</Accordion>
					</div>
				);
			case 'ITNETWORK_EQUIPMENT':
				return (
					<div style={{ paddingBottom: '20px' }}>
						<Accordion defaultActiveKey="0">
							<StyledCard className="card">
								<CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
								<Accordion.Collapse eventKey="0">
									<FormProvider {...methods}>
										<Form
											validated={isValidated}
											onSubmit={reactHookHandleSubmit(onSubmit)}
										>
											<StyledCardBody className="card-body">
												<Row className="justify-content-md-center">
													<Col lg={5}>
														<Form.Label>장비유형</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="장비유형을 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.equipmentType}
															onChange={handleChange}
															name="equipmentType"
														/>
														<Form.Label>포트수</Form.Label>
														<Form.Control
															placeholder="포트수를 입력해주세요"
															className="mb-2"
															type="number"
															value={formData.numberOfPorts}
															onChange={handleChange}
															name="numberOfPorts"
														/>
														<Form.Label>지원프로토콜</Form.Label>
														<Form.Control
															placeholder="지원프로토콜을 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.supportedProtocols}
															onChange={handleChange}
															name="supportedProtocols"
														/>
														<Form.Label>펌웨어 버전</Form.Label>
														<Form.Control
															placeholder="펌웨어 버전을 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.firmwareVersion}
															onChange={handleChange}
															name="firmwareVersion"
														/>
													</Col>
													<Col
														lg={1}
														className="d-flex align-items-stretch"
													>
														<div className="vertical-divider"></div>
													</Col>
													<Col lg={5}>
														<Form.Label>네트워크 속도</Form.Label>
														<Form.Control
															placeholder="네트워크 속도를 입력해주세요"
															className="mb-2"
															type="number"
															value={formData.networkSpeed}
															onChange={handleChange}
															name="networkSpeed"
														/>
														<Form.Label>서비스범위</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="서비스범위를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.serviceScope}
															onChange={handleChange}
															name="serviceScope"
														/>
													</Col>
												</Row>
											</StyledCardBody>
										</Form>
									</FormProvider>
								</Accordion.Collapse>
							</StyledCard>
						</Accordion>
					</div>
				);
			case 'TERMINAL':
				return (
					<div style={{ paddingBottom: '20px' }}>
						<Accordion defaultActiveKey="0">
							<StyledCard className="card">
								<CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
								<Accordion.Collapse eventKey="0">
									<FormProvider {...methods}>
										<Form
											validated={isValidated}
											onSubmit={reactHookHandleSubmit(onSubmit)}
										>
											<StyledCardBody className="card-body">
												<Row className="justify-content-md-center">
													<Col lg={5}>
														<Form.Label>IP</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="IP를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.ip}
															onChange={handleChange}
															name="ip"
														/>
														<Form.Label>OS</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="OS를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.os}
															onChange={handleChange}
															name="os"
														/>
														<p className="mb-2 c fw-bold">보안관제</p>
														<Form.Select
															className="mb-2"
															placeholder="보안관제를 선택해주세요"
															name="securityControl"
															value={formData.securityControl || ''}
															onChange={(selectedOption) =>
																handleChange({
																	target: {
																		name: 'securityControl',
																		value:
																			selectedOption.target
																				.value === ''
																				? null
																				: selectedOption
																						.target
																						.value,
																	},
																})
															}
															options={securityControl}
														>
															<option value="" disabled>
																보안관제를 선택해주세요.
															</option>
															{securityControl.map((option) => (
																<option
																	value={option.value}
																	key={option.value}
																>
																	{option.label}
																</option>
															))}
														</Form.Select>
														<Form.Label>내부정보 유출 방지</Form.Label>
														<Form.Control
															placeholder="내부정보 유출 방지를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.kaitsKeeper}
															onChange={handleChange}
															name="kaitsKeeper"
														/>
													</Col>
													<Col
														lg={1}
														className="d-flex align-items-stretch"
													>
														<div className="vertical-divider"></div>
													</Col>
													<Col lg={5}>
														<div className="form-group mb-2">
															<Form.Label className="form-label">
																악성코드,랜섬웨어 탐지
															</Form.Label>
															<Form.Control
																type="date"
																name="V3OfficeSecurity"
																value={
																	formData.V3OfficeSecurity || ''
																}
																onChange={(date) =>
																	handleChange({
																		target: {
																			name: 'V3OfficeSecurity',
																			value: date.target.value
																				? date.target.value
																				: null,
																		},
																	})
																}
															/>
														</div>
														<div className="form-group mb-2">
															<Form.Label className="form-label">
																안티랜섬웨어
															</Form.Label>
															<Form.Control
																type="date"
																name="appCheckPro"
																value={formData.appCheckPro || ''}
																onChange={(date) =>
																	handleChange({
																		target: {
																			name: 'appCheckPro',
																			value: date.target.value
																				? date.target.value
																				: null,
																		},
																	})
																}
															/>
														</div>
														<div className="form-group mb-3">
															<Form.Label className="form-label">
																NAC agent
															</Form.Label>
															<Form.Control
																type="date"
																name="tgate"
																value={formData.tgate || ''}
																onChange={(date) =>
																	handleChange({
																		target: {
																			name: 'tgate',
																			value: date.target.value
																				? date.target.value
																				: null,
																		},
																	})
																}
															/>
														</div>
													</Col>
												</Row>
											</StyledCardBody>
										</Form>
									</FormProvider>
								</Accordion.Collapse>
							</StyledCard>
						</Accordion>
					</div>
				);
			case 'FURNITURE':
				return (
					<div style={{ paddingBottom: '20px' }}>
						<Accordion defaultActiveKey="0">
							<StyledCard className="card">
								<CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
								<Accordion.Collapse eventKey="0">
									<FormProvider {...methods}>
										<StyledCardBody className="card-body">
											<Row className="justify-content-md-center">
												<Col lg={5}>
													<Form.Label>크기</Form.Label>
													<Form.Control
														placeholder="크기를 입력해주세요"
														className="mb-2"
														type="text"
														value={formData.furnitureSize}
														onChange={handleChange}
														name="furnitureSize"
													/>
												</Col>
												<Col lg={1}></Col>
												<Col lg={5}></Col>
											</Row>
										</StyledCardBody>
									</FormProvider>
								</Accordion.Collapse>
							</StyledCard>
						</Accordion>
					</div>
				);
			case 'DEVICES':
				return (
					<div style={{ paddingBottom: '20px' }}>
						<Accordion defaultActiveKey="0">
							<StyledCard className="card">
								<CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
								<Accordion.Collapse eventKey="0">
									<FormProvider {...methods}>
										<Form
											validated={isValidated}
											onSubmit={reactHookHandleSubmit(onSubmit)}
										>
											<StyledCardBody className="card-body">
												<Row className="justify-content-md-center">
													<Col lg={5}>
														<Form.Label>기기유형</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															required
															placeholder="기기유형을 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.deviceType}
															onChange={handleChange}
															name="deviceType"
														/>
														<Form.Label>모델번호</Form.Label>
														<Form.Control
															placeholder="모델번호를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.modelNumber}
															onChange={handleChange}
															name="modelNumber"
														/>
													</Col>
													<Col
														lg={1}
														className="d-flex align-items-stretch"
													>
														<div className="vertical-divider"></div>
													</Col>
													<Col lg={5}>
														<Form.Label>연결방식</Form.Label>
														<Form.Control
															placeholder="연결방식을 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.connectionType}
															onChange={handleChange}
															name="connectionType"
														/>
														<Form.Label>전원사양</Form.Label>
														<Form.Control
															placeholder="전원사양을 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.powerSpecifications}
															onChange={handleChange}
															name="powerSpecifications"
														/>
													</Col>
												</Row>
											</StyledCardBody>
										</Form>
									</FormProvider>
								</Accordion.Collapse>
							</StyledCard>
						</Accordion>
					</div>
				);
			case 'CAR':
				return (
					<div style={{ paddingBottom: '20px' }}>
						<Accordion defaultActiveKey="0">
							<StyledCard className="card">
								<CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
								<Accordion.Collapse eventKey="0">
									<FormProvider {...methods}>
										<Form
											validated={isValidated}
											onSubmit={reactHookHandleSubmit(onSubmit)}
										>
											<StyledCardBody className="card-body">
												<Row className="justify-content-md-center">
													<Col lg={5}>
														<Form.Label>배기량</Form.Label>
														<Form.Control
															placeholder="배기량을 입력해주세요"
															className="mb-2"
															type="number"
															value={formData.displacement}
															onChange={handleChange}
															name="displacement"
														/>
														<Form.Label>차량의 문 수</Form.Label>
														<Form.Control
															placeholder="차량의 문 수를 입력해주세요"
															className="mb-2"
															type="number"
															value={formData.doorsCount}
															onChange={handleChange}
															name="doorsCount"
														/>
														<Form.Label className="mb-2 c fw-bold">
															엔진 형식
														</Form.Label>
														<Form.Select
															className="mb-3"
															placeholder="엔진 형식을 선택해주세요"
															name="engineType"
															value={formData.engineType || ''}
															onChange={(selectedOption) =>
																handleChange({
																	target: {
																		name: 'engineType',
																		value:
																			selectedOption.target
																				.value === ''
																				? null
																				: selectedOption
																						.target
																						.value,
																	},
																})
															}
														>
															<option value="" disabled>
																엔진 형식을 선택해주세요
															</option>
															{engineType.map((option) => (
																<option
																	value={option.value}
																	key={option.value}
																>
																	{option.label}
																</option>
															))}
														</Form.Select>
														<Form.Label className="mb-2 c fw-bold">
															차량 종류
														</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Select
															required
															className="mb-3"
															placeholder="차량 종류를 선택해주세요"
															name="carType"
															value={formData.carType || ''}
															onChange={(selectedOption) =>
																handleChange({
																	target: {
																		name: 'carType',
																		value: selectedOption.target
																			.value,
																	},
																})
															}
														>
															<option value="" disabled>
																차량 종류를 선택해주세요
															</option>
															{carType.map((option) => (
																<option
																	value={option.value}
																	key={option.value}
																>
																	{option.label}
																</option>
															))}
														</Form.Select>
													</Col>
													<Col
														lg={1}
														className="d-flex align-items-stretch"
													>
														<div className="vertical-divider"></div>
													</Col>
													<Col lg={5}>
														<Form.Label>차량 식별번호</Form.Label>
														<Form.Label className="text-danger">
															＊
														</Form.Label>
														<Form.Control
															placeholder="차량 식별번호를 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.identificationNo}
															onChange={handleChange}
															name="identificationNo"
														/>
														<Form.Label>차량 색상</Form.Label>
														<Form.Control
															placeholder="차량 색상을 입력해주세요"
															className="mb-2"
															type="text"
															value={formData.carColor}
															onChange={handleChange}
															name="carColor"
														/>
														<Form.Label>연식</Form.Label>
														<Form.Control
															placeholder="연식을 입력해주세요"
															className="mb-2"
															type="number"
															value={formData.modelYear}
															onChange={handleChange}
															name="modelYear"
														/>
													</Col>
												</Row>
											</StyledCardBody>
										</Form>
									</FormProvider>
								</Accordion.Collapse>
							</StyledCard>
						</Accordion>
					</div>
				);
			case 'OTHERASSETS':
				return (
					<div style={{ paddingBottom: '20px' }}>
						<Accordion defaultActiveKey="0">
							<StyledCard className="card">
								<CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
								<Accordion.Collapse eventKey="0">
									<FormProvider {...methods}>
										<StyledCardBody className="card-body">
											<Row className="justify-content-md-center">
												<Col lg={5}>
													<Form.Label>기타 세부 설명</Form.Label>
													<Form.Control
														placeholder="기타 세부 설명을 입력해주세요"
														className="mb-2"
														type="text"
														value={formData.otherDescription}
														onChange={handleChange}
														name="otherDescription"
													/>
												</Col>
												<Col lg={1} className="d-flex align-items-stretch">
													<div className="vertical-divider"></div>
												</Col>
												<Col lg={5}>
													<Form.Label>사용 빈도</Form.Label>
													<Form.Control
														placeholder="사용 빈도를 입력해주세요"
														className="mb-2"
														type="text"
														value={formData.usageFrequency}
														onChange={handleChange}
														name="usageFrequency"
													/>
												</Col>
											</Row>
										</StyledCardBody>
									</FormProvider>
								</Accordion.Collapse>
							</StyledCard>
						</Accordion>
					</div>
				);

			default:
				return null;
		}
	};

	return <>{renderAdditionalFields()}</>;
};
export default AssetCategories;

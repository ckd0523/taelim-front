//기본 자산 정보
import AssetCategories from './AssetCategories';
import { useAccordionButton } from 'react-bootstrap';

import PurchasingInfo from './PurchasingInfo';
import './ButtonStyle.css';
import { Row, Col, Card, Accordion } from 'react-bootstrap';

import { TextInput, TextAreaInput } from '@/components/Form';
import { useForm, FormProvider } from 'react-hook-form';
import { CustomDatePicker } from '@/components/Form';

import Select from 'react-select';
// import { Typehead } from "react-bootstrap-typeahead";
// import { values } from "regenerator-runtime";

function CustomToggle({ children, eventKey }) {
	const decoratedOnClick = useAccordionButton(eventKey, () => console.log('totally custom'));
	return (
		<button
			className="custom-button"
			type="button"
			style={{ backgroundColor: 'white' }}
			onClick={decoratedOnClick}
		>
			{children}
		</button>
	);
}

const assetClassification = [
	{
		value: 'INFORMATION_PROTECTION_SYSTEM',
		label: '정보보호시스템',
	},
	{ value: 'APPLICATION_PROGRAM', label: '응용프로그램' },
	{ value: 'SOFTWARE', label: '소프트웨어' },
	{ value: 'ELECTRONIC_INFORMATION', label: '전자정보' },
	{ value: 'DOCUMENT', label: '문서' },
	{ value: 'PATENTS_AND_TRADEMARKS', label: '특허 및 상표' },
	{ value: 'ITSYSTEM_EQUIPMENT', label: 'IT장비-시스템' },
	{ value: 'ITNETWORK_EQUIPMENT', label: 'IT장비-네트워크' },
	{ value: 'TERMINAL', label: '단말기' },
	{ value: 'FURNITURE', label: '가구' },
	{ value: 'DEVICES', label: '기기' },
	{ value: 'CAR', label: '차량' },
	{ value: 'OTHERASSETS', label: '기타' },
];
const assetBasis = [
	{ value: '일반', label: '일반' },
	{ value: 'TISAX', label: 'TISAX' },
];
const department = [
	{ value: 'IT부', label: 'IT부' },
	{
		value: 'ADMINISTRATIVE_DEPARTMENT',
		label: '관리부',
	},
	{ value: 'SALES_DEPARTMENT', label: '영업부' },
	{ value: 'MARKETING_DEPARTMENT', label: '마케팅부' },
	{ value: 'PRODUCTION_DEPARTMENT', label: '생산부' },
	{ value: 'OPERATIONS_DEPARTMENT', label: '운영부' },
	{
		value: 'HUMAN_RESOURCES_DEPARTMENT',
		label: '인사부',
	},
];
const assetLocation = [
	{
		value: '본관 지하 문서고',
		label: '본관 지하 문서고',
	},
	{ value: '본관 1층', label: '본관 1층' },
	{
		value: '본관 1층 접견실',
		label: '본관 1층 접견실',
	},
	{ value: '본관 2층', label: '본관 2층' },
	{
		value: '본관 2층 사장실',
		label: '본관 2층 사장실',
	},
	{
		value: 'MAIN_2F_RESEARCH_OFFICE',
		label: '본관 2층 기술연구소 사무실',
	},
	{
		value: 'MAIN_2F_CONFERENCE_ROOM',
		label: '본관 2층 대회의실',
	},
	{
		value: 'MAIN_2F_CEO_OFFICE',
		label: '본관 2층 대표이사실',
	},
	{
		value: 'MAIN_3F_STORAGE',
		label: '본관 3층 창고',
	},
	{
		value: 'MDCG',
		label: 'MDCG',
	},
	{
		value: 'FACTORY_BUILDING',
		label: '공장동',
	},
];
const ownership = [
	{ value: 'OWNED', label: '소유' },
	{ value: 'LEASED', label: '임대' },
];
const useState = [
	{ value: 'NEW', label: '신규' },
	{ value: 'IN_USE', label: '사용중' },
	{ value: 'UNDER_MAINTENANCE', label: '유지관리 중' },
	{ value: 'RESERVED', label: '예비' },
	{ value: 'RETIRED_DISCARDED', label: '퇴직/폐기' },
];
const operationStatus = [
	{ value: '가동중', label: '가동중' },
	{ value: '미가동', label: '미가동' },
	{ value: '고장', label: '고장' },
];
//기본 자산 정보 및 관리 정보 컬럼
const BasisAssetInfo = ({ formData, handleChange }) => {
	const methods = useForm();
	return (
		<div>
			<Accordion defaultActiveKey="0">
				<Card style={{ width: '120rem' }}>
					<CustomToggle eventKey="0">
						<Card.Header>기본 자산 정보 및 관리 정보</Card.Header>
					</CustomToggle>
					<Accordion.Collapse eventKey="0">
						<FormProvider {...methods}>
							<Card.Body>
								<Row>
									<Col lg={5} style={{ paddingLeft: 80 }}>
										<p className="mb-2 c fw-bold">자산분류</p>
										<Select
											className="mb-3"
											placeholder="자산분류를 선택해주세요"
											name="assetClassification"
											value={assetClassification.find(
												(option) =>
													option.value === formData.assetClassification
											)}
											onChange={(selectedOption) =>
												handleChange({
													target: {
														name: 'assetClassification',
														value: selectedOption.value,
													},
												})
											}
											options={assetClassification}
										></Select>
										<TextInput
											label="자산명"
											type="text"
											placeholder="자산명을 입력해주세요"
											name="assetName"
											containerClass={'mb-3'}
											value={formData.assetName}
											onChange={handleChange}
										/>
										<p className="mb-2 c fw-bold">자산기준</p>
										<Select
											className="mb-3"
											placeholder="자산기준을 선택해주세요"
											name="assetBasis"
											value={assetBasis.find(
												(option) => option.value === formData.assetBasis
											)}
											onChange={(selectedOption) =>
												handleChange({
													target: {
														name: 'assetBasis',
														value: selectedOption.value,
													},
												})
											}
											options={assetBasis}
										></Select>
										<TextInput
											label="제조사"
											type="text"
											placeholder="제조사를 입력해주세요"
											name="manufacturingCompany"
											containerClass={'mb-3'}
											value={formData.manufacturingCompany}
											onChange={handleChange}
										/>
										<TextInput
											label="목적"
											type="text"
											placeholder="목적을 입력해주세요"
											name="purpose"
											containerClass={'mb-3'}
											value={formData.purpose}
											onChange={handleChange}
										/>
										<p className="mb-2 c fw-bold">부서</p>
										<Select
											className="mb-3"
											placeholder="부서를 선택해주세요"
											name="department"
											value={department.find(
												(option) => option.value === formData.department
											)}
											onChange={(selectedOption) =>
												handleChange({
													target: {
														name: 'department',
														value: selectedOption.value,
													},
												})
											}
											options={department}
										></Select>
										<p className="mb-2 c fw-bold">위치</p>
										<Select
											className="mb-3"
											placeholder="위치를 선택해주세요"
											name="assetLocation"
											value={assetLocation.find(
												(option) => option.value === formData.assetLocation
											)}
											onChange={(selectedOption) =>
												handleChange({
													target: {
														name: 'assetLocation',
														value: selectedOption.value,
													},
												})
											}
											options={assetLocation}
										></Select>
										<TextInput
											label="사용자"
											type="text"
											placeholder="사용자을 입력해주세요"
											name="assetUser"
											containerClass={'mb-3'}
											value={formData.assetUser}
											onChange={handleChange}
										/>
										<TextInput
											label="소유자"
											type="text"
											placeholder="소유자를 입력해주세요"
											name="assetOwner"
											containerClass={'mb-3'}
											value={formData.assetOwner}
											onChange={handleChange}
										/>
										<TextInput
											label="보안담당자"
											type="text"
											placeholder="보안담당자를 입력해주세요"
											name="assetSecurityManager"
											containerClass={'mb-3'}
											value={formData.assetSecurityManager}
											onChange={handleChange}
										/>
									</Col>
									<Col lg={1} className="d-flex align-items-stretch">
										<div className="vertical-divider"></div>
									</Col>
									<Col lg={5}>
										<TextInput
											label="수량"
											type="number"
											placeholder="수량을 입력해주세요"
											name="quantity"
											containerClass={'mb-3'}
											value={formData.quantity}
											onChange={handleChange}
										/>
										<p className="mb-2 c fw-bold">소유권</p>
										<Select
											className="mb-3"
											placeholder="소유권을 선택해주세요"
											name="ownership"
											value={ownership.find(
												(option) => option.value === formData.ownership
											)}
											onChange={(selectedOption) =>
												handleChange({
													target: {
														name: 'ownership',
														value: selectedOption.value,
													},
												})
											}
											options={ownership}
										></Select>
										<p className="mb-2 c fw-bold">사용상태</p>
										<Select
											className="mb-3"
											placeholder="사용상태를 선택해주세요"
											name="useState"
											value={useState.find(
												(option) => option.value === formData.useState
											)}
											onChange={(selectedOption) =>
												handleChange({
													target: {
														name: 'useState',
														value: selectedOption.value,
													},
												})
											}
											options={useState}
										></Select>
										<p className="mb-2 c fw-bold">가동여부</p>
										<Select
											className="mb-3"
											placeholder="가동여부를 선택해주세요"
											name="operationStatus"
											value={operationStatus.find(
												(option) =>
													option.value === formData.operationStatus
											)}
											onChange={(selectedOption) =>
												handleChange({
													target: {
														name: 'operationStatus',
														value: selectedOption.value,
													},
												})
											}
											options={operationStatus}
										></Select>
										<div className="form-group mb-3">
											<label className="form-label">도입일자</label> <br />
											<CustomDatePicker
												type="date"
												dateFormat="yyyy-MM-dd"
												name="introducedDate"
												hideAddon={true}
												value={formData.introducedDate}
												onChange={(date) =>
													handleChange({
														target: {
															name: 'introducedDate',
															value: date ? date : null,
														},
													})
												}
											/>
										</div>
										<TextInput
											label="기밀성"
											type="number"
											placeholder="기밀성 입력해주세요"
											name="confidentiality"
											containerClass={'mb-3'}
											value={formData.confidentiality}
											onChange={handleChange}
										/>
										<TextInput
											label="무결성"
											type="number"
											placeholder="무결성을 입력해주세요"
											name="integrity"
											containerClass={'mb-3'}
											value={formData.integrity}
											onChange={handleChange}
										/>
										<TextInput
											label="가용성"
											type="number"
											placeholder="가용성을 입력해주세요"
											name="availability"
											containerClass={'mb-3'}
											value={formData.availability}
											onChange={handleChange}
										/>
										<TextAreaInput
											label="비고"
											name="note"
											rows={4}
											containerClass={'mb-3'}
											key="textarea"
											value={formData.note}
											onChange={handleChange}
										/>
									</Col>
								</Row>
							</Card.Body>
						</FormProvider>
					</Accordion.Collapse>
				</Card>
			</Accordion>

			<div className="d-flex justify-content-center">
				<PurchasingInfo formData={formData} handleChange={handleChange} />
			</div>
			<div className="d-flex justify-content-center">
				<AssetCategories
					formData={formData}
					assetClassification={formData.assetClassification}
					handleChange={handleChange}
				/>
			</div>
		</div>
	);
};

export default BasisAssetInfo;

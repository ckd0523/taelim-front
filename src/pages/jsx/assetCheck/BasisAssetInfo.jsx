//기본 자산 정보
import AssetCategories from './AssetCategories';
import { useAccordionButton, Form } from 'react-bootstrap';

import PurchasingInfo from './PurchasingInfo';
import './ButtonStyle.css';

import { Row, Col, Card, Accordion } from 'react-bootstrap';
import { BsCaretUpFill } from 'react-icons/bs';
import { BsCaretDownFill } from 'react-icons/bs';

import { TextInput, TextAreaInput } from '@/components/Form';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { CustomDatePicker } from '@/components/Form';
import { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
const StyledCard = styled.div`
	display: flex;
	flex-direction: column;

	@media (max-width: 767px) {
		width: 100%;
		display: block;
	}

	@media (min-width: 768px) and (max-width: 1023px) {
		width: 100%;
		display: block;
	}

	@media (min-width: 1024px) {
		width: 100%;
		display: block;
	}
`;

const StyledCardBody = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
// const { register } = useFormContext;
function CustomToggle({ children, eventKey }) {
	const [isOpen, setIsOpen] = useState(false);
	const decoratedOnClick = useAccordionButton(eventKey, () => setIsOpen((prevOpen) => !prevOpen));
	return (
		<button
			className="custom-button px-3 pt-2 fw-bold"
			type="button"
			style={{ width: '100%', backgroundColor: '#dcefdc', textAlign: 'left' }}
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
	{ value: 'COMMON', label: '일반' },
	{ value: 'TISAX', label: 'TISAX' },
];
const department = [
	{ value: 'IT_DEPARTMENT', label: 'IT부' },
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
		value: 'MAIN_B1_DOCUMENT_STORAGE',
		label: '본관 지하 문서고',
	},
	{ value: 'MAIN_1F', label: '본관 1층' },
	{
		value: 'MAIN_1F_RECEPTION_ROOM',
		label: '본관 1층 접견실',
	},
	{ value: 'MAIN_2F', label: '본관 2층' },
	{
		value: 'MAIN_2F_PRESIDENT_OFFICE',
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
const usestate = [
	{ value: 'NEW', label: '신규' },
	{ value: 'IN_USE', label: '사용중' },
	{ value: 'UNDER_MAINTENANCE', label: '유지관리 중' },
	{ value: 'RESERVED', label: '예비' },
	{ value: 'RETIRED_DISCARDED', label: '퇴직/폐기' },
];
const operationStatus = [
	{ value: 'OPERATING', label: '가동중' },
	{ value: 'NOT_OPERATING', label: '미가동' },
	{ value: 'MALFUNCTION', label: '고장' },
];
//기본 자산 정보 및 관리 정보 컬럼
const BasisAssetInfo = ({ formData, handleChange }) => {
	const methods = useForm();
	return (
		<div>
			<Accordion defaultActiveKey="0">
				<StyledCard className="card">
					<CustomToggle eventKey="0">기본 자산 정보 및 관리 정보</CustomToggle>
					<Accordion.Collapse eventKey="0">
						<FormProvider {...methods}>
							<StyledCardBody className="card-body">
								<Row>
									<Col lg={5}>
										<p className="mb-2 c fw-bold">자산분류</p>
										<Select
											className="mb-2"
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
										<Form.Label>자산명</Form.Label>
										<Form.Control
											placeholder="자산명을 입력해주세요"
											className="mb-2"
											type="text"
											value={formData.assetName}
											onChange={handleChange}
											name="assetName"
										/>
										<p className="mb-2 c fw-bold">자산기준</p>
										<Select
											className="mb-2"
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
										<Form.Label>제조사</Form.Label>
										<Form.Control
											placeholder="제조사를 입력해주세요"
											className="mb-2"
											type="text"
											value={formData.manufacturingCompany}
											onChange={handleChange}
											name="manufacturingCompany"
										/>
										<Form.Label>목적</Form.Label>
										<Form.Control
											placeholder="목적을 입력해주세요"
											className="mb-2"
											type="text"
											value={formData.purpose}
											onChange={handleChange}
											name="purpose"
										/>
										<p className="mb-2 c fw-bold">부서</p>
										<Select
											className="mb-2"
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
											className="mb-2"
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
										<Form.Label>사용자</Form.Label>
										<Form.Control
											placeholder="사용자를 입력해주세요"
											className="mb-2"
											type="text"
											value={formData.assetUser}
											onChange={handleChange}
											name="assetUser"
										/>
										<Form.Label>소유자</Form.Label>
										<Form.Control
											placeholder="소유자를 입력해주세요"
											className="mb-2"
											type="text"
											value={formData.assetOwner}
											onChange={handleChange}
											name="assetOwner"
										/>
										<Form.Label>보안담당자</Form.Label>
										<Form.Control
											placeholder="보안담당자를 입력해주세요"
											className="mb-2"
											type="text"
											value={formData.assetSecurityManager}
											onChange={handleChange}
											name="assetSecurityManager"
										/>
									</Col>
									<Col lg={1} className="d-flex align-items-stretch">
										<div className="vertical-divider"></div>
									</Col>
									<Col lg={5}>
										<Form.Label>수량</Form.Label>
										<Form.Control
											placeholder="수량을 입력해주세요"
											className="mb-2"
											type="number"
											value={formData.quantity}
											onChange={handleChange}
											name="quantity"
										/>
										<p className="mb-2 c fw-bold">소유권</p>
										<Select
											className="mb-2"
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
											className="mb-2"
											placeholder="사용상태를 선택해주세요"
											name="usestate"
											value={usestate.find(
												(option) => option.value === formData.usestate
											)}
											onChange={(selectedOption) =>
												handleChange({
													target: {
														name: 'usestate',
														value: selectedOption.value,
													},
												})
											}
											options={usestate}
										></Select>
										<p className="mb-2 c fw-bold">가동여부</p>
										<Select
											className="mb-2"
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
										<div className="form-group mb-2">
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
										<Form.Label>기밀성</Form.Label>
										<Form.Control
											placeholder="기밀성을 입력해주세요"
											className="mb-2"
											type="number"
											value={formData.confidentiality}
											onChange={handleChange}
											name="confidentiality"
										/>
										<Form.Label>무결성</Form.Label>
										<Form.Control
											placeholder="무결성을 입력해주세요"
											className="mb-2"
											type="number"
											value={formData.integrity}
											onChange={handleChange}
											name="integrity"
										/>
										<Form.Label>가용성</Form.Label>
										<Form.Control
											placeholder="가용성을 입력해주세요"
											className="mb-2"
											type="number"
											value={formData.availability}
											onChange={handleChange}
											name="availability"
										/>
										<Form.Label>비고</Form.Label>
										<Form.Control
											placeholder="비고를 입력해주세요"
											className="mb-2"
											as="textarea"
											value={formData.note}
											onChange={handleChange}
											name="note"
											rows={4}
										/>
									</Col>
								</Row>
							</StyledCardBody>
						</FormProvider>
					</Accordion.Collapse>
				</StyledCard>
			</Accordion>
			<Col xs={12} md={8} lg={12}>
				<PurchasingInfo formData={formData} handleChange={handleChange} />

				<AssetCategories
					formData={formData}
					assetClassification={formData.assetClassification}
					handleChange={handleChange}
				/>
			</Col>
		</div>
	);
};

export default BasisAssetInfo;

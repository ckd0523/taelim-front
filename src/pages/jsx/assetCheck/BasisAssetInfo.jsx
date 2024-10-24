//기본 자산 정보

import { useAccordionButton, Form, FormGroup } from 'react-bootstrap';
import './ButtonStyle.css';
import { Row, Col, Accordion } from 'react-bootstrap';
import { BsCaretUpFill } from 'react-icons/bs';
import { BsCaretDownFill } from 'react-icons/bs';

import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import styled from 'styled-components';
import api from '@/common/api/authAxios';
const urlConfig = import.meta.env.VITE_BASIC_URL;
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

function CustomToggle({ children, eventKey }) {
	const [isOpen, setIsOpen] = useState(false);
	const decoratedOnClick = useAccordionButton(eventKey, () => setIsOpen((prevOpen) => !prevOpen));
	return (
		<button
			className="custom-button px-3 pt-2 fw-bold"
			type="button"
			style={{ width: '100%', backgroundColor: '#6081ab4e', textAlign: 'left' }}
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
const BasisAssetInfo = ({ isValidated, formData, handleChange, handleSubmit }) => {
	const methods = useForm({
		defaultValues: formData,
		mode: 'onBlur',
	});
	const {
		register,
		formState: { errors },
		handleSubmit: reactHookHandleSubmit,
	} = methods;

	//소유자 검색어와 소유자 리스트 상태
	const [owners, setOwners] = useState([]); // 소유자 리스트
	const [assetOwnerID, setAssetOwnerID] = useState(''); //실제 들어갈 소유자 ID값
	const [assetOwner, setAssetOwner] = useState(''); //보여지는 소유자 이름
	const [users, setUsers] = useState([]);
	const [assetUserID, setAssetUserID] = useState('');
	const [assetUser, setAssetUser] = useState('');
	const [securityManager, setSecurityManager] = useState([]);
	const [assetSecurityManagerID, setAssetSecurityManagerID] = useState('');
	const [assetSecurityManager, setAssetSecurityManager] = useState('');

	//사용자
	const assetUserChange = (e) => {
		setAssetUser(e.target.value);
		handleChange({
			target: {
				name: 'assetUser',
				value: e.target.value,
			},
		});
		if (e.target.value) {
			handleUserSearch(e.target.value);
		} else {
			setUsers([]);
		}
	};

	const handleUserSearch = async (searchTerm) => {
		try {
			const response = await api.get(`${urlConfig}/user/search`, {
				params: { name: searchTerm },
			});
			setUsers(response.data); // 소유자 리스트 업데이트
		} catch (error) {
			console.error('소유자 검색 중 오류 발생:', error);
		}
	};
	const handleSelectUser = (owner) => {
		setAssetUser(owner.fullname);
		setAssetUserID(owner.id);

		handleChange({
			target: {
				name: 'assetUser',
				value: owner.id,
			},
		});
		setUsers([]); //
	};

	//보안담당자
	const assetSecurityChange = (e) => {
		setAssetSecurityManager(e.target.value);
		handleChange({
			target: {
				name: 'assetSecurityManager',
				value: e.target.value,
			},
		});
		if (e.target.value) {
			handleSecuritySearch(e.target.value);
		} else {
			setSecurityManager([]);
		}
	};

	const handleSecuritySearch = async (searchTerm) => {
		try {
			const response = await api.get(`${urlConfig}/user/search`, {
				params: { name: searchTerm },
			});
			setSecurityManager(response.data); // 소유자 리스트 업데이트
		} catch (error) {
			console.error('소유자 검색 중 오류 발생:', error);
		}
	};
	const handleSelectSecurity = (owner) => {
		setAssetSecurityManager(owner.fullname);
		setAssetSecurityManagerID(owner.id);

		handleChange({
			target: {
				name: 'assetSecurityManager',
				value: owner.id,
			},
		});
		setSecurityManager([]); //
	};

	// 소유자 입력 변경 핸들러
	const assetOwnerChange = (e) => {
		setAssetOwner(e.target.value);
		// 소유자 검색어에 따라 소유자 검색
		handleChange({
			target: {
				name: 'assetOwner',
				value: e.target.value,
			},
		});
		if (e.target.value) {
			handleOwnerSearch(e.target.value); // 소유자 검색 호출
		} else {
			setOwners([]); // 입력이 비었으면 리스트 초기화
		}
	};

	// 소유자 검색 함수
	const handleOwnerSearch = async (searchTerm) => {
		try {
			const response = await api.get(`${urlConfig}/user/search`, {
				params: { name: searchTerm },
			});
			setOwners(response.data); // 소유자 리스트 업데이트
		} catch (error) {
			console.error('소유자 검색 중 오류 발생:', error);
		}
	};
	// 소유자 선택 핸들러
	const handleSelectOwner = (owner) => {
		setAssetOwner(owner.fullname); // 선택된 소유자 이름 설정
		setAssetOwnerID(owner.id);

		handleChange({
			target: {
				name: 'assetOwner',
				value: owner.id,
			},
		});
		setOwners([]); // 선택 후 리스트 초기화
	};

	const onSubmit = (data) => {
		handleSubmit(data);
	};
	return (
		<div>
			<Accordion defaultActiveKey="0">
				<StyledCard className="card">
					<CustomToggle eventKey="0">기본 자산 정보 및 관리 정보</CustomToggle>
					<Accordion.Collapse eventKey="0">
						<FormProvider {...methods}>
							<Form
								validated={isValidated}
								onSubmit={reactHookHandleSubmit(onSubmit)}
							>
								<StyledCardBody className="card-body">
									<Row className="justify-content-md-center">
										<Col lg={5}>
											<Form.Group className="position-relative mb-3">
												<Form.Label>자산분류</Form.Label>
												<Form.Label className="text-danger">＊</Form.Label>
												<Form.Select
													required
													className="mb-2"
													placeholder="자산분류를 선택해주세요"
													name="assetClassification"
													value={formData.assetClassification}
													onChange={(selectedOption) =>
														handleChange({
															target: {
																name: 'assetClassification',
																value: selectedOption.target.value,
															},
														})
													}
													options={assetClassification}
												>
													<option value="" disabled>
														자산분류를 선택해주세요.
													</option>
													{assetClassification.map((option) => (
														<option
															key={option.value}
															value={option.value}
														>
															{option.label}
														</option>
													))}
												</Form.Select>
											</Form.Group>

											<FormGroup className="position-relative mb-3">
												<Form.Label className="mb-2 c fw-bold">
													자산기준
												</Form.Label>
												<Form.Label className="text-danger">＊</Form.Label>
												<Form.Select
													required
													className="mb-2"
													name="assetBasis"
													value={formData.assetBasis} // Ensure to set value correctly
													onChange={(assetBasis) =>
														handleChange({
															target: {
																name: 'assetBasis',
																value: assetBasis.target.value, // Use e.target.value to get selected value
															},
														})
													}
												>
													<option value="" disabled>
														자산기준을 선택해주세요.
													</option>
													{assetBasis.map((option) => (
														<option
															key={option.value}
															value={option.value}
														>
															{option.label}
														</option>
													))}
												</Form.Select>
											</FormGroup>

											<FormGroup className="position-relative mb-3">
												<Form.Label>자산명</Form.Label>
												<Form.Label className="text-danger">＊</Form.Label>

												<Form.Control
													required
													placeholder="자산명을 입력해주세요"
													className="mb-2"
													type="text"
													value={formData.assetName}
													onChange={handleChange}
													name="assetName"
												/>
											</FormGroup>

											<Form.Label>목적/기능</Form.Label>
											<Form.Label className="text-danger">＊</Form.Label>
											<Form.Control
												required
												placeholder="목적을 입력해주세요"
												className="mb-2"
												type="text"
												value={formData.purpose}
												onChange={handleChange}
												name="purpose"
											/>
											<FormGroup>
												<Form.Label className="mb-2 c fw-bold">
													부서
												</Form.Label>
												<Form.Label className="text-danger">＊</Form.Label>
												<Form.Select
													required
													className="mb-2"
													placeholder="부서를 선택해주세요"
													name="department"
													value={formData.department}
													onChange={(selectedOption) =>
														handleChange({
															target: {
																name: 'department',
																value: selectedOption.target.value,
															},
														})
													}
												>
													<option value="" disabled>
														자산기준을 선택해주세요.
													</option>
													{department.map((option) => (
														<option
															key={option.value}
															value={option.value}
														>
															{option.label}
														</option>
													))}
												</Form.Select>
											</FormGroup>
											<FormGroup>
												<Form.Label className="mb-2 c fw-bold">
													자산위치
												</Form.Label>
												<Form.Label className="text-danger">＊</Form.Label>
												<Form.Select
													required
													className="mb-2"
													placeholder="위치를 선택해주세요"
													name="assetLocation"
													value={formData.assetLocation}
													onChange={(selectedOption) =>
														handleChange({
															target: {
																name: 'assetLocation',
																value: selectedOption.target.value,
															},
														})
													}
												>
													<option value="" disabled>
														자산위치를 선택해주세요.
													</option>
													{assetLocation.map((option) => (
														<option
															key={option.value}
															value={option.value}
														>
															{option.label}
														</option>
													))}
												</Form.Select>
											</FormGroup>

											<Form.Label>사용자</Form.Label>
											<Form.Control
												placeholder="사용자를 입력해주세요"
												className="mb-2"
												type="text"
												value={assetUser}
												onChange={assetUserChange}
												name="assetUser"
											/>
											{users.length > 0 && ( // 소유자 리스트 표시
												<ul className="owner-list">
													{users.map((user) => (
														<li
															key={user.id}
															onClick={() => handleSelectUser(user)}
														>
															{user.fullname} ({user.department}){' '}
															{/* 소유자 이름과 부서 */}
														</li>
													))}
												</ul>
											)}
											<Form.Label>소유자</Form.Label>
											<Form.Control
												placeholder="소유자를 입력해주세요"
												className="mb-2"
												type="text"
												value={assetOwner}
												onChange={assetOwnerChange}
												name="assetOwnerID"
											/>
											{owners.length > 0 && ( // 소유자 리스트 표시
												<ul className="owner-list">
													{owners.map((owner) => (
														<li
															key={owner.id}
															onClick={() => handleSelectOwner(owner)}
														>
															{owner.fullname} ({owner.department}){' '}
															{/* 소유자 이름과 부서 */}
														</li>
													))}
												</ul>
											)}
											<Form.Label>보안담당자</Form.Label>
											<Form.Control
												placeholder="보안담당자를 입력해주세요"
												className="mb-2"
												type="text"
												value={assetSecurityManager}
												onChange={assetSecurityChange}
												name="assetSecurityManager"
											/>
										</Col>
										{securityManager.length > 0 && ( // 소유자 리스트 표시
											<ul className="owner-list">
												{securityManager.map((security) => (
													<li
														key={security.id}
														onClick={() =>
															handleSelectSecurity(security)
														}
													>
														{security.fullname} ({security.department}){' '}
														{/* 소유자 이름과 부서 */}
													</li>
												))}
											</ul>
										)}
										<Col lg={1} className="d-flex align-items-stretch">
											<div className="vertical-divider"></div>
										</Col>
										<Col lg={5}>
											<Form.Label>제조사</Form.Label>
											<Form.Control
												placeholder="제조사를 입력해주세요"
												className="mb-2"
												type="text"
												value={formData.manufacturingCompany}
												onChange={handleChange}
												name="manufacturingCompany"
											/>

											<Form.Label>수량</Form.Label>
											<Form.Label className="text-danger">＊</Form.Label>
											<Form.Control
												required
												placeholder="수량을 입력해주세요"
												className="mb-2"
												type="number"
												value={formData.quantity}
												onChange={handleChange}
												name="quantity"
											/>
											<FormGroup>
												<Form.Label className="mb-2 c fw-bold">
													소유권
												</Form.Label>
												<Form.Label className="text-danger">＊</Form.Label>
												<Form.Select
													required
													className="mb-2"
													placeholder="소유권을 선택해주세요."
													name="ownership"
													value={formData.ownership}
													onChange={(selectedOption) =>
														handleChange({
															target: {
																name: 'ownership',
																value: selectedOption.target.value,
															},
														})
													}
												>
													<option value="" disabled>
														소유권을 선택해주세요.
													</option>
													{ownership.map((option) => (
														<option
															key={option.value}
															value={option.value}
														>
															{option.label}
														</option>
													))}
												</Form.Select>
											</FormGroup>

											<FormGroup>
												<Form.Label className="mb-2 c fw-bold">
													사용상태
												</Form.Label>
												<Form.Select
													className="mb-2"
													placeholder="사용상태를 선택해주세요"
													name="usestate"
													value={formData.usestate || ''}
													onChange={(selectedOption) =>
														handleChange({
															target: {
																name: 'usestate',
																value:
																	selectedOption.target.value ===
																	''
																		? null
																		: selectedOption.target
																				.value,
															},
														})
													}
												>
													<option value="" disabled>
														사용상태를 선택해주세요.
													</option>
													{usestate.map((option) => (
														<option
															value={option.value}
															key={option.value}
														>
															{option.label}
														</option>
													))}
												</Form.Select>
											</FormGroup>

											<Form.Group>
												<Form.Label className="mb-2 c fw-bold">
													가동여부
												</Form.Label>
												<Form.Select
													className="mb-2"
													placeholder="가동여부를 선택해주세요"
													name="operationStatus"
													value={formData.operationStatus || ''}
													onChange={(selectedOption) =>
														handleChange({
															target: {
																name: 'operationStatus',
																value:
																	selectedOption.target.value ===
																	''
																		? null
																		: selectedOption.target
																				.value,
															},
														})
													}
												>
													<option value="" disabled>
														가동여부를 선택해주세요.
													</option>
													{operationStatus.map((option) => (
														<option
															value={option.value}
															key={option.value}
														>
															{option.label}
														</option>
													))}
												</Form.Select>
											</Form.Group>

											<div className="form-group mb-2">
												<Form.Label className="form-label">
													도입일자
												</Form.Label>
												<Form.Control
													type="date"
													// dateFormat="yyyy-MM-dd"
													name="introducedDate"
													value={formData.introducedDate || ''}
													onChange={(date) =>
														handleChange({
															target: {
																name: 'introducedDate',
																value: date.target.value
																	? date.target.value
																	: null,
															},
														})
													}
												/>
											</div>

											<Form.Label>제품시리얼번호</Form.Label>
											<Form.Control
												placeholder="제품시리얼번호를 입력해주세요"
												className="mb-2"
												type="text"
												onChange={handleChange}
												name="manufacturingCompany"
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
							</Form>
						</FormProvider>
					</Accordion.Collapse>
				</StyledCard>
			</Accordion>
		</div>
	);
};

export default BasisAssetInfo;

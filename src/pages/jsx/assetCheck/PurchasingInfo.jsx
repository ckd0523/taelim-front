//재무 및 구매정보 컬럼
import { Row, Col, Accordion, Form } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap';

import { useForm, FormProvider } from 'react-hook-form';
import { CustomDatePicker } from '@/components/Form';
import { BsCaretUpFill } from 'react-icons/bs';
import { BsCaretDownFill } from 'react-icons/bs';
import Select from 'react-select';
import { useState } from 'react';
import './ButtonStyle.css';
import styled from 'styled-components';
import { useEffect } from 'react';
const StyledCard = styled.div`
	display: flex;
	flex-direction: column;

	@media (max-width: 767px) {
		width: 100%;
		display: flex;
	}

	@media (min-width: 768px) and (max-width: 1023px) {
		width: 100%;
		display: flex;
	}

	@media (min-width: 1024px) {
		width: 100%;
		display: flex;
	}
`;

const StyledCardBody = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const depreciationMethod = [
	{ value: 'FIXED_AMOUNT', label: '정액법' },
	{ value: 'FIXED_RATE', label: '정률법' },
];
function CustomToggle({ children, eventKey }) {
	const [isOpen, setIsOpen] = useState(false);
	const decoratedOnClick = useAccordionButton(eventKey, () => setIsOpen((prevOpen) => !prevOpen));
	return (
		<button
			className="custom-button px-3 pt-2 fw-bold"
			type="button"
			style={{ backgroundColor: '#dcefdc', textAlign: 'left' }}
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
const PurchasingInfo = ({ formData, handleChange }) => {
	const methods = useForm();

	return (
		<div style={{ paddingTop: '20px' }}>
			<Accordion defaultActiveKey="1">
				<StyledCard className="card">
					<CustomToggle eventKey="1">재무 및 구매정보</CustomToggle>
					<Accordion.Collapse eventKey="1">
						<FormProvider {...methods}>
							<StyledCardBody className="card-body">
								<Row>
									<Col lg={5}>
										<Form.Label>구매비용</Form.Label>
										<Form.Control
											placeholder="구매비용을 입력해주세요"
											className="mb-2"
											type="number"
											value={formData.purchaseCost}
											onChange={handleChange}
											name="purchaseCost"
										/>
										<div className="form-group mb-2">
											<label className="form-label">구매날짜</label> <br />
											<CustomDatePicker
												className="mb-2"
												type="date"
												name="purchaseDate"
												hideAddon={true}
												dateFormat="yyyy-MM-dd"
												value={formData.purchaseDate}
												onChange={(date) =>
													handleChange({
														target: {
															name: 'purchaseDate',
															value: date ? date : null,
														},
													})
												}
											/>
										</div>
										<Form.Label>내용연수</Form.Label>
										<Form.Control
											placeholder="내용연수를 입력해주세요"
											className="mb-2"
											type="number"
											value={formData.usefulLife}
											onChange={handleChange}
											name="usefulLife"
										/>
										<p className="mb-2 c fw-bold">감가상각방법</p>
										<Select
											className="mb-3"
											placeholder="감가상각방법을 선택해주세요"
											name="depreciationMethod"
											value={depreciationMethod.find(
												(option) =>
													option.value === formData.depreciationMethod
											)}
											onChange={(selectedOption) =>
												handleChange({
													target: {
														name: 'depreciationMethod',
														value: selectedOption.value,
													},
												})
											}
											options={depreciationMethod}
										></Select>
									</Col>
									<Col lg={1} className="d-flex align-items-stretch">
										<div className="vertical-divider"></div>
									</Col>
									<Col lg={5}>
										<Form.Label>구입처</Form.Label>
										<Form.Control
											placeholder="구입처를 입력해주세요"
											className="mb-2"
											type="text"
											value={formData.purchaseSource}
											onChange={handleChange}
											name="purchaseSource"
										/>
										<Form.Label>구입처연락처</Form.Label>
										<Form.Control
											placeholder="구입처연락처를 입력해주세요"
											className="mb-2"
											type="text"
											value={formData.contactInformation}
											onChange={handleChange}
											name="contactInformation"
										/>
										<Form.Label>취득경로</Form.Label>
										<Form.Control
											placeholder="취득경로를 입력해주세요"
											className="mb-2"
											type="text"
											value={formData.acquisitionRoute}
											onChange={handleChange}
											name="acquisitionRoute"
										/>
										<div className="form-group mb-3">
											<label className="form-label">유지기간</label> <br />
											<CustomDatePicker
												containerClass={'mb-3'}
												type="date"
												name="maintenancePeriod"
												hideAddon={true}
												dateFormat="yyyy-MM-dd"
												value={formData.maintenancePeriod}
												onChange={(date) =>
													handleChange({
														target: {
															name: 'maintenancePeriod',
															value: date ? date : null,
														},
													})
												}
											/>
										</div>
									</Col>
								</Row>
							</StyledCardBody>
						</FormProvider>
					</Accordion.Collapse>
				</StyledCard>
			</Accordion>
		</div>
	);
};

export default PurchasingInfo;

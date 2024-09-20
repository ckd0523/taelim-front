//재무 및 구매정보 컬럼
import { Row, Col, Accordion, Card } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap';

import { TextInput, TextAreaInput } from '@/components/Form';
import { useForm, FormProvider } from 'react-hook-form';
import { CustomDatePicker } from '@/components/Form';
import { BsCaretUpFill } from 'react-icons/bs';
import { BsCaretDownFill } from 'react-icons/bs';
import Select from 'react-select';
import { useState } from 'react';
import './ButtonStyle.css';
import styled from 'styled-components';
const StyledCard = styled.div`
	display: flex;
	flex-direction: column;

	@media (max-width: 768px) {
		width: 30rem;
	}

	@media (min-width: 769px) and (max-width: 1280px) {
		width: 42rem;
	}

	@media (min-width: 1281px) {
		width: 100rem;
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
			className="custom-button px-3 pt-2"
			type="button"
			style={{ backgroundColor: 'white', textAlign: 'left' }}
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
		<div>
			<Accordion defaultActiveKey="1">
				<StyledCard className="card">
					<CustomToggle eventKey="1">재무 및 구매정보</CustomToggle>
					<Accordion.Collapse eventKey="1">
						<FormProvider {...methods}>
							<StyledCardBody className="card-body">
								<Row>
									<Col lg={5}>
										<TextInput
											containerClass={'mb-3'}
											name="purchaseCost"
											label="구매비용"
											type="number"
											placeholder="구매비용을 입력해주세요"
											value={formData.purchaseCost}
											onChange={handleChange}
										/>
										<div className="form-group mb-3">
											<label className="form-label">구매날짜</label> <br />
											<CustomDatePicker
												containerClass={'mb-3'}
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
										<TextInput
											containerClass={'mb-3'}
											name="usefulLife"
											label="내용연수"
											type="number"
											placeholder="내용연수를 입력해주세요"
											value={formData.usefulLife}
											onChange={handleChange}
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
										<TextInput
											containerClass={'mb-3'}
											label="구입처"
											type="text"
											name="purchaseSource"
											value={formData.purchaseSource}
											onChange={handleChange}
										/>
										<TextInput
											containerClass={'mb-3'}
											label="구입처연락처"
											type="text"
											name="contactInformation"
											value={formData.contactInformation}
											onChange={handleChange}
										/>
										<TextInput
											containerClass={'mb-3'}
											label="취득경로"
											type="text"
											name="acquisitionRoute"
											value={formData.acquisitionRoute}
											onChange={handleChange}
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

//재무 및 구매정보 컬럼
import { Row, Col, Accordion, Card } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap';

import { TextInput, TextAreaInput } from '@/components/Form';
import { useForm, FormProvider } from 'react-hook-form';
import { CustomDatePicker } from '@/components/Form';

import Select from 'react-select';

import './ButtonStyle.css';
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
const PurchasingInfo = ({ formData, handleChange }) => {
	const methods = useForm();
	return (
		<div>
			<Accordion defaultActiveKey="1">
				<Card>
					<Card.Header>
						<CustomToggle eventKey="1">재무 및 구매정보</CustomToggle>
					</Card.Header>
					<Accordion.Collapse eventKey="1">
						<FormProvider {...methods}>
							<Card.Body>
								<Row>
									<Col lg={5} style={{ paddingLeft: 80 }}>
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
												onChange={(selectedOption) =>
													handleChange({
														target: {
															name: 'purchaseDate',
															value: selectedOption.value.toStringDate(),
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
											value={formData.depreciationMethod}
											onChange={(selectedOption) =>
												handleChange({
													target: {
														name: 'depreciationMethod',
														value: selectedOption.value,
													},
												})
											}
											options={[
												{ value: 'FIXED_AMOUNT', label: '정액법' },
												{ value: 'FIXED_RATE', label: '정률법' },
											]}
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
												onChange={(selectedOption) =>
													handleChange({
														target: {
															name: 'maintenancePeriod',
															value: selectedOption.value.toStringDate(),
														},
													})
												}
											/>
										</div>
									</Col>
								</Row>
							</Card.Body>
						</FormProvider>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</div>
	);
};

export default PurchasingInfo;

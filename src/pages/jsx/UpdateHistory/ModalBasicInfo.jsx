import React from 'react';
import { useState, useEffect } from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';
import { BsCaretUpFill } from 'react-icons/bs';
import { BsCaretDownFill } from 'react-icons/bs';
import { useAccordionButton, Accordion, Card } from 'react-bootstrap';

const ModalBasicInfo = ({
	assetInfo,
	modifiedAssetInfo,
	dynamicColumns,
	importanceScore,
	modifiedImportanceScore,
	importanceRating,
	modifiedImportanceRating,
}) => {
	const getCellClassName = (originalValue, modifiedValue) => {
		return originalValue !== modifiedValue ? 'text-danger' : '';
	};

	function CustomToggle({ children, eventKey }) {
		const [isOpen, setIsOpen] = useState(false);
		const decoratedOnClick = useAccordionButton(eventKey, () =>
			setIsOpen((prevOpen) => !prevOpen)
		);
		return (
			<button
				className="update-button px-3  fw-bold"
				type="button"
				onClick={decoratedOnClick}
				style={{ display: 'block', width: '100%' }} // 블록 요소로 처리하여 가로 전체 사용
			>
				{isOpen ? (
					<BsCaretUpFill style={{ paddingRight: '5' }} size="30" />
				) : (
					<BsCaretDownFill style={{ paddingRight: '5' }} size="30" />
				)}
				{children}
			</button>
		);
	}

	return (
		<div className="info-update">
			<h2>수정 전 : {assetInfo.assetNo}</h2>
			<Card></Card>
			{/* 기본 자산 정보 및 관리 정보 섹션 */}
			<Accordion defaultActiveKey="0">
				<CustomToggle eventKey="1">기본 자산 정보 및 관리 정보</CustomToggle>
				<Accordion.Collapse eventKey="1">
					<Card>
						{/* <h4>기본 자산 정보 및 관리 정보</h4> */}
						<div className="table-responsive">
							<BootstrapTable bordered className="table-update">
								<thead>
									<tr>
										{/* <th>자산코드</th>
							<th>자산명</th> */}
										<th>자산기준</th>
										<th>제조사</th>
										<th>제품시리얼 번호</th>
										<th>목적</th>
										<th>부서</th>
										<th>위치</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td
											className={getCellClassName(
												assetInfo.assetBasis,
												modifiedAssetInfo.assetBasis
											)}
										>
											{assetInfo.assetBasis || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.manufacturingCompany,
												modifiedAssetInfo.manufacturingCompany
											)}
										>
											{assetInfo.manufacturingCompany || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.productSerialNumber,
												modifiedAssetInfo.productSerialNumber
											)}
										>
											{assetInfo.productSerialNumber || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.purpose,
												modifiedAssetInfo.purpose
											)}
										>
											{assetInfo.purpose || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.department,
												modifiedAssetInfo.department
											)}
										>
											{assetInfo.department || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.assetLocation,
												modifiedAssetInfo.assetLocation
											)}
										>
											{assetInfo.assetLocation || 'N/A'}
										</td>
									</tr>
								</tbody>
							</BootstrapTable>

							{/* 다음 테이블 추가 (기본 자산 정보 및 관리 정보) */}
							<BootstrapTable bordered className="table-update">
								<thead>
									<tr>
										<th>사용자</th>
										<th>소유자</th>
										<th>보안담당자</th>
										<th>사용상태</th>
										<th>가동여부</th>
										<th>소유권</th>
										<th>도입일자</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td
											className={getCellClassName(
												assetInfo.assetUser,
												modifiedAssetInfo.assetUser
											)}
										>
											{assetInfo.assetUser || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.assetOwner,
												modifiedAssetInfo.assetOwner
											)}
										>
											{assetInfo.assetOwner || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.assetSecurityManager,
												modifiedAssetInfo.assetSecurityManager
											)}
										>
											{assetInfo.assetSecurityManager || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.useStated,
												modifiedAssetInfo.useStated
											)}
										>
											{assetInfo.useStated || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.operationStatus,
												modifiedAssetInfo.operationStatus
											)}
										>
											{assetInfo.operationStatus || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.ownership,
												modifiedAssetInfo.ownership
											)}
										>
											{assetInfo.ownership || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.introducedDate,
												modifiedAssetInfo.introducedDate
											)}
										>
											{assetInfo.introducedDate || 'N/A'}
										</td>
									</tr>
								</tbody>
							</BootstrapTable>

							{/* 추가 테이블 */}
							<BootstrapTable bordered className="table-update">
								<thead>
									<tr>
										<th>수량</th>
										<th>기밀성</th>
										<th>무결성</th>
										<th>가용성</th>
										<th>중요성점수</th>
										<th>중요성등급</th>
										<th>비고</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td
											className={getCellClassName(
												assetInfo.quantity,
												modifiedAssetInfo.quantity
											)}
										>
											{assetInfo.quantity || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.confidentiality,
												modifiedAssetInfo.confidentiality
											)}
										>
											{assetInfo.confidentiality || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.integrity,
												modifiedAssetInfo.integrity
											)}
										>
											{assetInfo.integrity || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.availability,
												modifiedAssetInfo.availability
											)}
										>
											{assetInfo.availability || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												importanceScore,
												modifiedImportanceScore
											)}
										>
											{importanceScore}
										</td>
										<td
											className={getCellClassName(
												importanceRating,
												modifiedImportanceRating
											)}
										>
											{importanceRating}
										</td>
										<td
											className={getCellClassName(
												assetInfo.note,
												modifiedAssetInfo.note
											)}
										>
											{assetInfo.note || 'N/A'}
										</td>
									</tr>
								</tbody>
							</BootstrapTable>
						</div>
					</Card>
				</Accordion.Collapse>
			</Accordion>

			{/* 재무 및 구매 정보 섹션 */}
			<Card></Card>
			<Accordion defaultActiveKey="0">
				<CustomToggle eventKey="1">재무 및 구매 정보</CustomToggle>
				<Accordion.Collapse eventKey="1">
					<Card>
						<div className="table-responsive">
							<BootstrapTable bordered className="table-update">
								<thead>
									<tr>
										<th>구매비용</th>
										<th>구매날짜</th>
										<th>내용연수</th>
										<th>감가상각방법</th>
										<th>취득경로</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td
											className={getCellClassName(
												assetInfo.purchaseCost,
												modifiedAssetInfo.purchaseCost
											)}
										>
											{assetInfo.purchaseCost || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.purchaseDate,
												modifiedAssetInfo.purchaseDate
											)}
										>
											{assetInfo.purchaseDate || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.usefulLife,
												modifiedAssetInfo.usefulLife
											)}
										>
											{assetInfo.usefulLife || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.depreciationMethod,
												modifiedAssetInfo.depreciationMethod
											)}
										>
											{assetInfo.depreciationMethod || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.acquisitionRoute,
												modifiedAssetInfo.acquisitionRoute
											)}
										>
											{assetInfo.acquisitionRoute || 'N/A'}
										</td>
									</tr>
								</tbody>
							</BootstrapTable>

							<BootstrapTable bordered className="table-update">
								<thead>
									<tr>
										<th>구입처</th>
										<th>구입처 연락처</th>
										<th>유지기간</th>
										<th>잔존가치</th>
										<th>현재가치</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td
											className={getCellClassName(
												assetInfo.purchaseSource,
												modifiedAssetInfo.purchaseSource
											)}
										>
											{assetInfo.purchaseSource || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.contactInformation,
												modifiedAssetInfo.contactInformation
											)}
										>
											{assetInfo.contactInformation || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.maintenancePeriod,
												modifiedAssetInfo.maintenancePeriod
											)}
										>
											{assetInfo.maintenancePeriod || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.residualValue,
												modifiedAssetInfo.residualValue
											)}
										>
											{assetInfo.residualValue || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												assetInfo.currentValue,
												modifiedAssetInfo.currentValue
											)}
										>
											{assetInfo.currentValue || 'N/A'}
										</td>
									</tr>
								</tbody>
							</BootstrapTable>
						</div>
					</Card>
				</Accordion.Collapse>
			</Accordion>

			<Card></Card>

			<Accordion defaultActiveKey="0">
				<CustomToggle eventKey="1">
					{assetInfo?.assetClassification}에 따른 칼럼
				</CustomToggle>
				<Accordion.Collapse eventKey="1">
					<Card>
						<div className="table-responsive">
							{/* 동적 열 테이블 섹션 */}
							{dynamicColumns.length > 0 && (
								<>
									{dynamicColumns.length >= 6 ? (
										<>
											{/* 첫 번째 테이블: 첫 6개 열 */}

											<BootstrapTable bordered className="table-update">
												<thead>
													<tr>
														{dynamicColumns.slice(0, 6).map((col) => (
															<th key={col.title}>{col.title}</th>
														))}
													</tr>
												</thead>
												<tbody>
													<tr>
														{dynamicColumns.slice(0, 6).map((col) => {
															const originalValue =
																assetInfo[col.data]; // 원래 데이터
															const modifiedValue =
																modifiedAssetInfo[col.data]; // 수정된 데이터
															return (
																<td
																	key={col.title}
																	className={getCellClassName(
																		modifiedValue,
																		originalValue
																	)}
																>
																	{originalValue || 'N/A'}
																</td>
															);
														})}
													</tr>
												</tbody>
											</BootstrapTable>

											{/* 두 번째 테이블: 나머지 열 */}
											<BootstrapTable bordered className="table-update">
												<thead>
													<tr>
														{dynamicColumns.slice(6).map((col) => (
															<th key={col.title}>{col.title}</th>
														))}
													</tr>
												</thead>
												<tbody>
													<tr>
														{dynamicColumns.slice(6).map((col) => {
															const originalValue =
																assetInfo[col.data]; // 원래 데이터
															const modifiedValue =
																modifiedAssetInfo[col.data]; // 수정된 데이터
															return (
																<td
																	key={col.title}
																	className={getCellClassName(
																		modifiedValue,
																		originalValue
																	)}
																>
																	{originalValue || 'N/A'}
																</td>
															);
														})}
													</tr>
												</tbody>
											</BootstrapTable>
										</>
									) : (
										<BootstrapTable bordered className="table-update">
											<thead>
												<tr>
													{dynamicColumns.map((col) => (
														<th key={col.title}>{col.title}</th>
													))}
												</tr>
											</thead>
											<tbody>
												<tr>
													{dynamicColumns.map((col) => {
														const originalValue = assetInfo[col.data]; // 원래 데이터
														const modifiedValue =
															modifiedAssetInfo[col.data]; // 수정된 데이터
														return (
															<td
																key={col.title}
																className={getCellClassName(
																	modifiedValue,
																	originalValue
																)}
															>
																{originalValue || 'N/A'}
															</td>
														);
													})}
												</tr>
											</tbody>
										</BootstrapTable>
									)}
								</>
							)}
						</div>
					</Card>
				</Accordion.Collapse>
			</Accordion>
		</div>
	);
};

export { ModalBasicInfo };

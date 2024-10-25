import React from 'react';
import { useState, useEffect } from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';
import { BsCaretUpFill } from 'react-icons/bs';
import { BsCaretDownFill } from 'react-icons/bs';
import { useAccordionButton, Accordion, Card } from 'react-bootstrap';

const ModalModifiedInfo = ({
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
			<h2>수정 후 : {modifiedAssetInfo.assetNo}</h2>
			<Card></Card>
			{/* 기본 자산 정보 및 관리 정보 섹션 */}
			<Accordion defaultActiveKey="0">
				<CustomToggle eventKey="1">기본 자산 정보 및 관리 정보</CustomToggle>
				<Accordion.Collapse eventKey="1">
					<Card>
						<div className="table-responsive">
							<BootstrapTable bordered className="table-update">
								<thead>
									<tr>
										{/* <th>자산코드</th>
						<th>자산명</th> */}
										<th>자산기준</th>
										<th>제조사</th>
										<th>목적</th>
										<th>부서</th>
										<th>위치</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td
											className={getCellClassName(
												modifiedAssetInfo.assetBasis,
												assetInfo.assetBasis
											)}
										>
											{modifiedAssetInfo.assetBasis || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												modifiedAssetInfo.manufacturingCompany,
												assetInfo.manufacturingCompany
											)}
										>
											{modifiedAssetInfo.manufacturingCompany || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												modifiedAssetInfo.purpose,
												assetInfo.purpose
											)}
										>
											{modifiedAssetInfo.purpose || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												modifiedAssetInfo.department,
												assetInfo.department
											)}
										>
											{modifiedAssetInfo.department || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												modifiedAssetInfo.assetLocation,
												assetInfo.assetLocation
											)}
										>
											{modifiedAssetInfo.assetLocation || 'N/A'}
										</td>
									</tr>
								</tbody>
							</BootstrapTable>
							<BootstrapTable bordered className="table-update">
								<thead>
									<tr>
										<th>사용자</th>
										<th>소유자</th>
										<th>보안담당자</th>
										<th>사용상태</th>
										<th>가동여부</th>
										<th>도입일자</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td
											className={getCellClassName(
												modifiedAssetInfo.assetUser,
												assetInfo.assetUser
											)}
										>
											{modifiedAssetInfo.assetUser || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												modifiedAssetInfo.assetOwner,
												assetInfo.assetOwner
											)}
										>
											{modifiedAssetInfo.assetOwner || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												modifiedAssetInfo.assetSecurityManager,
												assetInfo.assetSecurityManager
											)}
										>
											{modifiedAssetInfo.assetSecurityManager || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												modifiedAssetInfo.useStated,
												assetInfo.useStated
											)}
										>
											{modifiedAssetInfo.useStated || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												modifiedAssetInfo.operationStatus,
												assetInfo.operationStatus
											)}
										>
											{modifiedAssetInfo.operationStatus || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												modifiedAssetInfo.introducedDate,
												assetInfo.introducedDate
											)}
										>
											{modifiedAssetInfo.introducedDate || 'N/A'}
										</td>
									</tr>
								</tbody>
							</BootstrapTable>
							<BootstrapTable bordered className="table-update">
								<thead>
									<tr>
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
												modifiedAssetInfo.confidentiality,
												assetInfo.confidentiality
											)}
										>
											{modifiedAssetInfo.confidentiality || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												modifiedAssetInfo.integrity,
												assetInfo.integrity
											)}
										>
											{modifiedAssetInfo.integrity || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												modifiedAssetInfo.availability,
												assetInfo.availability
											)}
										>
											{modifiedAssetInfo.availability || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												modifiedImportanceScore,
												importanceScore
											)}
										>
											{modifiedImportanceScore}
										</td>
										<td
											className={getCellClassName(
												modifiedImportanceRating,
												importanceRating
											)}
										>
											{modifiedImportanceRating}
										</td>
										<td
											className={getCellClassName(
												modifiedAssetInfo.note,
												assetInfo.note
											)}
										>
											{modifiedAssetInfo.note || 'N/A'}
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
												modifiedAssetInfo.purchaseCost,
												assetInfo.purchaseCost
											)}
										>
											{modifiedAssetInfo.purchaseCost}
										</td>
										<td
											className={getCellClassName(
												modifiedAssetInfo.purchaseDate,
												assetInfo.purchaseDate
											)}
										>
											{modifiedAssetInfo.purchaseDate}
										</td>
										<td
											className={getCellClassName(
												modifiedAssetInfo.usefulLife,
												assetInfo.usefulLife
											)}
										>
											{modifiedAssetInfo.usefulLife}
										</td>
										<td
											className={getCellClassName(
												modifiedAssetInfo.depreciationMethod,
												assetInfo.depreciationMethod
											)}
										>
											{modifiedAssetInfo.depreciationMethod}
										</td>
										<td
											className={getCellClassName(
												modifiedAssetInfo.acquisitionRoute,
												assetInfo.acquisitionRoute
											)}
										>
											{modifiedAssetInfo.acquisitionRoute}
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
												modifiedAssetInfo.purchaseSource,
												assetInfo.purchaseSource
											)}
										>
											{modifiedAssetInfo.purchaseSource}
										</td>
										<td
											className={getCellClassName(
												modifiedAssetInfo.contactInformation,
												assetInfo.contactInformation
											)}
										>
											{modifiedAssetInfo.contactInformation}
										</td>
										<td
											className={getCellClassName(
												modifiedAssetInfo.maintenancePeriod,
												assetInfo.maintenancePeriod
											)}
										>
											{modifiedAssetInfo.maintenancePeriod}
										</td>
										<td
											className={getCellClassName(
												modifiedAssetInfo.residualValue,
												assetInfo.residualValue
											)}
										>
											{modifiedAssetInfo.residualValue || 'N/A'}
										</td>
										<td
											className={getCellClassName(
												modifiedAssetInfo.currentValue,
												assetInfo.currentValue
											)}
										>
											{modifiedAssetInfo.currentValue || 'N/A'}
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
																		originalValue,
																		modifiedValue
																	)}
																>
																	{modifiedValue || 'N/A'}
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
																		originalValue,
																		modifiedValue
																	)}
																>
																	{modifiedValue || 'N/A'}
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
																	originalValue,
																	modifiedValue
																)}
															>
																{modifiedValue || 'N/A'}
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
export { ModalModifiedInfo };

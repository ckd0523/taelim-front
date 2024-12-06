import {
	Row,
	Col,
	Card,
	Table as BootstrapTable,
	Button,
	Modal,
	Form,
	FormGroup,
} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	getClassificationColumns,
	calculateImportanceScore,
	calculateImportanceRating,
} from './UpdateHistoryColumn';
import {
	getResidualValueRate,
	calculateResidualValue,
	calculatePresentValue,
} from './UpdateHistoryCalulate';
import { ModalBasicInfo } from './ModalBasicInfo';
import { ModalModifiedInfo } from './ModalModifiedInfo';
import api from '@/common/api/authAxios';
import './Style.css'; // 같은 폴더에서 CSS 파일 import

const urlConfig = import.meta.env.VITE_BASIC_URL;

const InfoModal = ({ show, handleClose, modalData, assetNo }) => {
	const [assetInfo, setAssetInfo] = useState(null); // 변경 전 정보
	const [modifiedAssetInfo, setModifiedAssetInfo] = useState(null); // 변경 후 정보

	// 변경 전 , 변경 후 테이블 색깔 비교
	const getCellClassName = (originalValue, newValue) => {
		return originalValue !== newValue ? 'text-danger' : '';
	};

	const [isLoading, setIsLoading] = useState(true);

	const importanceScore = calculateImportanceScore(assetInfo);
	const importanceRating = calculateImportanceRating(importanceScore);

	const modifiedImportanceScore = calculateImportanceScore(modifiedAssetInfo);
	const modifiedImportanceRating = calculateImportanceRating(modifiedImportanceScore);

	// 잔존가치와 현재가치 계산
	const residualValue = calculateResidualValue(assetInfo);
	const currentValue = calculatePresentValue(assetInfo);
	// 수정된 잔존가치와 현재가치 계산
	const modifiedresidualValue = calculateResidualValue(modifiedAssetInfo);
	const modifiedcurrentValue = calculatePresentValue(modifiedAssetInfo);

	const classification = assetInfo?.assetClassification;
	const dynamicColumns = React.useMemo(
		() => getClassificationColumns(classification),
		[classification]
	);
	useEffect(() => {
		if (assetNo) {
			// assetNo  유효할 때만 fetchRowData 호출
			const fetchRowData = async () => {
				setIsLoading(true); // 데이터 요청 시작부분

				try {
					const response = await api.get(`${urlConfig}/list/${assetNo}`);
					console.log(`불러온 데이터 : `, response.data);

					const [lowestAsset, modifiedAsset] = response.data;

					// 두 개의 자산 정보를 각각 "변경 전"과 "변경 후"로 설정
					setAssetInfo(lowestAsset); // 변경 전 데이터 설정
					setModifiedAssetInfo(modifiedAsset); // 변경 후 데이터 설정

					console.log('변경 전 자산 정보: ', lowestAsset);
					console.log('변경 후 자산 정보: ', modifiedAsset);
				} catch (error) {
					console.error(`Error 데이터 : `, error);
				} finally {
					setIsLoading(false); // 데이터 요청완료
				}
			};

			fetchRowData(); // assetNo  유효할 때만 fetchRowData 호출
		}
	}, [assetNo]); // assetNo  변경될 때만 호출

	return (
		<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			scrollable={true} // scrollable의 기본값이 'false'이므로 true로 변경
			className="update-modal" // 모달 전체에 스타일 적용
		>
			<Modal.Header closeButton>
				<Modal.Title>수정 상세 정보</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{isLoading ? (
					<p>로딩 중...</p> // 로딩 중 표시
				) : (
					assetInfo &&
					modalData && (
						<>
							{/* modalData 관련 정보 */}
							<Form.Group className="mb-3 pt-2" controlId="exampleForm.ControlInput1">
								<Row>
									<Col lg={6}>
										<Form.Label>자산코드</Form.Label>
										<Form.Control
											type="text"
											value={modalData.assetCode}
											readOnly
										/>
									</Col>
									<Col lg={6}>
										<Form.Label>자산명</Form.Label>
										<Form.Control
											type="text"
											value={modalData.assetName}
											readOnly
										/>
									</Col>
								</Row>
								<Row>
									<Col lg={6}>
										<Form.Label className="pt-2">수정요청자</Form.Label>
										<Form.Control
											type="text"
											value={modalData.updateBy}
											readOnly
										/>
									</Col>
									<Col lg={6}>
										<Form.Label className="pt-2">수정일자</Form.Label>
										<Form.Control
											type="text"
											value={modalData.updateDate}
											readOnly
										/>
									</Col>
								</Row>
								<Row>
									<Col lg={6}>
										<Form.Label className="pt-2">수정사유</Form.Label>
										<Form.Control
											type="text"
											value={modalData.updateReason}
											readOnly
										/>
									</Col>
									<Col lg={6}>
										<Form.Label className="pt-2">수정내용</Form.Label>
										<Form.Control
											type="text"
											value={modalData.updateDetail}
											readOnly
										/>
									</Col>
								</Row>
							</Form.Group>
							<div className="info-update-container">
								<ModalBasicInfo
									assetInfo={assetInfo}
									modifiedAssetInfo={modifiedAssetInfo}
									dynamicColumns={dynamicColumns}
									importanceScore={importanceScore}
									modifiedImportanceScore={modifiedImportanceScore}
									importanceRating={importanceRating}
									modifiedImportanceRating={modifiedImportanceRating}
									residualValue={residualValue}
									currentValue={currentValue}
									modifiedresidualValue={modifiedresidualValue}
									modifiedcurrentValue={modifiedcurrentValue}
								/>
								<ModalModifiedInfo
									assetInfo={assetInfo}
									modifiedAssetInfo={modifiedAssetInfo}
									dynamicColumns={dynamicColumns}
									importanceScore={importanceScore}
									modifiedImportanceScore={modifiedImportanceScore}
									importanceRating={importanceRating}
									modifiedImportanceRating={modifiedImportanceRating}
									residualValue={residualValue}
									currentValue={currentValue}
									modifiedresidualValue={modifiedresidualValue}
									modifiedcurrentValue={modifiedcurrentValue}
								/>
							</div>
						</>
					)
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					닫기
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export { InfoModal };

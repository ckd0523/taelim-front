import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { Button, Table, Row, Col, Form, Alert, Card } from 'react-bootstrap';
import Select from 'react-select';
import Swal from 'sweetalert2';
import api from '@/common/api/authAxios';

const urlConfig = import.meta.env.VITE_BASIC_URL;
const ExcelRegister = () => {
	const [data, setData] = useState({});
	const [selectValue, setSelectValue] = useState(null);
	const [uploadFile, setUploadFile] = useState(null);
	const [headers, setHeaders] = useState([]);
	const [formData, setFormData] = useState([]); // 여러 행을 처리하기 위해 배열로 변경
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');

	const fileInputRef = useRef(null);

	const classification = [
		{ value: '2.1 정보보호시스템', label: '정보보호시스템' },
		{ value: '2.2 응용프로그램', label: '응용프로그램' },
		{ value: '2.3 소프트웨어', label: '소프트웨어' },
		{ value: '2.4 전자정보', label: '전자정보' },
		{ value: '2.5 문서', label: '문서' },
		{ value: '2.6 특허 및 상표', label: '특허 및 상표' },
		{ value: '2.7 IT장비-시스템', label: 'IT장비-시스템' },
		{ value: '2.8 IT장비-네트워크', label: 'IT장비-네트워크' },
		{ value: '2.9 단말기', label: '단말기' },
		{ value: '2.10 가구', label: '가구' },
		{ value: '2.11 기기', label: '기기' },
		{ value: '2.12 차량', label: '차량' },
		{ value: '2.13 기타', label: '기타' },
	];

	const handleSelectValue = (selectOption) => {
		setSelectValue(selectOption);
		setShowAlert(false);

		setData({});
		setFormData([]);
		setHeaders([]);

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const sheetNames = [
		'2.1 정보보호시스템',
		'2.2 응용프로그램',
		'2.3 소프트웨어',
		'2.4 전자정보',
		'2.5 문서',
		'2.6 특허 및 상표',
		'2.7 IT장비-시스템',
		'2.8 IT장비-네트워크',
		'2.9 단말기',
		'2.10 가구',
		'2.11 기기',
		'2.12 차량',
		'2.13 기타',
	];
	const excelDateToJSDate = (serial) => {
		// if (!serial || isNaN(serial)) {
		// 	console.log('Invalid serial date : ', serial);
		// 	return '';
		// }
		if (typeof serial === 'number') {
			const excelEpoch = new Date(Date.UTC(1899, 11, 30));
			const jsDate = new Date(excelEpoch.getTime() + serial * 24 * 60 * 60 * 1000);
			return jsDate.toISOString().split('T')[0];

			// } else {
			// 	const datePattern = /^(\d{4})년\s*(\d{2})월$/;
			// 	const match = serial.match(datePattern);
			// 	if (match) {
			// 		const [_, year, month] = match;
			// 		return `${year}-${month}-01`;
			// 	}
		}

		if (typeof serial === 'string') {
			const datePattern = /^(\d{4})년\s*(\d{2})월$/;
			const match = serial.match(datePattern);
			if (match) {
				const [_, year, month] = match;
				console(match);
				return `${year}-${month}-01`;
			}
		}
		return;
	};
	const commonFieldMapping = {
		자산기준: 'assetBasis',
		자산명: 'assetName',
		'목적/기능': 'purpose',
		자산위치: 'assetLocation',
		수량: 'quantity',
		부서: 'department',
		가동여부: 'operationStatus',
		도입일자: (introducedDate) => excelDateToJSDate(introducedDate),
		기밀성: 'confidentiality',
		무결성: 'integrity',
		가용성: 'availability',
		사용자: 'assetUser',
		소유자: 'assetOwner',
		보안담당자: 'assetSecurityManager',
		비고: 'note',
		사용상태: 'useStated',
		구매비용: 'purchaseCost',
		구매날짜: 'purchaseDate',
		내용연수: 'usefulLife',
		구입처: 'purchaseSource',
		구입연락처: 'contactInformation',
		취득경로: 'acquisitionRoute',
		유지기간: 'maintenancePeriod',
	};
	const sheetSpeciificMappings = {
		'2.1 정보보호시스템': {
			서비스범위: 'serviceScope',
		},
		'2.2 응용프로그램': {
			서비스범위: 'serviceScope',
			사용OS: 'os',
			관련DB: 'relatedDB',
			IP: 'ip',
			화면수: 'screenNumber',
		},
		'2.3 소프트웨어': {
			IP: 'ip',
			ID: 'id',
			PW: 'pw',
			담당업체: 'companyManager',
			사용OS: 'os',
		},
		'2.4 전자정보': {
			사용OS: 'os',
			시스템: 'system',
			DB종류: 'DBType',
		},
		'2.5 문서': {
			문서등급: 'documentGrade',
			문서형태: 'documentType',
			문서링크: 'documentLink',
		},

		'2.6 특허 및 상표': {
			출원일자: 'applicationDate',
			등록일자: 'registrationDate',
			만료일자: 'expirationDate',
			'특허/상표상태': 'patentTrademarkStatus',
			출원국가: 'countryApplication',
			특허분류: 'patentClassification',
			특허세목: 'patentItem',
			출원번호: 'applicationNo',
			발명자: 'inventor',
			권리권자: 'assignee',
		},
		'2.7 IT장비-시스템': {
			장비유형: 'equipmentType',
			랙유닛: 'rackUnit',
			전원공급장치: 'powerSupply',
			쿨링시스템: 'coolingSystem',
			인터페이스포트: 'interfacePorts',
			폼팩터: 'formFactor',
			확장슬롯수: 'expansionSlots',
			그래픽카드: 'graphicsCard',
			포트구성: 'portConfiguration',
			모니터포함여부: 'monitorIncluded',
		},
		'2.8 IT장비-네트워크': {
			장비유형: 'equipmentType',
			포트수: 'numberOfPorts',
			지원프로토콜: 'supportedProtocols',
			펌웨어버전: 'firmwareVersion',
			네트워크속도: 'networkSpeed',
			서비스범위: 'serviceScope',
		},
		'2.9 단말기': {
			IP: 'ip',
			OS: 'os',
			보안관제: 'securityControl',
			내부정보유출방지: 'kaitsKeeper',
			'악성코드,랜섬웨어탐지': 'V3OfficeSecurity',
			안티랜섬웨어: 'appCheckPro',
			NACagent: 'tgate',
		},
		'2.10 가구': {
			크기: 'furnitureSize',
		},
		'2.11 기기': {
			기기유형: 'deviceType',
			모델번호: 'modelNumber',
			연결방식: 'connectionType',
			전원사양: 'powerSpecifications',
		},
		'2.12 차량': {
			배기량: 'displacement',
			차량의문수: 'doorsCount',
			엔진형식: 'engineType',
			차량종류: 'carType',
			차량식별번호: 'identificationNo',
			차량색상: 'carColor',
			연식: 'modelYear',
		},
		'2.13 기타': {
			기타세부설명: 'otherDescription',
			사용빈도: 'usageFrequency',
		},
	};

	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		setUploadFile(file);
		setShowAlert(false);
		const reader = new FileReader();

		reader.onload = (event) => {
			const binaryStr = event.target.result;
			const workbook = XLSX.read(binaryStr, { type: 'binary' });
			const sheetsData = {};

			sheetNames.forEach((sheetName) => {
				if (workbook.SheetNames.includes(sheetName)) {
					if (sheetName === selectValue.value) {
						const sheet = workbook.Sheets[sheetName];
						const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
						const headers = sheetData[7];
						setHeaders(headers);
						const rows = sheetData.slice(8);

						const fieldMapping = {
							...commonFieldMapping,
							...sheetSpeciificMappings[selectValue.value],
						};

						const allFormData = rows
							.filter((row) => row.some((cell) => cell))
							.map((excelRow) => {
								const updatedFormData = {};
								headers.forEach((header, index) => {
									const cleanedHeader = header
										.trim()
										.replace(/[^가-힣a-zA-Z0-9/]/g, '');
									const formKey = fieldMapping[cleanedHeader];

									if (formKey) {
										if (cleanedHeader === '도입일자') {
											updatedFormData['introducedDate'] = fieldMapping[
												cleanedHeader
											](excelRow[index]);
										}
										updatedFormData['assetClassification'] =
											sheetName.substring(4, 12);
										updatedFormData[formKey] = excelRow[index];
									}
								});
								return updatedFormData;
							});

						// 모든 행 데이터를 formData 배열에 저장
						setFormData(allFormData);
						console.log(allFormData);

						const jsonData = rows
							.filter((row) => row.some((cell) => cell))
							.map((row) => {
								const rowData = {};
								headers.forEach((header, index) => {
									rowData[header] = row[index];
								});
								return rowData;
							});

						sheetsData[sheetName] = jsonData;
					}
				} else {
					console.warn(`Sheet ${sheetName} does not exist in the uploaded file.`);
				}
			});

			setData(sheetsData);
		};

		reader.readAsBinaryString(file);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!uploadFile || !selectValue) {
			setAlertMessage(
				!selectValue && !uploadFile
					? '자산분류와 파일을 선택해주세요.'
					: !selectValue
					  ? '자산분류를 선택해주세요.'
					  : '파일을 선택해주세요.'
			);
			setShowAlert(true);
			return;
		}

		try {
			const excelResponse = await api.post('/asset/excelRegister', formData);
			if (excelResponse.status == 200) {
				Swal.fire({
					icon: 'success',
					title: '자산이 성공적으로 등록되었습니다.',
					text: '자산조회화면으로 이동',
				});
				setTimeout(() => {
					window.location.replace('/jsx/Expand');
				}, 1000);

				// 파일 입력 필드 초기화
				if (fileInputRef.current) {
					fileInputRef.current.value = ''; // 파일 입력 필드 초기화
				}
			} else {
				Swal.fire({
					icon: 'error',
					title: '엑셀 등록을 실패하였습니다.',
					text: '엑셀 파일을 확인해주세요.',
				});
			}
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: '엑셀 등록 중 에러가 발생하였습니다.',
				text: error,
			});
		}
	};

	return (
		<div>
			<div className="pt-3 px-2">
				<h4 className="header-title">엑셀 등록</h4>
			</div>
			<div className="pt-3">
				{showAlert && <Alert variant="danger">{alertMessage}</Alert>}
			</div>

			<Card>
				<Row className="g-2">
					<Col sm={6}>
						<Form.Group style={{ padding: 50 }}>
							<div>
								<Select
									placeholder="자산분류를 선택해주세요"
									onChange={handleSelectValue}
									options={classification}
									value={selectValue}
								></Select>
							</div>
						</Form.Group>
					</Col>
					<Col sm={6}>
						<Form.Group style={{ padding: 50 }}>
							<Form.Control
								type="file"
								onChange={handleFileUpload}
								ref={fileInputRef}
							/>
						</Form.Group>
					</Col>
				</Row>
			</Card>
			<div>
				<Card className="pt-2 px-3">
					<div>
						<Row>
							<Col>
								{Object.keys(data).map((sheetName, index) => (
									<h3 key={index}>Sheet: {sheetName.substring(4, 12)}</h3>
								))}

								<Table className="border-black">
									<thead className="table-dark">
										<tr>
											{/* {headers.map((header, index) => (
														<th key={index}>{header}</th>
													))} */}
											<th>자산기준</th>
											<th>자산명</th>
											<th>자산분류</th>
											<th>목적/기능</th>
											<th>자산위치</th>
											<th>부서</th>
											<th>사용자</th>
											<th>소유자</th>
										</tr>
									</thead>
									{Object.keys(data).length > 0 ? (
										<tbody>
											{Object.keys(data).map((sheetName) => (
												<React.Fragment key={sheetName}>
													{data[sheetName].map((row, rowIndex) => (
														<tr key={rowIndex}>
															{/* {headers.map((header, colIndex) => (
															<td key={colIndex}>{row[header]}</td>
														))} */}
															<td>{row['자산기준']}</td>
															<td>{row['자산명']}</td>
															<td>{sheetName.substring(4, 12)}</td>
															<td>{row['목적/기능']}</td>
															<td>{row['자산위치']}</td>
															<td>{row['부서']}</td>
															<td>{row['사용자']}</td>
															<td>{row['소유자']}</td>
														</tr>
													))}
												</React.Fragment>
											))}
										</tbody>
									) : (
										<tbody>
											<tr>
												<td colSpan="8" className="text-center">
													<div
														className="alert alert-warning"
														role="alert"
													>
														<strong>데이터가 없습니다!</strong>
														<br />
														자산분류와 파일을 선택해주세요.
													</div>
												</td>
											</tr>
										</tbody>
									)}
								</Table>
							</Col>
						</Row>
					</div>

					{Object.keys(data).length > 0 && (
						<div className="d-flex justify-content-center">
							<Button variant="dark" type="submit" onClick={handleSubmit}>
								등록
							</Button>
						</div>
					)}

					<Card></Card>
				</Card>
			</div>
		</div>
	);
};

export { ExcelRegister };

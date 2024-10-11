import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { Button, Table, Row, Col, Form } from 'react-bootstrap';
import Select from 'react-select';

const urlConfig = import.meta.env.VITE_BASIC_URL;
const ExcelRegister = () => {
	const [data, setData] = useState({});
	const [selectValue, setSelectValue] = useState(null);
	const [uploadFile, setUploadFile] = useState(null);
	const [headers, setHeaders] = useState([]);
	const [formData, setFormData] = useState([]); // 여러 행을 처리하기 위해 배열로 변경

	const fileInputRef = useRef(null);

	const classification = [
		{ value: '2.1 서버(시스템)', label: 'IT장비-시스템' },
		{ value: '2.3 정보보호시스템', label: '정보보호시스템' },
		{ value: '2.4 응용프로그램', label: '응용프로그램' },
		{ value: '2.5 소프트웨어', label: '소프트웨어' },
		{ value: '2.6 전자정보', label: '전자정보' },
		{ value: '2.8 문서', label: '문서' },
		{ value: '2.7.1 단말기_PC', label: '단말기' },
		{ value: '2.7.2 단말기_전화기', label: '기기' },
		{ value: '2.9 기타', label: '기타' },
	];

	const handleSelectValue = (selectOption) => {
		setSelectValue(selectOption);
		console.log(selectOption);

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const sheetNames = [
		'2.1 서버(시스템)',
		'2.2 네트워크',
		'2.3 정보보호시스템',
		'2.4 응용프로그램',
		'2.5 소프트웨어',
		'2.6 전자정보',
		'2.7.1 단말기_PC',
		'2.7.2 단말기_전화기',
		'2.7.3 단말기_복합기',
		'2.8 문서',
		'2.9 기타',
	];
	const excelDateToJSDate = (serial) => {
		const excelEpoch = new Date(Date.UTC(1899, 11, 30));
		const jsDate = new Date(excelEpoch.getTime() + serial * 24 * 60 * 60 * 1000);
		return jsDate.toISOString().split('T')[0];
	};
	const commonFieldMapping = {
		자산기준: 'assetBasis',
		자산코드: 'assetCode',
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
		사용상태: 'usestate',
		구매비용: 'purchaseCost',
		구매날짜: 'purchaseDate',
		내용연수: 'usefulLife',
		구입처: 'purchaseSource',
		구입연락처: 'contactInformation',
		취득경로: 'acquisitionRoute',
		유지기간: 'maintenancePeriod',
	};
	const sheetSpeciificMappings = {
		'2.1 서버(시스템)': {},
		'2.3 정보보호시스템': {
			서비스범위: 'serviceScope',
		},
	};

	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		setUploadFile(file);
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
		try {
			const excelResponse = await fetch(`${urlConfig}/asset/excelRegister`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (excelResponse.ok) {
				alert('엑셀이 정상적으로 등록되었습니다.');
				setSelectValue(null); // 선택한 셀렉트 값 초기화
				setFormData([]); // 폼 데이터 초기화
				setData({}); // 엑셀 데이터 초기화
				setHeaders([]); // 헤더 초기화
				setUploadFile(null); // 업로드된 파일 상태 초기화

				// 파일 입력 필드 초기화
				if (fileInputRef.current) {
					fileInputRef.current.value = ''; // 파일 입력 필드 초기화
				}
			} else {
				alert('엑셀 등록 중 에러가 발생했습니다.');
			}
		} catch (error) {
			console.error('에러 발생:', error);
			alert('엑셀 등록 중 에러가 발생했습니다.');
		}
	};

	return (
		<div>
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
							{selectValue ? selectValue.label : null}
						</div>
					</Form.Group>
				</Col>
				<Col sm={6}>
					<Form.Group style={{ padding: 50 }}>
						<Form.Control type="file" onChange={handleFileUpload} ref={fileInputRef} />
					</Form.Group>
				</Col>
			</Row>
			<div style={{ padding: 50 }}>
				<Row>
					<Col>
						{Object.keys(data).length > 0 && (
							<div>
								{Object.keys(data).map((sheetName) => (
									<div key={sheetName}>
										<h3>Sheet: {sheetName.substring(4, 12)}</h3>
										<Table bordered>
											<thead className="table-light">
												<tr>
													{/* {headers.map((header, index) => (
														<th key={index}>{header}</th>
													))} */}
													<th>자산기준</th>
													<th>자산코드</th>
													<th>자산명</th>
													<th>자산분류</th>
													<th>목적/기능</th>
													<th>자산위치</th>
													<th>부서</th>
													<th>사용자</th>
													<th>소유자</th>
												</tr>
											</thead>
											<tbody>
												{data[sheetName].map((row, rowIndex) => (
													<tr key={rowIndex}>
														{/* {headers.map((header, colIndex) => (
															<td key={colIndex}>{row[header]}</td>
														))} */}
														<td>{row['자산기준']}</td>
														<td>{row['자산코드']}</td>
														<td>{row['자산명']}</td>
														<td>{sheetName.substring(4, 12)}</td>
														<td>{row['목적/기능']}</td>
														<td>{row['자산위치']}</td>
														<td>{row['부서']}</td>
														<td>{row['사용자']}</td>
														<td>{row['소유자']}</td>
													</tr>
												))}
											</tbody>
										</Table>
									</div>
								))}
							</div>
						)}
					</Col>
				</Row>
			</div>
			<div className="d-flex justify-content-center">
				<Button variant="info" type="submit" onClick={handleSubmit}>
					등록
				</Button>
			</div>
		</div>
	);
};

export { ExcelRegister };

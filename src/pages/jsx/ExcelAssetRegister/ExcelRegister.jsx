import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button, Table } from 'react-bootstrap';
import Select from 'react-select';

const ExcelRegister = () => {
	const [data, setData] = useState({});
	const [selectValue, setSelectValue] = useState([]);
	const [headers, setHeaders] = useState([]);
	const [formData, setFormData] = useState([]); // 여러 행을 처리하기 위해 배열로 변경

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

	const handleFileUpload = (e) => {
		const file = e.target.files[0];
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

						const allFormData = rows
							.filter((row) => row.some((cell) => cell))
							.map((excelRow) => {
								const updatedFormData = {};

								headers.forEach((header, index) => {
									// 엑셀 헤더에 따라 formData에 맞게 값을 설정
									switch (header) {
										case '자산기준':
											updatedFormData['assetBasis'] = excelRow[index];
											break;
										case '자산코드':
											updatedFormData['assetCode'] = excelRow[index];
											break;
										case '자산명':
											updatedFormData['assetName'] = excelRow[index];
											break;
										case '목적/기능':
											updatedFormData['purpose'] = excelRow[index];
											break;
										case '수량':
											updatedFormData['quantity'] = excelRow[index];
											break;
										case '자산위치':
											updatedFormData['assetLocation'] = excelRow[index];
											break;
										// case '렉번호':
										// 	updatedFormData['rackUnit'] = excelRow[index];
										// 	break;
										case '위치':
											updatedFormData['department'] = excelRow[index];
											break;
										case '사용자':
											updatedFormData['assetUser'] = excelRow[index];
											break;
										case '소유자':
											updatedFormData['assetOwner'] = excelRow[index];
											break;
										case '보안담당자':
											updatedFormData['assetSecurityManager'] =
												excelRow[index];
											break;
										case '서비스 범위':
											updatedFormData['serviceScope'] = excelRow[index];
											break;
										case '가동 여부':
											updatedFormData['operationStatus'] = excelRow[index];
											break;
										case '도입일자':
											updatedFormData['introducedDate'] = excelRow[index];
											break;
										case '기밀성':
											updatedFormData['confidentiality'] = excelRow[index];
											break;
										case '무결성':
											updatedFormData['integrity'] = excelRow[index];
											break;
										case '가용성':
											updatedFormData['availability'] = excelRow[index];
											break;
										default:
											break;
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
			const excelResponse = await fetch('http://133.186.153.78/api/asset/excelRegister', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (excelResponse.ok) {
				alert('엑셀이 정상적으로 등록되었습니다.');
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
			<div style={{ padding: 50 }}>
				<Select onChange={handleSelectValue} options={classification}></Select>
				{selectValue ? selectValue.label : null}
			</div>
			<div style={{ padding: 50 }}>
				<input type="file" onChange={handleFileUpload} />
				{Object.keys(data).length > 0 && (
					<div>
						{Object.keys(data).map((sheetName) => (
							<div key={sheetName}>
								<h3>Sheet: {sheetName}</h3>
								<Table bordered>
									<thead>
										<tr>
											{headers.map((header, index) => (
												<th key={index}>{header}</th>
											))}
										</tr>
									</thead>
									<tbody>
										{data[sheetName].map((row, rowIndex) => (
											<tr key={rowIndex}>
												{headers.map((header, colIndex) => (
													<td key={colIndex}>{row[header]}</td>
												))}
											</tr>
										))}
									</tbody>
								</Table>
							</div>
						))}
					</div>
				)}
			</div>
			<div className="d-flex justify-content-center">
				<Button type="submit" onClick={handleSubmit}>
					등록
				</Button>
			</div>
		</div>
	);
};

export { ExcelRegister };

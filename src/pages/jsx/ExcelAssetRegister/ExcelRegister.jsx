import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button, Table } from 'react-bootstrap';
import Select from 'react-select';

const ExcelRegister = () => {
	const [data, setData] = useState({});
	const [selectValue, setSelectValue] = useState([]);
	const [headers, setHeaders] = useState();

	const classification = [
		{
			value: '2.3 정보보호시스템',
			label: '정보보호시스템',
		},
		{ value: '2.4 응용프로그램', label: '응용프로그램' },
		{ value: '2.5 소프트웨어', label: '소프트웨어' },
		{ value: '2.6 전자정보', label: '전자정보' },
		{ value: '2.8 문서', label: '문서' },
		// { value: 'PATENTS_AND_TRADEMARKS', label: '특허 및 상표' },
		// { value: 'ITSYSTEM_EQUIPMENT', label: 'IT장비-시스템' },
		// { value: 'ITNETWORK_EQUIPMENT', label: 'IT장비-네트워크' },
		{ value: '2.7.1 단말기_PC', label: '단말기' },
		// { value: 'FURNITURE', label: '가구' },
		{ value: '2.7.2 단말기_전화기', label: '기기' },
		// { value: 'CAR', label: '차량' },
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
						console.log(sheetName);
						const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
						const headers = sheetData[7];
						setHeaders(headers);
						const rows = sheetData.slice(8, 10);
						// const rows = [];
						// for (let i = 8; i < sheetData.length; i++) {
						// 	const row = sheetData.slice(i);

						// 	if (
						// 		row.every(
						// 			(cell) => cell === undefined || cell === '' || cell === '[]'
						// 		)
						// 	) {
						// 		break;
						// 	}
						// 	rows.push(row);
						// }
						// sheetData[sheetName] = rows;

						const jsonData = rows.map((row) => {
							const rowData = {};
							headers.forEach((header, index) => {
								rowData[header] = row[index];

								if (rows === '[]' || rows === undefined || rows === '') {
									return false;
								}
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
			const excelResponse = await fetch('http://localhost:8080/asset/excelRegister', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
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
						<h2>Imported Data:</h2>
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
								{/* <pre>{JSON.stringify(data[sheetName], null, 2)}</pre> */}
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

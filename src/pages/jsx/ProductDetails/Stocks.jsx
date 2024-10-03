import React, { useEffect, useState } from 'react';
import { Table } from '@/components/table';
import Tabs from './Tab';
import QuickAccess from '@/pages/apps/FileManager/QuickAccess';
import { quickAccessFiles } from './data';
import { Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
const urlConfig = import.meta.env.VITE_BASIC_URL;

const Stocks = () => {
	const [commonData, setCommonData] = useState({});
	const [subData, setSubData] = useState({});
	const [commonColumns, setCommonColumns] = useState([]);
	const [subColumns, setSubColumns] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { assetCode } = useParams(); // URL에서 파라미터 추출

	// columns 저장
	const generateColumns = (data) => {
		if (Object.keys(data).length === 0) {
			return [];
		}
		console.log('Data for columns:', data);
		return Object.keys(data || {}).map((key) => ({
			Header: key.charAt(0).toUpperCase() + key.slice(1),
			accessor: key,
		}));
	};

	// 데이터 가져오기
	const fetchData = async (assetCode) => {
		try {
			const response = await fetch(`${urlConfig}/asset1/${assetCode}`);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();
			console.log('Fetched data:', data);
			setCommonData(data.assetDto);

			// 서브 데이터 처리
			const subDataMap = {};
			if (data.softwareDto) {
				subDataMap.softwareDto = data.softwareDto;
			}
			if (data.carDto) {
				subDataMap.carDto = data.carDto;
			}
			if (data.devicesDto) {
				subDataMap.devicesDto = data.devicesDto;
			}
			if (data.documentDto) {
				subDataMap.documentDto = data.documentDto;
			}
			if (data.terminalDto) {
				subDataMap.terminalDto = data.terminalDto;
			}
			if (data.furnitureDto) {
				subDataMap.furnitureDto = data.furnitureDto;
			}
			if (data.otherAssetsDto) {
				subDataMap.otherAssetsDto = data.otherAssetsDto;
			}
			if (data.itSystemEquipmentDto) {
				subDataMap.itSystemEquipmentDto = data.itSystemEquipmentDto;
			}
			if (data.applicationProgramDto) {
				subDataMap.applicationProgramDto = data.applicationProgramDto;
			}
			if (data.itNetworkEquipmentDto) {
				subDataMap.itNetworkEquipmentDto = data.itNetworkEquipmentDto;
			}
			if (data.electronicInformationDto) {
				subDataMap.electronicInformationDto = data.electronicInformationDto;
			}
			if (data.patentsAndTrademarksDto) {
				subDataMap.patentsAndTrademarksDto = data.patentsAndTrademarksDto;
			}
			if (data.informationProtectionSystemDto) {
				subDataMap.informationProtectionSystemDto = data.informationProtectionSystemDto;
			}

			setSubData(subDataMap);
			setCommonColumns(generateColumns(data.assetDto));

			// 서브 데이터의 columns 생성
			const subColumnsMap = {};
			for (const [key, value] of Object.entries(subDataMap)) {
				subColumnsMap[key] = generateColumns(value);
			}
			setSubColumns(subColumnsMap);

			setLoading(false);
		} catch (error) {
			console.error('Fetch data error:', error);
			setError(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData(`${assetCode}`).catch((error) => {
			console.error('Fetch data error in useEffect:', error);
			setError(error);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<>
			<Row className="mb-3">
				<h2>자산 정보</h2>
				<Table
					columns={commonColumns}
					data={[commonData]} // 데이터는 배열로 전달
					isSortable={true}
					pagination={false}
					isExpandable={false}
					isSearchable={false}
					isSelectable={false}
				/>
			</Row>
			<Row className="mb-3">
				{Object.keys(subData).map(
					(key) =>
						subData[key] && (
							<div key={key}>
								<h2>{key.replace('Dto', '')} 세부 정보</h2>
								<Table
									columns={subColumns[key]}
									data={[subData[key]]} // 데이터는 배열로 전달
									isSortable={true}
									pagination={false}
									isExpandable={false}
									isSearchable={false}
									isSelectable={false}
								/>
							</div>
						)
				)}
			</Row>
			<Row className="mb-3">
				<Col>
					<h2>보증세부사항</h2>
					<QuickAccess quickAccessFiles={quickAccessFiles} />
					{commonData.warrantyDetails}
				</Col>
				<Col>
					<h2>사용자 메뉴얼</h2>
					<QuickAccess quickAccessFiles={quickAccessFiles} />
					{commonData.attachment}
				</Col>
			</Row>
		</>
	);
};

export default Stocks;

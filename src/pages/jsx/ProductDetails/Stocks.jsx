import React, { useEffect, useState } from 'react';
import { Table } from '@/components/table';
import Tabs1 from './Tab';
import QuickAccess from '@/pages/apps/FileManager/QuickAccess';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import api from '@/common/api/authAxios';
const urlConfig = import.meta.env.VITE_BASIC_URL;

const Stocks = () => {
	// 공통칼럼 데이터
	const [commonData, setCommonData] = useState({});
	const [subData, setSubData] = useState({});
	//서브칼럼 데이터
	const [commonColumns, setCommonColumns] = useState([]);
	const [subColumns, setSubColumns] = useState([]);
	//파일 데이터
	const [photo, setPhoto] = useState([]);
	const [warrantyDetail, setWarrantyDetail] = useState([]);
	const [attachment, setAttachment] = useState([]);
	//수정이력 데이터
	const [updateHistoryData, setUpdateHistoryData] = useState([]);

	//유지보수이력
	const [maintainHistoryData, setMaintainHistoryData] = useState([]);

	//자산조사이력
	const [surveyHistoryData, setSurveyHistoryData] = useState([]);

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
			const response = await api.get(`${urlConfig}/asset1/${assetCode}`);
			const data = response.data;
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

			setMaintainHistoryData(data.repairList);
			setSurveyHistoryData(data.assetSurveyList);
			setUpdateHistoryData(data.updateList);

			for (const file of data.fileList) {
				switch (file.fileType) {
					case 'PHOTO':
						setPhoto(file);
						break;

					case 'USER_MANUAL':
						setAttachment(file);
						break;

					case 'WARRANTY_DETAILS':
						setWarrantyDetail(file);
						break;
				}
			}

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

	const USERMANUAL = [
		{
			icon: 'mdi mdi-file-pdf-box font-16',
			name: attachment.oriFileName,
			size: attachment.fileSize,
			location: attachment.fileURL,
		},
	];

	const WARRANTYDETAILS = [
		{
			icon: 'mdi mdi-file-pdf-box font-16',
			name: warrantyDetail.oriFileName,
			size: warrantyDetail.fileSize,
			location: warrantyDetail.fileURL,
		},
	];

	return (
		<>
			<Row className="mb-3">
				{/* 이미지 표시 부분 */}
				<div style={{ marginRight: '80px' }}>
					{photo && photo.fileURL ? ( // photo가 존재하고 fileURL이 있을 경우
						<img
							src={photo.fileURL}
							alt={photo.oriFileName}
							style={{ width: '300px', height: 'auto' }}
						/>
					) : (
						<div
							style={{
								width: '300px',
								height: 'auto',
								backgroundColor: '#f0f0f0', // 배경색을 추가하여 빈 공간을 시각적으로 표현
								border: '1px dashed #ccc', // 경계선을 추가하여 빈 공간을 표시
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								color: '#aaa', // 텍스트 색상
							}}
						>
							<span>이미지가 없습니다</span> {/* 빈 상태를 나타내는 텍스트 */}
						</div>
					)}
				</div>
			</Row>
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
					<QuickAccess quickAccessFiles={WARRANTYDETAILS} />
					{commonData.warrantyDetails}
				</Col>
				<Col>
					<h2>사용자 메뉴얼</h2>
					<QuickAccess quickAccessFiles={USERMANUAL} />
					{commonData.attachment}
				</Col>
			</Row>
			<Row>
				<Tabs1
					updateList={updateHistoryData}
					repairList={maintainHistoryData}
					surveyList={surveyHistoryData}
				/>
			</Row>
		</>
	);
};

export default Stocks;

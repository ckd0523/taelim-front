import React, { useEffect, useState } from 'react';
import { Table } from './Table';
import Tabs1 from './Tab';
import QuickAccess from '@/pages/apps/FileManager/QuickAccess';
import { Row, Col, Alert, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import api from '@/common/api/authAxios';
import { getClassificationColumns } from './RowDetailColumn';
import { columns, columns1, columns2 } from './ColumnsSet';
import Accordion from 'react-bootstrap/Accordion';
import MaintainRegister from '@/pages/jsx/Maintain';

const urlConfig = import.meta.env.VITE_BASIC_URL;

const Test = () => {
	const [commonData, setCommonData] = useState({});
	const [subData, setSubData] = useState({});
	const [commonColumns, setCommonColumns] = useState([]);
	const [commonColumns1, setCommonColumns1] = useState([]);
	const [commonColumns2, setCommonColumns2] = useState([]);
	const [subColumns, setSubColumns] = useState([]);
	const [photo, setPhoto] = useState(null);
	const [warrantyDetail, setWarrantyDetail] = useState(null);
	const [attachment, setAttachment] = useState(null);
	const [updateHistoryData, setUpdateHistoryData] = useState([]);
	const [maintainHistoryData, setMaintainHistoryData] = useState([]);
	const [surveyHistoryData, setSurveyHistoryData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { assetCode } = useParams();
	const [assetGrade, setAssetGrade] = useState();

	const calculateImportance = (row) => {
		const confidentiality = row.confidentiality || 0; // 기본값 설정
		const integrity = row.integrity || 0; // 기본값 설정
		const availability = row.availability || 0; // 기본값 설정

		const score = confidentiality + integrity + availability;

		let grade = '';
		if (score >= 1 && score <= 3) {
			grade = 'C';
		} else if (score >= 4 && score <= 6) {
			grade = 'B';
		} else if (score >= 7 && score <= 9) {
			grade = 'A';
		}

		return { score, grade };
	};

	const fetchData = async (assetCode) => {
		try {
			const response = await api.get(`${urlConfig}/asset1/${assetCode}`);
			const data = response.data;

			setCommonData(data.assetDto);
			setCommonColumns(columns);
			setCommonColumns1(columns1);
			setCommonColumns2(columns2);
			setSubColumns(getClassificationColumns(data.assetDto.assetClassification));

			switch (data.assetDto.assetClassification) {
				case '소프트웨어':
					setSubData([data.softwareDto]);
					break;
				case '차량':
					setSubData([data.carDto]);
					break;
				case '기기':
					setSubData([data.devicesDto]);
					break;
				case '문서':
					setSubData([data.documentDto]);
					break;
				case '단말기':
					setSubData([data.terminalDto]);
					break;
				case '가구':
					setSubData([data.furnitureDto]);
					break;
				case '기타':
					setSubData([data.otherAssetsDto]);
					break;
				case 'IT 장비 - 시스템':
					setSubData([data.itSystemEquipmentDto]);
					break;
				case '응용프로그램':
					setSubData([data.applicationProgramDto]);
					break;
				case 'IT 장비 – 네트워크':
					setSubData([data.itNetworkEquipmentDto]);
					break;
				case '전자정보':
					setSubData([data.electronicInformationDto]);
					break;
				case '특허 및 상표':
					setSubData([data.patentsAndTrademarks]);
					break;
				case '정보보호시스템':
					setSubData([data.informationProtectionSystemDto]);
					break;
			}

			setMaintainHistoryData(data.repairList);
			setSurveyHistoryData(data.assetSurveyList);
			setUpdateHistoryData(data.updateList);

			data.fileList.forEach((file) => {
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
					default:
						break;
				}
			});

			setLoading(false);
		} catch (error) {
			console.error('Fetch data error:', error);
			setError(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData(assetCode);
	}, [assetCode]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return (
			<Alert
				variant="danger"
				className="mb-0 text-center d-flex align-items-center justify-content-center"
				style={{ height: '100%' }}
			>
				해당 자산을 찾을 수 없습니다.
			</Alert>
		);
	}

	const USERMANUAL = attachment
		? [
				{
					icon: 'mdi mdi-file-pdf-box font-16',
					name: attachment.oriFileName,
					size: attachment.fileSize,
					location: attachment.fileURL,
				},
		  ]
		: [];

	const WARRANTYDETAILS = warrantyDetail
		? [
				{
					icon: 'mdi mdi-file-pdf-box font-16',
					name: warrantyDetail.oriFileName,
					size: warrantyDetail.fileSize,
					location: warrantyDetail.fileURL,
				},
		  ]
		: [];

	return (
		<>
			<Row className="mb-3">
				<div>
					{photo?.fileURL ? (
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
								backgroundColor: '#f0f0f0',
								border: '1px dashed #ccc',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								color: '#aaa',
							}}
						>
							<span>이미지가 없습니다</span>
						</div>
					)}
				</div>
			</Row>

			<Row className="mb-3">
				<Col xs={12}>
					<Card>
						<Card.Body>
							<Row>
								<Col xs={12}>
									<p>
										<strong>자산 이름:</strong> {commonData.assetName}
									</p>
								</Col>
								<Col xs={12}>
									<p>
										<strong>자산 코드:</strong> {commonData.assetCode}
									</p>
								</Col>
								<Col xs={12}>
									<p>
										<strong>목적:</strong> {commonData.purpose}
									</p>
								</Col>
								<Col xs={12}>
									<p>
										<strong>중요성 등급:</strong>{' '}
										{calculateImportance(commonData).grade}
									</p>
								</Col>
								<Col xs={12}>
									<p>
										<strong>부서:</strong> {commonData.department}
									</p>
								</Col>
								<Col xs={12}>
									<p>
										<strong>자산 위치:</strong> {commonData.assetLocation}
									</p>
								</Col>
								<Col xs={12}>
									<p>
										<strong>사용자:</strong> {commonData.assetUser}
									</p>
								</Col>
								<Col xs={12}>
									<p>
										<strong>소유자:</strong> {commonData.assetOwner}
									</p>
								</Col>
								<Col xs={12}>
									<p>
										<strong>관리자:</strong> {commonData.assetSecurityManager}
									</p>
								</Col>
								<Col xs={12}>
									<p>
										<strong>소유 형태:</strong> {commonData.ownership}
									</p>
								</Col>
								<Col xs={12}>
									<p>
										<strong>내용 연수:</strong> {commonData.usefulLife}
									</p>
								</Col>
								<Col xs={12}>
									<p>
										<strong>취득 경로:</strong> {commonData.acquisitionRoute}
									</p>
								</Col>
								<Col xs={12}>
									<p>
										<strong>유지 기간:</strong> {commonData.maintenancePeriod}
									</p>
								</Col>
								{/* 추가 항목 필요 시 여기에 */}
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Row className="mb-3">
				<Accordion alwaysOpen>
					<Accordion.Item eventKey="0">
						<Accordion.Header>자산 세부 정보</Accordion.Header>
						<Accordion.Body>
							<Row className="mb-3">
								<div className="table-responsive">
									{[
										commonColumns,
										commonColumns2,
										commonColumns1,
										subColumns,
									].map((col, index) => (
										<Table
											key={index}
											theadClass="table-dark"
											tableClass="border-black"
											columns={col}
											data={[commonData]} // 배열 형태로 전달
											isSortable={true}
											pagination={false}
											isExpandable={false}
											isSearchable={false}
											isSelectable={false}
										/>
									))}
								</div>
							</Row>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</Row>

			<Row className="mb-3">
				<Col>
					<h4>보증 세부사항</h4>
					<QuickAccess quickAccessFiles={WARRANTYDETAILS} />
				</Col>
				<Col>
					<h4>사용자 메뉴얼</h4>
					<QuickAccess quickAccessFiles={USERMANUAL} />
				</Col>
			</Row>

			<MaintainRegister
				assetCode={commonData.assetCode}
				assetName={commonData.assetName}
				assetNo={commonData.assetNo}
			/>

			{/* Tabs1 컴포넌트 */}
			{/* <Row>
                <Tabs1 updateList={updateHistoryData} repairList={maintainHistoryData} surveyList={surveyHistoryData} />
            </Row> */}
		</>
	);
};

export default Test;

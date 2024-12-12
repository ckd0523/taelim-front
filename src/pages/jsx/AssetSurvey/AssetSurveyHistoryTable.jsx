import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '@/common/api/authAxios';
import { Row, Col, Card } from 'react-bootstrap';
import { Table2 } from '../../../components/table/Table2';
import assetSurveyLocation from './assetSurveyLocation';
//import StatusColumn from './TableColumnSet';

const URL = import.meta.env.VITE_BASIC_URL;

const columns = [
	{ Header: '자산 조사 번호', accessor: 'assetSurveyNo', show: false },
	{ Header: '회차', accessor: 'round', defaultCanSort: true },
	{
		Header: '위치',
		accessor: 'assetSurveyLocation',
		defaultCanSort: false,
		Cell: ({ value }) => {
			const location = assetSurveyLocation.find((loc) => loc.value === value);
			return location ? location.label : value; // 매칭되는 label을 찾아 표시
		},
	},
	{ Header: '자산조사일자', accessor: 'assetSurveyStartDate', defaultCanSort: false },
	{ Header: '자산조사자', accessor: 'assetSurveyBy', defaultCanSort: false },
	{
		Header: '상태',
		accessor: 'surveyStatus',
		defaultCanSort: true,
		//Cell: StatusColumn,
		Cell: ({ value }) => (value === '' ? null : value ? '완료' : '진행 중'),
	},
];

const tableData = [
	{
		round: '',
		assetSurveyLocation: '',
		assetSurveyStartDate: '',
		assetSurveyBy: '',
		surveyStatus: '',
	},
];

/*
const sizePerPageList = [
	{ text: '5', value: 5 },
	{ text: '10', value: 10 },
	{ text: '25', value: 25 },
	{ text: '100', value: 100 },
];
*/

const SurveyTable = ({ tableChange, setSelectedRows, data, setData, setOriginalData }) => {
	//const [isDataExist, setIsDataExist] = useState(false); //fetch로 데이터를 못불러 왔는지
	//const { removeSession } = useAuthContext();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get(`${URL}/assetSurveyHistory`);
				//검색을 위해서 불변 데이터를 하나 더 만들어줌
				console.log('자산 조사 테이블 1 : ' + JSON.stringify(response));
				console.log(response.status);

				if (response.status === 403) {
					//setData(tableData);
				} else {
					setData(response.data); // API로부터 받은 데이터 설정
					setOriginalData(response.data);
				}
			} catch (error) {
				//console.log("자산 조사 테이블 2");
				//setData(tableData);

				//setIsDataExist(true);
				console.error('Error fetching data:', error);
				//removeSession();
			}
		};

		fetchData();
	}, [tableChange]);

	return (
		<Row className="pt-3">
			<Col>
				<Card>
					<Card.Body>
						{/* 이 Table은 리액트의 테이블이 아니라 Hyper의 테이블임 */}
						<Table2
							columns={columns}
							data={data}
							pagesize={5}
							//sizePerPageList={sizePerPageList}
							theadClass="table-dark"
							tableClass="border-black"
							isSortable={true}
							pagination={true}
							isSelectable={true}
							//isDataExist={isDataExist}
							setSelectedRows={setSelectedRows}
						/>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

const DetailTable = ({ detailColumn, detailData }) => {
	return (
		<Table2
			columns={detailColumn}
			data={detailData}
			pagesize={5}
			sizePerPageList={20}
			tableClass="border-black"
			isSortable={true}
			pagination={true}
			isSelectable={false}
		/>
	);
};

export { SurveyTable, DetailTable };
//default하면 하나만 내보내는데 가져올 때 명시적으로 안 가져와도 됨.
//default 빼고 { }는 여러 개의 컴포넌트를 내보낼 때 사용하지만 명시적으로 가져와야 함.

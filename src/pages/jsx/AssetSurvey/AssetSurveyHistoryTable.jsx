import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card } from 'react-bootstrap';
import { Table2 } from '../../../components/table/Table2';
import assetSurveyLocation from './assetSurveyLocation';
//import StatusColumn from './TableColumnSet';

const URL = import.meta.env.VITE_BASIC_URL;

const columns = [
  { Header: '회차', accessor: 'round', defaultCanSort: true, },
  {
    Header: '위치', accessor: 'assetSurveyLocation', defaultCanSort: false,
    Cell: ({ value }) => {
      const location = assetSurveyLocation.find(loc => loc.value === value);
      return location ? location.label : value; // 매칭되는 label을 찾아 표시
    },
  },
  { Header: '자산조사일자', accessor: 'assetSurveyStartDate', defaultCanSort: false, },
  { Header: '자산조사자', accessor: 'assetSurveyBy', defaultCanSort: false, },
  {
    Header: '상태', accessor: 'surveyStatus', defaultCanSort: false,
    //Cell: StatusColumn,
    Cell: ({ value }) => (value ? '완료' : '진행 중')
  },
];

const sizePerPageList = [
  { text: '5', value: 5, },
  { text: '10', value: 10, },
  { text: '25', value: 25, },
  { text: '100', value: 100, },
];

const SurveyTable = ({ tableChange }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/assetSurveyHistory`);
        setData(response.data); // API로부터 받은 데이터 설정
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [tableChange]);

  return (
    <Row>
      <Card></Card>
      <Col>
        <Card>
          <Card.Body>
            {/* 이 Table은 리액트의 테이블이 아니라 Hyper의 테이블임 */}
            <Table2
              columns={columns}
              data={data}
              pagesize={5}
              sizePerPageList={sizePerPageList}
              isSortable={true}
              pagination={true}
              isSelectable={true}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

};

export default SurveyTable;
//default하면 하나만 내보내는데 가져올 때 명시적으로 안 가져와도 됨.
//default 빼고 { }는 여러 개의 컴포넌트를 내보낼 때 사용하지만 명시적으로 가져와야 함.
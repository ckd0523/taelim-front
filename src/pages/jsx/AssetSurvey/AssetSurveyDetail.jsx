import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import assetSurveyLocation from './assetSurveyLocation';
import { useState } from 'react';
import { Table } from '@/components';
import { DetailTable } from './data';

const columns = [
  { Header: '자산 코드', accessor: 'round', defaultCanSort: true, },
  { Header: '자산명', accessor: 'assetSurveyLocation', defaultCanSort: false, },
  { Header: '자산 소유자', accessor: 'assetSurveyStartDate', defaultCanSort: false, },
  { Header: '자산 담당자', accessor: 'assetSurveyBy', defaultCanSort: false, },
  { Header: '정위치 유무', accessor: 'surveyStatus', defaultCanSort: false, },
  { Header: '상태', accessor: 'surveyStatus', defaultCanSort: false, },
  { Header: '내용', accessor: 'surveyStatus', defaultCanSort: false, },
];

const AssetSurveyDetail = () => {
  const locationParam = useLocation();
  //console.log(locationParam);
  const locationValue = locationParam.state.location;

  // locationValue를 기반으로 매칭되는 label을 찾음
  const matchedLocation = assetSurveyLocation.find(loc => loc.value === locationValue);
  const surveyStartDate = locationParam.state.surveyStartDate;
  const surveyBy = locationParam.state.surveyBy;
  const assetSurveyNo = locationParam.state.assetSurveyNo;

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const data = DetailTable(assetSurveyNo);

  return (
    <div>
      <Card></Card>

      <Card>
        <Card.Body>
          <Row>
            <Col>
              <strong>위치 : </strong>
              <span>{/* 매칭되는 location이 있으면 label을 표시, 없으면 locationValue 그대로 표시 */}
                {matchedLocation ? matchedLocation.label : locationValue}</span>
            </Col>

            <Col>
              <strong>자산 조사일 : </strong>
              <span>{surveyStartDate}</span>
            </Col>

            <Col>
              <strong>자산 조사자 : </strong>
              <span>{surveyBy}</span>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className='justify-content-between'>
        <Col lg={5}>
          <Row>
            <Col>
              {/* <p style={{ marginBottom: 8, marginTop: 4 }}><strong>미확인 자산</strong></p> */}
              <Form.Check
                type="checkbox"
                id="btn-check"
                className="btn-check"
                checked={isChecked}
                onChange={handleToggle}
                autoComplete="off"
              />

              <Button
                variant="outline-primary"
                as="label"
                htmlFor="btn-check"
                active={isChecked} // 활성화된 상태일 때 스타일 적용
              >
                <strong>미확인 자산 보기</strong>
              </Button>
            </Col>

            <Col>
              <Form>
                <Form.Switch
                  id="custom-switch"
                >
                </Form.Switch>
              </Form>
            </Col>
          </Row>
        </Col>

        <Col className='col-auto'>
          <Button>QR인식</Button>
        </Col>
      </Row>

      <Card></Card>

      <Card>
        <Card.Body>
          <p>테이블 들어갈 자리</p> {/*
          <Table>
            columns={columns}
            data={data}
            pagesize={5}
            sizePerPageList={20}
            isSortable={true}
            pagination={true}
            isSelectable={true}
          </Table>
          */}
        </Card.Body>
      </Card>

    </div >
  );
};

export default AssetSurveyDetail;
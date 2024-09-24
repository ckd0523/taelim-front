import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import assetSurveyLocation from './assetSurveyLocation';
import { useState } from 'react';
//import { Table } from '@/components';
import { getDetailTable } from './data';
import { DetailTable } from './AssetSurveyHistoryTable';

const columns = [
  { Header: '자산 코드', accessor: 'assetCode', defaultCanSort: true, },
  { Header: '자산명', accessor: 'assetName', defaultCanSort: false, },
  { Header: '자산 소유자', accessor: 'assetOwner', defaultCanSort: false, },
  { Header: '자산 담당자', accessor: 'assetSecurityManager', defaultCanSort: false, },
  {
    Header: '정위치 유무', accessor: 'exactLocation',
    Cell: ({ row }) => (
      <input
        type='checkbox'
        //checked={row.original.exactLocation}
        onChange={(e) => handleCheckboxChange(e, row, 'exactLocation')}
      />
    )
  },
  {
    Header: '상태', accessor: 'assetStatus',
    Cell: ({ row }) => (
      <input
        type='checkbox'
        //checked={row.original.assetStatus}
        onChange={(e) => handleCheckboxChange(e, row, 'assetStatus')}
      />
    )
  },
  {
    Header: '내용', accessor: 'assetSurveyContent',
    Cell: ({ }) => (
      <input
        type='text'
      />
    )
  },
];

const handleCheckboxChange = (e, row, fieldName) => {
  const updatedRow = {
    ...row.original,
    [fieldName]: e.target.checked,
  };
  console.log('Updated Row:', updatedRow);
  // 상태를 업데이트하는 로직 추가
};

const AssetSurveyDetail = () => {
  const locationParam = useLocation();
  /*
  //console.log(locationParam);
  const locationValue = locationParam.state.location;

  // locationValue를 기반으로 매칭되는 label을 찾음
  const matchedLocation = assetSurveyLocation.find(loc => loc.value === locationValue);
  const surveyStartDate = locationParam.state.surveyStartDate;
  const surveyBy = locationParam.state.surveyBy;
  const assetSurveyNo = locationParam.state.assetSurveyNo;
  */

  //테이블의 페이지가 넘어갈 때 계속 locationValue를 세팅하는 코드가 작동하는데
  //그 데이터가 자산 조사 이력에서 넘어오지 않아 null이 되어 useState로 값을 유지해야함
  // useState로 locationParam의 값을 저장
  const [locationState, setLocationState] = useState({
    location: locationParam.state?.location || '', // 초기값이 없을 경우 ''로 설정
    surveyStartDate: locationParam.state?.surveyStartDate || '',
    surveyBy: locationParam.state?.surveyBy || '',
    assetSurveyNo: locationParam.state?.assetSurveyNo || ''
  });

  // locationState.location을 기반으로 매칭되는 label을 찾음
  const matchedLocation = assetSurveyLocation.find(
    loc => loc.value === locationState.location
  );

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  //console.log('선택한 레코드 자산 번호 : ' + locationState.assetSurveyNo);
  const data = getDetailTable(locationState.assetSurveyNo);
  //console.log('얘가 null이라고? : ' + data);

  return (
    <div>
      <Card></Card>

      <Card>
        <Card.Body>
          <Row>
            <Col>
              <strong>위치 : </strong>
              <span>{/* 매칭되는 location이 있으면 label을 표시, 없으면 locationValue 그대로 표시 */}
                {matchedLocation ? matchedLocation.label : locationState.location}</span>
            </Col>

            <Col>
              <strong>자산 조사일 : </strong>
              <span>{locationState.surveyStartDate}</span>
            </Col>

            <Col>
              <strong>자산 조사자 : </strong>
              <span>{locationState.surveyBy}</span>
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

          {/* 
          <p>테이블 들어갈 자리</p>  */}
          {data && data.length > 0 ? (
            <DetailTable detailColumn={columns} detailData={data} />
          ) : (
            <p>데이터가 없습니다.</p>  // 데이터가 없을 때 보여줄 내용
          )}

        </Card.Body>
      </Card>

      <Row className='row-cols-auto justify-content-end'>
        <Col>
          <Button className='btn btn-success'>완료</Button>
        </Col>
        <Col>
          <Button className='btn btn-danger'>취소</Button>
        </Col>
      </Row>
      <Card></Card>

    </div >
  );
};

export default AssetSurveyDetail;
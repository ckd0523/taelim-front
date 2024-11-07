import { Container, Row, Col, Card } from 'react-bootstrap';
import TotalAssetRatio from './TotalAssetRatio';
import { LocationStatus, SelectedLocation } from './LocationStatus';
//import Header from './Header';
import OperationStatus from './OperationStatus';
import { DepartmentStatus, DepartmentStatus2 } from './DepartmentStatus';
//import AssetStatus from './AssetStatus';
import OwnerShipStatus from './OwnerShipStatus';
import ImportantStatus from './ImportantStatus';
import { useState } from 'react';
import AssetTrend from './AssetTrend';
import PlannedDisposalStatus from './PlannedDisposalStatus';
//import ZoomableTimeseriesChart from './ZoomableChart';

const Dashboard_JCY = () => {
  const [location, setLocation] = useState("공장동");

  return (
    <>
      <Container fluid>
        <br />
        <Row>
          <Col>
            <div>
              <h4 className="px-2 header-title">자산 현황</h4>
            </div>
          </Col>
        </Row>
        <br />

        <Row>
          {/*style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} */}
          <Col md={12} >
            <Card style={{ width: '100%', height: '93%' }}>
              <Card.Body>
                {/* 자산 정보 */}
                {/* 
                <AssetInfo />*/}
                {/* 자산 총액 추이 */}
                <AssetTrend />
              </Card.Body>
            </Card>


          </Col>
        </Row>

        <Row>
          <Col md={4}>
            {/* 분류별 자산 비율 */}
            <TotalAssetRatio />
          </Col>

          <Col md={5}>
            {/* 부서별 자산현황1 */}
            <DepartmentStatus2 />
          </Col>

          <Col md={3}>
            {/* 운용 현황 */}
            <OperationStatus />
          </Col>
        </Row>

        <Row >
          <Col md={6}>
            {/* 선택한 위치별 현황 */}
            <SelectedLocation location={location} />
          </Col>

          <Col md={6}>
            {/* 위치별 현황 */}
            <LocationStatus setLocation={setLocation} />
          </Col>
        </Row>



        <Row>


          <Col md={7}>
            <Row>
              <Col md={6}>
                {/* 소유권별 현황 */}
                <OwnerShipStatus />
              </Col>

              <Col md={6}>
                {/* 중요성별 현황 */}
                <ImportantStatus />
              </Col>
            </Row>
          </Col>
          <Col md={5}>
            {/* 폐기 예정 현황 */}
            <PlannedDisposalStatus />
          </Col>
        </Row>

      </Container>
    </>
  );
};

export { Dashboard_JCY };
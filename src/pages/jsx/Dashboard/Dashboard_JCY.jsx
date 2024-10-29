import { Container, Row, Col, Card } from 'react-bootstrap';
import TotalAssetRatio from './TotalAssetRatio';
import { LocationStatus, SelectedLocation } from './LocationStatus';
import Header from './Header';
//import AssetStatus from './AssetStatus';
import OperationStatus from './OperationStatus';
import { DepartmentStatus, DepartmentStatus2 } from './DepartmentStatus';
import AssetStatus from './AssetStatus';
import OwnerShipStatus from './OwnerShipStatus';
import ImportantStatus from './ImportantStatus';
import { useState } from 'react';
import AssetTrend from './AssetTrend';
import PlannedDisposalStatus from './PlannedDisposalStatus';

const Dashboard_JCY = () => {
  const [location, setLocation] = useState("공장동");

  return (
    <>
      <br></br>
      <Container fluid>
        {/* 중요알림 및 경고 / 자산 총액 */}
        <Header />
      </Container>

      <Container fluid>
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
          <Col md={4}>
            {/* 분류별 자산 비율 */}
            <TotalAssetRatio />
          </Col>

          <Col md={4}>
            {/* 자산 현황 */}
            <AssetStatus />
          </Col>

          <Col md={4}>
            {/* 가동 현황 */}
            <OperationStatus />
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            {/* 부서별 자산현황1 */}
            <DepartmentStatus />
          </Col>

          <Col md={4}>
            {/* 부서별 자산현황1 */}
            <DepartmentStatus2 />
          </Col>

          <Col md={4}>
            <Row>
              <Col md={5}>
                {/* 소유권별 현황 */}
                <OwnerShipStatus />
              </Col>

              <Col md={7}>
                {/* 중요성별 현황 */}
                <ImportantStatus />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col md={7}>
            {/* 자산 총액 추이 */}
            <AssetTrend />
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
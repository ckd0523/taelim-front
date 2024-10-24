import { Container, Row, Col, Card } from 'react-bootstrap';
import TotalAssetRatio from './TotalAssetRatio';
import LocationStatus from './LocationStatus';
import Header from './Header';
import AssetStatus from './AssetStatus';
import OperationStatus from './OperationStatus';
import DepartmentStatus from './DepartmentStatus';

const Dashboard_JCY = () => {

  return (
    <>
      <br></br>
      <Container fluid>
        {/* 중요알림 및 경고 / 자산 총액 */}
        <Header />
      </Container>

      <Container fluid>
        <Row>
          <Col md={4}>
            {/* 분류별 자산 비율 */}
            <TotalAssetRatio />
          </Col>
          <Col md={8}>
            {/* 위치별 현황 */}
            <LocationStatus />
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            {/* 자산 현황 */}
            <AssetStatus />
          </Col>

          <Col md={4}>
            {/* 부서별 자산현황 */}
            <DepartmentStatus />
          </Col>

          <Col md={4}>
            {/* 가동 현황 */}
            <OperationStatus />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export { Dashboard_JCY };
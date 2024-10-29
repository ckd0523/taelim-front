import { Row, Col, Table, Card } from 'react-bootstrap';

const Header = () => {

  return (
    <Card>
      <Row className="p-3">
        <Col lg={6}>
          <h4 className="header-title" style={{ color: 'red' }}>중요알림 및 경고</h4>
          <Table className="border-black">
            <thead className="table-dark">
              <tr>
                <th>유지보수</th>
                <th>계약만료</th>
                <th>이상지출</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3건</td>
                <td>1건</td>
                <td>-</td>
              </tr>
            </tbody>
          </Table>
        </Col>

        <Col lg={6}>
          <h4 className="header-title" style={{ color: 'red' }}>자산총액</h4>
          <Table className="border-black">
            <thead className="table-dark">
              <tr>
                <th>태림</th>
                <th>정부지원</th>
                <th>기타</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>100,00,000원</td>
                <td>50,00,000원</td>
                <td>250,000원</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

    </Card >
  );
};

export default Header;
import { Row, Col, Table, Card } from 'react-bootstrap';

const Header = () => {

  return (
    <Card>
      <Row className="p-3">
        <Col lg={6}>
          <h4 className="header-title" style={{ color: 'red' }}>자산 정보</h4>
          <Table className="border-black">
            <thead className="table-dark">
              <tr>
                <th>유지보수</th>
                <th>자산 조사</th>
                <th>총 자산 수</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3건</td>
                <td>0건</td>
                <td>4839개</td>
              </tr>
            </tbody>
          </Table>
        </Col>

        <Col lg={6}>
          <h4 className="header-title" style={{ color: 'red' }}>자산총액</h4>
          <Table className="border-black">
            <thead className="table-dark">
              <tr>
                <th>총액</th>
                <th>소유</th>
                <th>임대</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>525,00,000원</td>
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
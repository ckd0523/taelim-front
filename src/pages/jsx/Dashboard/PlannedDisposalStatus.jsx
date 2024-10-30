import { Card, Col, Row, Form } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

const PlannedDisposalStatus = () => {
  const data = {
    labels: [
      '정보보호시스템', '응용프로그램', '소프트웨어', '전자정보', '문서',
      '특허 및 상표', 'IT 장비 - 시스템', 'IT 장비 – 네트워크', '단말기',
      '가구', '기기', '차량', '기타',
    ],
    datasets: [{
      //label: '자산 수량',
      data: [7, 13, 4, 19, 2, 15, 8, 11, 0, 16, 5, 20, 3],
      backgroundColor: [
        'rgba(206, 110, 15, 1)', 'rgba(206, 110, 15, 1)', 'rgba(206, 110, 15, 1)', 'rgba(206, 110, 15, 1)', 'rgba(206, 110, 15, 0.9)',
        'rgba(206, 110, 15, 0.9)', 'rgba(206, 110, 15, 0.9)', 'rgba(206, 110, 15, 0.9)', 'rgba(206, 110, 15, 0.8)', 'rgba(206, 110, 15, 0.8)',
        'rgba(206, 110, 15, 0.8)', 'rgba(206, 110, 15, 0.8)', 'rgba(206, 110, 15, 0.7)',
      ],
      borderColor: '#fff',
      borderWidth: 1,
    }],

  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "#fff",
        font: {
          size: 14,
        },
        anchor: "center",
        align: "center",
      },
    },

  };

  return (
    <Card style={{ width: '100%', height: '93%' }}>
      <Card.Body>
        <Row>
          <Col>
            <h4 className="header-title">폐기 예정 현황</h4>
          </Col>

          <Col sm={4}>
            <Form>
              <Form.Control
                type='month'>

              </Form.Control>
            </Form>
          </Col>
        </Row>

        <div style={{ width: "100%", height: "87%" }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default PlannedDisposalStatus;
import { Card, Row, Col } from "react-bootstrap";
import { Doughnut, Bar } from 'react-chartjs-2';

const OperationStatus = () => {
  const doughnutData = {
    labels: ['가동', '미가동', '고장', '미확인'],
    datasets: [
      {
        data: [452, 70, 5, 30],
        backgroundColor: ['#5a85dc', '#f2a049', '#e15759', '#acaba6'],
        hoverBackgroundColor: ['#5a85dc', '#f2a049', '#e15759', '#acaba6'],
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      datalabels: {
        color: 'white',
        font: {
          size: 15,
        },
      },
    },
  };

  //----------------------------------------------------------------------------
  const barData = {
    labels: ['사용중', '부서짐', '유지 보수 중', '기타'],
    datasets: [
      {
        data: [75, 20, 5, 0],
        backgroundColor: '#5a85dc',
      },
    ],
  };

  const barOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title">가동 현황</h4>
        <Col>
          <Row>
            {/* <Doughnut data={doughnutData} options={doughnutOptions} height={135} /> */}
            <Doughnut data={doughnutData} options={doughnutOptions} height={215} />
          </Row>
          {/*
          <Row>
            <Bar data={barData} options={barOptions} height={80} />
          </Row>
          */}
        </Col>
      </Card.Body>
    </Card>
  );
};

export default OperationStatus;

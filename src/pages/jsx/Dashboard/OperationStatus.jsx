import { Card } from "react-bootstrap";
import { Doughnut } from 'react-chartjs-2';

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
    <Card style={{ width: '100%', height: '93%' }}>
      <Card.Body>
        <h4 className="header-title">가동 현황</h4>
        {/* 도넛을 div나 아무거나로 감싸줘야함 */}
        <div style={{ width: "100%", height: "93%" }}>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default OperationStatus;

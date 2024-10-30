import { Button, Card, Col, Row } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Select from 'react-select';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const label = ['경영기획실', '관리팀', '영업팀', '구매팀', '품질팀', '생산팀', '기술연구소'];

const DepartmentStatus = () => {
  // Define the data for the Chart.js bar chart
  const data = {
    labels: label,
    datasets: [
      {
        label: 'Data1',
        data: [44, 55, 41, 67, 22, 43, 21],
        backgroundColor: '#4E79A7',
      },
      {
        label: 'Data2',
        data: [44, 55, 41, 67, 22, 43, 21],
        backgroundColor: '#F28E2B',
      },
      {
        label: 'Data3',
        data: [44, 55, 41, 67, 22, 43, 21],
        backgroundColor: '#76B7B2',
      },
      {
        label: 'Data4',
        data: [44, 55, 41, 67, 22, 43, 21],
        backgroundColor: '#E15759',
      },
      {
        label: 'Data5',
        data: [44, 55, 41, 67, 22, 43, 21],
        backgroundColor: '#59A14F',
      },
      {
        label: 'Data6',
        data: [44, 55, 41, 67, 22, 43, 21],
        backgroundColor: '#acaba6',
      },
      {
        label: 'Data7',
        data: [44, 55, 41, 67, 22, 43, 21],
        backgroundColor: '#4E79A7',
      },
      {
        label: 'Data8',
        data: [44, 55, 41, 67, 22, 43, 21],
        backgroundColor: '#F28E2B',
      },
      {
        label: 'Data9',
        data: [44, 55, 41, 67, 22, 43, 21],
        backgroundColor: '#76B7B2',
      },
      {
        label: 'Data10',
        data: [44, 55, 41, 67, 22, 43, 21],
        backgroundColor: '#E15759',
      },
      {
        label: 'Data11',
        data: [44, 55, 41, 67, 22, 43, 21],
        backgroundColor: '#59A14F',
      },
      {
        label: 'Data12',
        data: [44, 55, 41, 67, 22, 43, 21],
        backgroundColor: '#acaba6',
      },
      {
        label: 'Data13',
        data: [44, 55, 41, 67, 22, 43, 21],
        backgroundColor: '#acaba6',
      },
    ],
  };

  // Define options for the bar chart
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Card에 꽉 차도록 설정
    plugins: {
      legend: {
        position: 'right',
      },
      datalabels: {
        color: 'white',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            console.log(tooltipItem);
            const label = tooltipItem.dataset.label;
            const value = tooltipItem.raw; // 각 데이터 값
            return `${label}:${value}개`; // 툴팁에 표시할 내용
          },
        },
      },
    },
    scales: {
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: '개수',
        },
      },
      x: {
        stacked: true,
      }
    },
  };

  return (
    <Card style={{ width: '100%', height: '93%' }}>
      <Card.Body>
        <h4 className="header-title">부서별 자산현황1(부서별 각 자산 표시)</h4>
        <div style={{ width: "100%", height: "93%" }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

const DepartmentStatus2 = () => {
  // Define the data for the Chart.js bar chart
  const data = {
    labels: label,
    datasets: [
      {
        label: '개수',
        data: [340, 122, 230, 443, 90, 150, 200], // y축 값
        backgroundColor: [
          '#4E79A7',
          '#F28E2B',
          '#76B7B2',
          '#E15759',
          '#59A14F',
          '#acaba6',
          '#032767',
        ],
        borderColor: [
          '#4E79A7',
          '#F28E2B',
          '#76B7B2',
          '#E15759',
          '#59A14F',
          '#acaba6',
          '#032767',
        ],
        borderWidth: 1,
        barThickness: 45, // columnWidth 설정
      },

    ],
  };

  // Define options for the bar chart
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Card에 꽉 차도록 설정
    plugins: {
      legend: {
        //position: 'top',
        display: false,
      },
      datalabels: {
        color: '#fff',
        font: {
          size: 17,
        }
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw; // 각 데이터 값
            return `${value}개`; // 툴팁에 표시할 내용
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '개수',
        },
      },
      x: {
        grid: {
          display: false, // x축 그리드 라인 비활성화
        },
      },
    },
  };

  return (
    <Card style={{ width: '100%', height: '93%' }}>
      <Card.Body>
        <Row>
          <Col>
            <h4 className="header-title">부서별 자산현황</h4>
          </Col>

          <Col sm={4}>
            <Select
              options={[
                { value: '1', label: '경영기획실' },
                { value: '2', label: '관리팀' },
                { value: '3', label: '영업팀' },
                { value: '4', label: '구매팀' },
                { value: '5', label: '품질팀' },
                { value: '6', label: '생산팀' },
                { value: '7', label: '기술연구소' },
              ]}
            />
          </Col>
        </Row>

        <div style={{ width: "100%", height: "87%" }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export { DepartmentStatus, DepartmentStatus2 };

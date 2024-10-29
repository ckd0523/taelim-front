import { Card } from "react-bootstrap";
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
        '#f02424da', '#f0932fdf', '#ebe82be7', '#4b8e08dd', '#2a8cc9',
        '#1527ae', '#a842ec', '#d524d5', '#36899cea', '#1e8f80',
        '#a43e65', '#0a4e7889', '#9ea4a2',
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
        <h4 className="header-title">폐기 예정 현황(30일 내)</h4>
        <div style={{ width: "100%", height: "93%" }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default PlannedDisposalStatus;
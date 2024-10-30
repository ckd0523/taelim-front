import { Card } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";

const OwnerShipStatus = () => {
  const data = {
    labels: ["소유", "국책과제", "기타"],
    datasets: [
      {
        label: "개수",
        data: [423, 60, 37],
        backgroundColor: [
          "#5a85dc",
          "#acaba6",
          "#d88b3f",
        ],
        borderColor: [
          "#5a85dc",
          "#acaba6",
          "#d88b3f",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, // Pie 차트에서 범례는 표시하는 것이 일반적입니다.
        position: "bottom",
        labels: {
          font: {
            size: 17,
          },
        },
      },
      datalabels: {
        color: "#fff",
        font: {
          size: 17,
        },
        anchor: "center",
        align: "center",
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
  };

  return (
    <Card style={{ width: '100%', height: '93%' }}>
      <Card.Body>
        <h4 className="header-title">소유권별 현황</h4>
        <div style={{ width: "100%", height: "93%" }}>
          <Doughnut data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default OwnerShipStatus;

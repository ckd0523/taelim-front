import { Card } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";

const OwnerShipStatus = () => {
  const data = {
    labels: ["소유", "임대"],
    datasets: [
      {
        label: "개수",
        data: [423, 159],
        backgroundColor: [
          "#5a85dc",
          "#acaba6",
        ],
        borderColor: [
          "#5a85dc",
          "#acaba6",
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

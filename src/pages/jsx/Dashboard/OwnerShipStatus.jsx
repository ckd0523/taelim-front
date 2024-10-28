import { Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

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
        barThickness: 45,
      },
    ],
  };

  const options = {
    responsive: true,
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
    scales: {
      y: {
        title: {
          display: true,
          text: "개수",
        }
      }
    }
  };

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title">소유권별 현황</h4>
        <Bar data={data} options={options} height={215} />
      </Card.Body>
    </Card>
  );
};

export default OwnerShipStatus;
import { Card } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";

const ImportantStatus = () => {
  const data = {
    labels: ["A급", "B급", "C급"],
    datasets: [
      {
        data: [244, 111, 642],
        backgroundColor: [
          "#5a85dc",
          "#f28e2b",
          "#acaba6",
        ],
        borderColor: [
          "#5a85dc",
          "#f28e2b",
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
        display: true,
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
        <h4 className="header-title">중요성별 현황</h4>
        <div style={{ width: "100%", height: "93%" }}>
          <Doughnut data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ImportantStatus;

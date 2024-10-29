import { Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

const ImportantStatus = () => {
  const data = {
    labels: ["A급", "B급", "C급"],
    datasets: [
      {
        //label: "개수",
        data: [244, 111, 642],
        backgroundColor: [
          "#e15759",
          "#f28e2b",
          "#59a14f",
        ],
        borderColor: [
          "#e15759",
          "#f28e2b",
          "#59a14f",
        ],
        borderWidth: 1,
        barThickness: 45,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Card에 꽉 차도록 설정
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
    <Card style={{ width: '100%', height: '93%' }}>
      <Card.Body>
        <h4 className="header-title">중요성별 현황</h4>
        <div style={{ width: "100%", height: "93%" }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ImportantStatus;
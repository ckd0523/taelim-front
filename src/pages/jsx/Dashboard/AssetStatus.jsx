import { Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // 플러그인 추가

// Chart.js에 필요한 스케일과 요소를 등록합니다.
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const AssetStatus = () => {
  const data = {
    labels: ["Data1", "Data2", "Data3", "Data4", "Data5", "Data6"],
    datasets: [
      {
        label: "개수",
        data: [21, 22, 10, 28, 16, 30],
        backgroundColor: [
          "#4E79A7", // 책상
          "#F28E2B", // 의자
          "#76B7B2", // 노트북
          "#E15759", // 컴퓨터
          "#59A14F", // 복합기
          "#acaba6", // 기타
        ],
        borderColor: ["#4E79A7", "#F28E2B", "#76B7B2", "#E15759", "#59A14F", "#acaba6"],
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
        color: "#fff", // 데이터 레이블 텍스트 색상 설정
        font: {
          size: 14,
          //weight: "bold",
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
        titleFont: {
          size: 20
        },
        bodyFont: {
          size: 20
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "개수",
        },
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title">자산현황</h4>
        <Bar data={data} options={options} height={215} />
      </Card.Body>
    </Card>
  );
};

export default AssetStatus;

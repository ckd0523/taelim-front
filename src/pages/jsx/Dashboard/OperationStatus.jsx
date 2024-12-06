import { Card } from "react-bootstrap";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // 플러그인 추가
import { useState } from "react";
import { useEffect } from "react";
import api from "@/common/api/authAxios";
import noData from "./NoData";

// Chart.js에 필요한 스케일과 요소를 등록합니다.
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const URL = import.meta.env.VITE_BASIC_URL;

const OperationStatus = () => {
  const [opertaionData, setOperationData] = useState();
  const [isDataExist, setIsDataExist] = useState(false);

  useEffect(() => {
    const getOperationData = async () => {
      const response = await api.get(`${URL}/chart/5`);
      console.log(response.data);
      setOperationData(Object.values(response.data));
      if (response.data) {
        setIsDataExist(true);
      }
    };

    getOperationData();
  }, []);

  const doughnutData = {
    labels: ['가동', '미가동', '고장'],
    datasets: [
      {
        data: opertaionData,
        backgroundColor: ['#5a85dc', '#acaba6', '#e15759'],
        //hoverBackgroundColor: ['#5a85dc', '#acaba6', '#e15759'],
        borderColor: ['#5a85dc', '#acaba6', '#e15759'],
        BsBorderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: isDataExist,
        position: 'bottom',
        labels: {
          font: {
            size: 17,
          },
        },
      },
      datalabels: {
        color: '#fff',
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
        <h4 className="header-title">운용 현황</h4>
        {/* 도넛을 div나 아무거나로 감싸서 height가 100%가 되지 않도록 해야함 */}
        <div style={{ width: "100%", height: "93%" }}>
          <Doughnut data={doughnutData} options={doughnutOptions} plugins={noData} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default OperationStatus;

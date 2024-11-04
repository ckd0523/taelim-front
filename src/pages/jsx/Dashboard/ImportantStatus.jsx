import { Card } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import noData from "./NoData";
import { useState } from "react";
import { useEffect } from "react";
import api from "@/common/api/authAxios";

const URL = import.meta.env.VITE_BASIC_URL;

const ImportantStatus = () => {
  const [impoertantData, setImportantData] = useState();
  const [isDataExist, setIsDataExist] = useState(false);

  useEffect(() => {
    const getImportantData = async () => {
      const response = await api.get(`${URL}/???`);
      console.log(response.data);
      setImportantData(response.data);
      if (response.data) {
        setIsDataExist(true);
      }
    };

    getImportantData();
  }, []);

  const data = {
    labels: ["A급", "B급", "C급"],
    datasets: [
      {
        data: impoertantData,
        backgroundColor: [
          "#5a85dc", "#d88b3f", "#acaba6",
        ],
        borderColor: [
          "#5a85dc", "#d88b3f", "#acaba6",
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
        display: isDataExist,
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
        <h4 className="header-title">중요성별 현황</h4>
        <div style={{ width: "100%", height: "93%" }}>
          <Doughnut data={data} options={options} plugins={noData} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ImportantStatus;

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

// Chart.js에 필요한 요소 및 플러그인 등록
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const AssetTrend = () => {
  // 금액 포맷팅 함수
  const formatCurrency = (value) => {
    if (value >= 100000000) {
      return `${(value / 100000000).toFixed(1)}억원`;
    } else if (value >= 10000) {
      return `${(value / 10000).toFixed(0)}만원`;
    } else {
      return `${value.toLocaleString()}원`;
    }
  };

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        borderColor: '#4e79a7',
        backgroundColor: '#5a85dc',
        borderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  });

  useEffect(() => {
    const generateRandomData = () => {
      const labels = [];
      const totalAssets = [];
      let currentValue = 10000000;

      for (let i = 0; i < 12; i++) {
        labels.push(`${i + 1}월`);

        if (i === 2) {
          currentValue -= Math.floor(Math.random() * 2000000);
        }

        if (i === 5) {
          currentValue -= Math.floor(Math.random() * 2000000);
        }

        if (i > 2) {
          currentValue += Math.floor(Math.random() * 1500000) + 250000;
        }

        totalAssets.push(currentValue);
      }

      setData({
        labels,
        datasets: [
          {
            data: totalAssets,
            borderColor: '#4e79a7',
            backgroundColor: '#5a85dc',
            borderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
          },
        ],
      });
    };

    generateRandomData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
        anchor: "top",
        align: "top",
        offset: 10,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `자산 총액: ${formatCurrency(value)}`;
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      y: {
        title: {
          display: true,
          text: '자산 총액',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          callback: function (value) {
            return formatCurrency(value);
          },
          font: {
            size: 12
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <Card style={{ width: '100%', height: '420px' }}>
      <Card.Body>
        <h4 className='header-title'>자산 총액 추이</h4>
        <div style={{ width: "100%", height: "93%" }}>
          <Line data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default AssetTrend;
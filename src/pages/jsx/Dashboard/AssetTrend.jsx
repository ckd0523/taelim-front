import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { offset } from '@popperjs/core';

// Chart.js에 필요한 요소 및 플러그인 등록
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const AssetTrend = () => {
  // 자산 총액 시계열 데이터
  const [data, setData] = useState({
    labels: [], // 날짜 또는 시간에 해당하는 레이블
    datasets: [
      {
        label: '자산 총액', // 데이터셋의 라벨
        data: [], // 자산 총액 데이터
        borderColor: '#ff6384', // 선 색상
        backgroundColor: 'rgba(255, 99, 132, 1)', // 배경 색상
        borderWidth: 2,
      },
    ],
  });

  // 컴포넌트가 마운트될 때 데이터 생성
  useEffect(() => {
    const generateRandomData = () => {
      const labels = [];
      const totalAssets = [];

      // 시작 값 설정
      let currentValue = 10000000; // 1천만 원

      // 예시로 12개월의 데이터 생성
      for (let i = 0; i < 12; i++) {
        labels.push(`${i + 1} 월`);

        // 첫 번째 하향 (예: 3개월 차)
        if (i === 2) {
          currentValue -= Math.floor(Math.random() * 2000000); // 최대 200만 원 하향
        }

        // 두 번째 하향 (예: 6개월 차)
        if (i === 5) {
          currentValue -= Math.floor(Math.random() * 2000000); // 최대 200만 원 하향
        }

        // 이후 값은 상승
        if (i > 2) {
          currentValue += Math.floor(Math.random() * 1500000) + 250000; // 매달 50만 원에서 300만 원 상승
        }

        // 현재 자산 총액을 데이터에 추가
        totalAssets.push(currentValue);
      }

      setData({
        labels,
        datasets: [
          {
            //label: '자산 총액',
            data: totalAssets,
            borderColor: '#ff6384',
            backgroundColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            pointRadius: 6, // 점의 크기 설정
            pointHoverRadius: 8, // 마우스 오버 시 점의 크기 설정
          },
        ],
      });
    };

    generateRandomData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "#000", // 데이터 레이블 텍스트 색상 설정
        font: {
          size: 14,
          //weight: "bold",
        },
        anchor: "top",
        align: "top",
        offset: 20,
      },
    },
    interaction: {
      intersect: false, //mode만 있으면 안되고 intersect가 false로 들어가야함
      mode: 'index',
    },
    scales: {
      y: {
        title: {
          display: true,
          text: '자산 총액(원)',
        },
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <h4 className='header-title'>자산 총액 추이</h4>
        <Line data={data} options={options} />
      </Card.Body>
    </Card >
  );
};

export default AssetTrend;

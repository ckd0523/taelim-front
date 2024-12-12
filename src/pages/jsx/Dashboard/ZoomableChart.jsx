import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const ZoomableAreaChart = () => {
  // 3년치 데이터 생성 함수
  const generateData = () => {
    const data = [];
    const basePrice = 50000000; // 기준 가격: 5천만원
    let currentPrice = basePrice;

    // 3년치 일별 데이터 생성 (약 1095일)
    for (let i = 0; i < 1095; i++) {
      // 날짜 생성
      const date = new Date(2021, 0, 1); // 2021년 1월 1일부터 시작
      date.setDate(date.getDate() + i);

      // 가격 변동 생성
      // 일별 -2% ~ +2% 사이의 랜덤한 변동
      const change = (Math.random() - 0.5) * 0.04;
      currentPrice = currentPrice * (1 + change);

      // 장기 추세를 위한 사인파 추가 (1년 주기)
      const trendEffect = Math.sin(i / 365 * Math.PI * 2) * basePrice * 0.1;
      currentPrice += trendEffect;

      // 최소가격 보장
      currentPrice = Math.max(currentPrice, basePrice * 0.5);

      data.push([date.getTime(), Math.round(currentPrice)]);
    }
    return data;
  };

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0
    },
    title: {
      text: '자산 총액 변동',
      align: 'left'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0) + 'M';
        }
      },
      title: {
        text: '총액 (백만원)'
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeFormatter: {
          year: 'yyyy',
          month: 'MMM \'yy',
          day: 'dd MMM',
          hour: 'HH:mm'
        }
      }
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return (val / 1000000).toFixed(1) + 'M원';
        }
      }
    }
  });

  const [seriesData, setSeriesData] = useState([
    {
      name: 'XYZ MOTORS',
      data: generateData()
    }
  ]);

  return (
    <div>
      <Chart
        options={chartOptions}
        series={seriesData}
        type="area"
        height={350}
      />
    </div>
  );
};

export default ZoomableAreaChart;
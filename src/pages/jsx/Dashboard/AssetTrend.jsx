import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import { Card, Col, Row, OverlayTrigger, Tooltip as Tooltip2, Button, Form } from 'react-bootstrap';
import { AssetSummary } from './AssetSummary';
import Select from 'react-select';
import noData from './NoData';
import api from '@/common/api/authAxios';

const URL = import.meta.env.VITE_BASIC_URL;

// Chart.js에 필요한 요소 및 플러그인 등록
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const AssetTrend = () => {
  const today = new Date();
  const defaultMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;

  const [trendData, setTrendData] = useState();
  const [type, setType] = useState('M');
  const [month, setMonth] = useState(defaultMonth);

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

  const handleDate = async () => {
    const response = await api.get(`${URL}/???/${type, month}`);
    console.log(response.data);
    setTrendData(response.data);
  };

  const handleType = (selectedType) => {
    setType(selectedType.value);

  };

  useEffect(() => {
    const generateRandomData = () => {
      const labels = [];
      const totalAssets = [];
      let currentValue = 700000000;

      for (let i = 0; i < 12; i++) {
        labels.push(`${i + 1}월`);

        if (i === 2) {
          currentValue -= Math.floor(Math.random() * 20000000);
        }

        if (i === 5) {
          currentValue -= Math.floor(Math.random() * 20000000);
        }

        if (i > 2) {
          currentValue += Math.floor(Math.random() * 15000000) + 2500000;
        }

        totalAssets.push(currentValue);
      }

      setTrendData(totalAssets);
    };

    generateRandomData();
  }, []);

  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    datasets: [
      {
        data: trendData,
        borderColor: '#4e79a7',
        backgroundColor: '#5a85dc',
        borderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

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
            return `${formatCurrency(value)}`;
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
          //text: '자산 총액',
          font: {
            size: 17,
            weight: 'bold'
          }
        },
        ticks: {
          callback: function (value) {
            return formatCurrency(value);
          },
          font: {
            size: 17
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 17
          }
        }
      }
    }
  };

  const renderTooltip = (props) => (
    <Tooltip2 id="tooltip" {...props}>
      <span style={{ fontSize: 15 }}>날짜 기준 전후 5년 데이터</span>
    </Tooltip2>
  );

  return (
    <Row>
      <Col>
        <AssetSummary />
      </Col>

      <Col>
        <Row>
          <Col sm={3}>
            <h4 className='header-title' style={{ display: 'inline' }}>자산 총액 추이</h4>
            <OverlayTrigger
              placement="top"
              delay={{ show: 100, hide: 50 }}
              overlay={renderTooltip}
            >
              <i className='ri-question-line' />
            </OverlayTrigger>
          </Col>

          <Col className='d-flex justify-content-end'>
            <Select
              options={[
                { value: 'M', label: '월' },
                { value: 'Y', label: '연' },
              ]}
              defaultValue={{ value: 'M', label: '월' }}
              onChange={handleType}
            />
            <Form>
              <Form.Control
                type='month'
                defaultValue={defaultMonth}
                onChange={handleDate}
              />
            </Form>
          </Col>
        </Row>


        <div style={{ width: "100%", height: "87%" }}>
          <Line data={data} options={options} plugins={noData} />
        </div>
      </Col>
    </Row>
  );
};

export default AssetTrend;
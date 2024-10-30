import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import { Card, Col, Row, OverlayTrigger, Tooltip as Tooltip2, Button, Form } from 'react-bootstrap';
import { AssetSummary } from './AssetSummary';
import Select from 'react-select';

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

  // const renderTooltip = (props) => (
  //   <Tooltip2 id="tooltip" {...props}>
  //     Simple tooltip
  //   </Tooltip2>
  // );

  return (
    <Row>
      <Col>
        <AssetSummary />
      </Col>

      <Col>
        <Row>
          <Col sm={3}>
            <h4 className='header-title' style={{ display: 'inline' }}>자산 총액 추이</h4>
          </Col>
          <Col className='d-flex justify-content-end'>
            <Select
              options={[
                { value: 'M', label: '월' },
                { value: 'Y', label: '연' },
              ]}
              defaultValue={{ value: 'M', label: '월' }}
            />
            <Form>
              <Form.Control
                type='month'>

              </Form.Control>
            </Form>
          </Col>
        </Row>
        {/* <OverlayTrigger
          placement="top"
          delay={{ show: 100, hide: 50 }}
          overlay={renderTooltip}
        >
          <i className='ri-question-line' />
        </OverlayTrigger> */}

        <div style={{ width: "100%", height: "87%" }}>
          <Line data={data} options={options} />
        </div>
      </Col>
    </Row>
  );
};

export default AssetTrend;
import api from '@/common/api/authAxios';
import { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import classNames from 'classnames';

const URL = import.meta.env.VITE_BASIC_URL;

/* 
const AssetInfo = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`${URL}/chart/1`);
      console.log("헤더1 : " + JSON.stringify(response.data));
      setData(response.data);
    };

    getData();
  }, []);

  const datas = {
    labels: ["유지보수", "자산 조사", "총 자산 수"],
    datasets: [
      {
        label: "금액(원) 및 개수",
        data: data
          ? [
            data.repairAmount,
            data.assetSurveyAmount,
            data.totalAssetAmount,
          ]
          : [0, 0, 0, 0, 0, 0],
        backgroundColor: ["#5a85dc", "#acaba6", "#e15759"],
        borderColor: ["#5a85dc", "#acaba6", "#e15759"],
        borderWidth: 1,
        barThickness: 45,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '금액(원) 및 개수',
        },
      },
    },
  };

  return (
    <Card style={{ width: '100%', height: '93%' }}>
      <Card.Body>
        <h4 className="header-title">자산 현황 차트</h4>
        <div style={{ width: '100%', height: '93%' }}>
          <Bar data={datas} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};


const AssetTotalCost = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`${URL}/chart/1`);
      console.log("헤더1 : " + JSON.stringify(response.data));
      setData(response.data);
    };

    getData();
  }, []);

  const datas = {
    labels: ["총액", "소유", "임대"],
    datasets: [
      {
        label: "금액(원)",
        data: data
          ? [
            data.ownCost + data.leasedCost,
            data.ownCost,
            data.leasedCost,
          ]
          : [0, 0, 0, 0, 0, 0],
        backgroundColor: ["#5a85dc", "#acaba6", "#e15759", "#f28e2b", "#59a14f", "#4e79a7"],
        borderColor: ["#5a85dc", "#acaba6", "#e15759", "#f28e2b", "#59a14f", "#4e79a7"],
        borderWidth: 1,
        barThickness: 45,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '금액(원)',
        },
      },
    },
  };

  return (
    <Card style={{ width: '100%', height: '93%' }}>
      <Card.Body>
        <h4 className="header-title">자산 현황 차트</h4>
        <div style={{ width: '100%', height: '93%' }}>
          <Bar data={datas} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};
*/

const AssetInfo = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`${URL}/chart/1`);
      console.log("헤더1 : " + JSON.stringify(response.data));
      setData(response.data);
    };

    getData();
  }, []);

  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div className="float-end">
                <i className="uil-invoice widget-icon"></i>
              </div>

              <h4 className="header-title">유지보수</h4>
              {/* <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>{data ? data.repairAmount : '-'} 건</h3> */}
              <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>3 건</h3>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div className="float-end">
                <i className="uil-file-edit-alt widget-icon"></i>
              </div>

              <h4 className="header-title">자산조사</h4>
              {/* <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>{data ? data.assetSurveyAmount : '-'} 건</h3> */}
              <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>1 건</h3>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div className="float-end">
                <i className="uil-layer-group widget-icon"></i>
              </div>

              <h4 className="header-title">총 자산 수</h4>
              {/* <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>{data ? data.totalAssetAmount : '-'} 건</h3> */}
              <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>1 건</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <div className="float-end">
                <i className="ri-hand-coin-line widget-icon"></i>
              </div>

              <h4 className="header-title">자산 총액</h4>
              {/* <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>{data ? data.ownCost + data.leasedCost : '-'} 원</h3> */}
              <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>1,281,320 원</h3>

            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div className="float-end">
                <i className=" ri-building-2-line widget-icon"></i>
              </div>

              <h4 className="header-title">소유 총액</h4>
              {/* <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>{data ? data.ownCost : '-'} 원</h3> */}
              <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>853,430 원</h3>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div className="float-end">
                <i className="ri-government-line widget-icon"></i>
              </div>

              <h4 className="header-title">임대 총액</h4>
              {/* <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>{data ? data.leasedCost : '-'} 원</h3> */}
              <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>4,27,890 원</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export { AssetInfo };

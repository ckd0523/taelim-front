import api from '@/common/api/authAxios';
import { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const URL = import.meta.env.VITE_BASIC_URL;

const AssetSummary = () => {
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
              <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>{data ? data.repairAmount.toLocaleString() : '-'} 건</h3>
              {/* <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>3 건</h3> */}
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div className="float-end">
                <i className="uil-file-edit-alt widget-icon"></i>
              </div>

              <h4 className="header-title">자산조사</h4>
              <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>{data ? data.assetSurveyAmount.toLocaleString() : '-'} 건</h3>
              {/* <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>1 건</h3> */}
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div className="float-end">
                <i className="uil-layer-group widget-icon"></i>
              </div>

              <h4 className="header-title">총 자산 수</h4>
              <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>{data ? data.totalAssetAmount.toLocaleString() : '-'} 건</h3>
              {/* <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>1 건</h3> */}
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
              <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>{data ? (data.ownCost + data.leasedCost).toLocaleString() : '-'} 원</h3>
              {/* <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>7,431,175,758 원</h3> */}

            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div className="float-end">
                <i className=" ri-building-2-line widget-icon"></i>
              </div>

              <h4 className="header-title">소유 총액</h4>
              <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>{data ? data.ownCost.toLocaleString() : '-'} 원</h3>
              {/* <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>7,382,981,038 원</h3> */}
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div className="float-end">
                <i className="ri-government-line widget-icon"></i>
              </div>

              <h4 className="header-title">임대 총액</h4>
              <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>{data ? data.leasedCost.toLocaleString() : '-'} 원</h3>
              {/* <h3 className="mt-3 mb-3" style={{ display: 'inline' }}>481,94,720 원</h3> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export { AssetSummary };

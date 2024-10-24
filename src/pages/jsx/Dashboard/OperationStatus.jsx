import { Card, Row, Col } from "react-bootstrap";
import Chart from 'react-apexcharts';
import { OperationData, OperationData2 } from "./DumpData";

const OperationStatus = () => {

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title">가동 현황</h4>
        <Row>
          <Col>
            <div className="d-flex justify-content-center">
              <Chart
                className="apex-charts"
                options={OperationData}
                height={380}
                //width={300}
                series={OperationData.series}
                type="donut"
              />
              <Chart
                className="apex-charts"
                options={OperationData2}
                height={380}
                //width={300}
                series={OperationData2.series}
                type="bar"
              />
            </div>
          </Col>
        </Row>

      </Card.Body>
    </Card>
  );
};

export default OperationStatus;
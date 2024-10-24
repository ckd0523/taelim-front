import { Card } from "react-bootstrap";
import ReactApexChart from 'react-apexcharts';
import { AssetStatusData } from "./DumpData";

const AssetStatus = () => {

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title">자산현황</h4>
        <div dir="ltr">
          <ReactApexChart
            className="apex-charts"
            options={AssetStatusData}
            height={380}
            series={AssetStatusData.series}
            type="bar"
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default AssetStatus;
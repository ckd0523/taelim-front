import { Card } from "react-bootstrap";
import ReactApexChart from 'react-apexcharts';
import { DepartmentData } from "./DumpData";

const DepartmentStatus = () => {

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title">부서별 자산현황</h4>
        <div dir="ltr">
          <ReactApexChart
            className="apex-charts"
            options={DepartmentData}
            height={380}
            series={DepartmentData.series}
            type="bar"
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default DepartmentStatus;
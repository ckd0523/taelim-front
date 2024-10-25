import { Card } from "react-bootstrap";
import bluePrint from '@/assets/images/BluePrint.png';

const LocationStatus = () => {

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title">위치별 현황</h4>
        <img src={bluePrint} className="img-fluid" width={800} />
      </Card.Body>
    </Card>

  );
};

export default LocationStatus;
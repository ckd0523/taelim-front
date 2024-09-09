import { Row, Col, Button } from 'react-bootstrap';
import RegisterButton from './AssetSurveyRegisterButton';

const Buttons = () => {
  return (
    <Row className='row-cols-auto justify-content-end'>
      <Col>
        <Button className='btn btn-success'>엑셀 출력</Button>
      </Col>
      <Col>
        <Button className='btn btn-danger'>자산 조사 삭제</Button>
      </Col>
      <Col>
        <RegisterButton />
        {/* <Button>자산 조사 등록</Button> */}
      </Col>
    </Row>
  );
};

export default Buttons;
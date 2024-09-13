import { Row, Col, Button } from 'react-bootstrap';
import RegisterButton from './AssetSurveyRegisterButton';

const Buttons = ({ onClickRegister }) => {
  return (
    <Row className='row-cols-auto justify-content-end'>
      <Col>
        <Button className='btn btn-success'>엑셀 출력</Button>
      </Col>
      <Col>
        <Button className='btn btn-danger'>자산 조사 삭제</Button>
      </Col>
      <Col>
        {/* 자산 조사 등록 버튼 */}
        <RegisterButton onClickRegister={onClickRegister} />
      </Col>
    </Row>
  );
};

export default Buttons;
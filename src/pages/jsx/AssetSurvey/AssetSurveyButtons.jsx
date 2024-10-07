import { Row, Col, Button, Modal, Card } from 'react-bootstrap';
import RegisterButton from './AssetSurveyRegisterButton';
import { useState } from 'react';
import { useToggle } from '@/hooks';
import { Link } from 'react-router-dom';

const Buttons = ({ onClickRegister, onDelete }) => {
  const [signUpModal, toggleSignUp] = useToggle();

  return (
    <Row className='row-cols-auto justify-content-end'>
      <Col>
        <Button className='btn btn-success'>엑셀 출력</Button>
      </Col>
      <Col>
        <Button className='btn btn-danger' onClick={onDelete}>자산 조사 삭제</Button>
      </Col>
      <Col>
        {/* 자산 조사 등록 버튼 */}
        <RegisterButton onClickRegister={onClickRegister} />
      </Col>
    </Row>
  );
};

const SurveyCompleteButton = ({ onClickCompleteSurvey }) => {
  const [signUpModal, toggleSignUp] = useToggle();
  //console.log("sdfdsfs");
  return (
    <>
      <Button className='btn btn-success' onClick={toggleSignUp}>완료</Button>

      {/* Modal */}
      <Modal show={signUpModal} onHide={toggleSignUp} backdrop="static" size="sm" centered>
        <Modal.Body className='text-center'>
          정말 자산 조사를 완료하시겠습니까?
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Button variant="primary" onClick={() => {
            //onClick에 함수 2개 넣는 법, 두 함수의 위치를 바꿔도 차이는 없음
            toggleSignUp();
            onClickCompleteSurvey();
          }}>완료</Button>
          <Button variant="danger" onClick={toggleSignUp}>취소</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const SruveyCancelButton = () => {
  const [signUpModal, toggleSignUp] = useToggle();
  return (
    <>
      <Button className='btn btn-danger' onClick={toggleSignUp} >취소</Button>

      {/* Modal */}
      <Modal show={signUpModal} onHide={toggleSignUp} backdrop="static" size="sm" centered>
        <Modal.Body className='text-center'>
          <p>정말 나가시겠습니까?</p> 진행 상황은 저장됩니다.
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Link to={"/jsx/AssetSurveyHistory"}>
            <Button variant="primary">예</Button>
          </Link>
          <Button variant="danger" onClick={toggleSignUp}>아니오</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { Buttons, SurveyCompleteButton, SruveyCancelButton };
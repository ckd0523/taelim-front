import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const SystemSetting = () => {

  const [showModal, setShowModal] = useState(false);

  // 페이지 로드 시 모달을 띄우는 useEffect
  useEffect(() => {
    setShowModal(true);
  }, []); // 빈 배열로 설정하여 페이지가 처음 로드될 때 한 번만 실행

  const handleClose = () => setShowModal(false);

  return (
    <div>
      <h1>새로운 페이지</h1>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>모달 제목</Modal.Title>
        </Modal.Header>
        <Modal.Body>페이지가 열리자마자 모달이 떴습니다!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export { SystemSetting };
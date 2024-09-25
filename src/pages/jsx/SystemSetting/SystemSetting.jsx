import { useState, useEffect } from 'react';
import { Modal, Button, Col } from 'react-bootstrap';

const SystemSetting = () => {

  return (
    <div>
      <h3>자산 기준 금액 설정</h3>

      <Col>
        <p>
          <label>고가치 기준</label></p>
        <input>
        </input>
      </Col>
      <br></br>

      <Col>
        <p>
          <label>저가치 기준</label>
        </p>
        <input>
        </input>
      </Col>
      <br></br>
      <Col>
        <Button>수정</Button>
      </Col>
    </div>
  );
};

export { SystemSetting };
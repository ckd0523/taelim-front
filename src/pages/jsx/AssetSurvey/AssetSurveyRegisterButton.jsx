import { useToggle } from '@/hooks';
import { Button, Modal, Col, Card, InputGroup, Form } from 'react-bootstrap';
import assetSurveyLocation from './assetSurveyLocation';
import Select from 'react-select';
import { CustomDatePicker2 } from '@/components';

const RegisterButton = () => {
  const [signUpModal, toggleSignUp] = useToggle();

  return (
    <>
      <Button variant="primary" className="me-1" onClick={toggleSignUp}>
        자산 조사 등록
      </Button>

      {/* Modal */}
      <Modal show={signUpModal} onHide={toggleSignUp}>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Col>
                <label>위치</label>
                <Select
                  placeholder='위치를 선택하세요'
                  className="react-select"
                  classNamePrefix="react-select"
                  options={assetSurveyLocation}>
                </Select>
              </Col>

              <Col>
                <label>회차</label>
                <InputGroup>
                  <Form.Control
                    type='number'
                    name='round'
                    min='0'
                  //placeholder='백엔드에서 처리하고 싶당'
                  >
                  </Form.Control>
                </InputGroup>
              </Col>

              <Col>
                <label>조사자</label>
                <InputGroup>
                  <Form.Control
                    type='text'
                    name='surveyBy'
                    disabled
                    value='user10@example.com'
                  >
                  </Form.Control>
                </InputGroup>
              </Col>

              <Col>
                <label>조사일자</label>
                <CustomDatePicker2
                  hideAddon={true}
                  dateFormat="yyyy-MM-dd"
                  value={new Date()}
                />
              </Col>
            </Card.Body>
          </Card>
        </Modal.Body>

        <Modal.Footer>
          <Button>
            확인
          </Button>
          <Button className='bnt btn-danger' onClick={toggleSignUp}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegisterButton;
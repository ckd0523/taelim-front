import { useToggle } from '@/hooks';
import { Button, Modal, Col, Card, InputGroup, Form } from 'react-bootstrap';
import assetSurveyLocation from './assetSurveyLocation';
import Select from 'react-select';
import { CustomDatePicker2 } from '@/components';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from '@/common/api/authAxios';
import { useAuthContext } from '@/common';

const URL = import.meta.env.VITE_BASIC_URL;

const RegisterButton = ({ onClickRegister }) => {

  const { user } = useAuthContext();

  const [signUpModal, toggleSignUp] = useToggle();

  //useState 안에 초기 값을 null로 잡으면 백에 location이 제대로 안감
  const [selectedLocation, setLocation] = useState('');
  const [round, setRound] = useState('');

  const [surveyBy, setSurveyBy] = useState(user.name);

  const [isSubmitting, setIsSubmitting] = useState(false); // 버튼 비활성화 상태 추가

  //useEffect는 컴포넌트 최상위에 선언을 해야한다.
  //useEffect은 async로 선언 불가, useEffect 안에 async 함수를 따로 만들어야함
  useEffect(() => {
    if (selectedLocation == '') return; // 선택된 위치가 없으면 실행하지 않음

    const checkLocation = async () => {
      try {
        //Get fetch에는 body를 넣을 수 없기 때문에 url에 데이터를 실어야함
        const checkResponse = await api.get(`${URL}/checkLocation/${selectedLocation}`);

        console.log(checkResponse.status);

        if (checkResponse.status !== 200) {
          Swal.fire({
            icon: 'error',
            title: '현재 위치에 대한 자산조사가 이미있습니다.',
          });
          setLocation('');
          //alert(checkResponse.body);
        } else {
          const data = checkResponse.data; // 서버의 응답을 JSON으로 변환
          console.log(data);
          setRound(data); // 서버 응답에서 회차 정보 설정
        }

      } catch (error) {
        alert("네트워크 오류 발생");
        console.error('에러 발생:', error);
      }
    };

    checkLocation();

  }, [selectedLocation]);

  const handleLocationChange = (selectedOption) => {
    setLocation(selectedOption.value);
    console.log('Selected location:', selectedOption.value);
  };

  // 자산 조사 등록 요청 보내는 함수
  const handleRegistRequest = async () => {
    if (selectedLocation == '') {
      Swal.fire({
        icon: 'error',
        title: '위치를 선택하세요.',
      });
      return; // 선택된 위치가 없으면 실행하지 않음
    }

    setIsSubmitting(true); // 요청 시작 시 확인 버튼 비활성화


    try {
      // 보낼 데이터를 객체로 구성
      const requestData = {
        round: round,
        location: selectedLocation,
        userId: user.id, //회원 id
      };

      console.log(requestData.location);

      const response = await api.post(`${URL}/register`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        setIsSubmitting(false); // 요청 완료 후 확인 버튼 활성화
        throw new Error('자산 조사 등록에 실패했습니다.');
      }

      Swal.fire({
        icon: 'success',
        title: '자산 조사 등록이 완료되었습니다.',
      });

      setLocation('');
      toggleSignUp(); // 모달 닫기
      setIsSubmitting(false); // 요청 완료 후 확인 버튼 활성화
      //등록 성공 후 테이블 리렌더링
      onClickRegister();
    } catch (error) {
      console.error('자산 조사 등록 중 오류:', error);
      Swal.fire({
        icon: 'error',
        title: '오류가 발생했습니다. 다시 시도해주세요.',
      });
      setIsSubmitting(false); // 요청 완료 후 확인 버튼 활성화
    }
  };

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
                  placeholder="위치를 선택하세요"
                  className="react-select"
                  classNamePrefix="react-select"
                  options={assetSurveyLocation}
                  onChange={handleLocationChange}
                ></Select>
              </Col>

              <Col>
                <label>회차</label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="round"
                    value={round}
                    disabled
                  //placeholder='백엔드에서 처리하고 싶당'
                  ></Form.Control>
                </InputGroup>
              </Col>

              <Col>
                <label>조사자</label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="surveyBy"
                    disabled
                    //조사자는 추후 로그인 인증 부분에서 가져와야함
                    value={surveyBy}
                  ></Form.Control>
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
          <Button
            style={{ background: '#5e83bb', border: 'none' }}
            onClick={handleRegistRequest}
            disabled={isSubmitting}
          >
            {isSubmitting ? '처리 중...' : '확인'}
          </Button>
          <Button variant="secondary" onClick={toggleSignUp}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegisterButton;

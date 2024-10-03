import { Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import assetSurveyLocation from './assetSurveyLocation';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
//import { Table } from '@/components';
//import { getDetailTable } from './data';
import { DetailTable } from './AssetSurveyHistoryTable';
import { SurveyCompleteButton, SruveyCancelButton } from './AssetSurveyButtons';
import React from 'react';
import QRScanner from 'qr-scanner'; // qr-scanner 라이브러리 import00

const URL = import.meta.env.VITE_BASIC_URL;

// 새로운 셀 컴포넌트
const AssetSurveyContentCell = React.memo(({ row, assetSurveyContent, onContentChange }) => {
  const [localContent, setLocalContent] = useState(
    assetSurveyContent[row.original.infoNo] || row.values.assetSurveyContent || ''
  );

  const handleChange = (e) => {
    setLocalContent(e.target.value);
  };


  //자산 조사 상세 내용을 입력하고 포커스를 잃으면 요청을 보냄
  const handleBlur = () => {
    onContentChange(row.original.infoNo, localContent);

    // Fetch 요청 보내기
    fetch(`${URL}/updateAssetSurveyDetail2`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "infoNo": row.original.infoNo,
        "content": localContent.trim() || null,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        console.log('내용 업데이트 성공');
      })
      .catch((error) => {
        console.error('오류 발생:', error);
        alert('내용 업데이트 중 오류가 발생했습니다.');
      });
  };

  // Enter 키를 눌렀을 때 포커스를 잃게 하는 함수
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur(); // Enter 키를 누르면 input이 blur 됨
    }
  };

  return (
    <input
      type='text'
      value={localContent}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown} // 키보드 이벤트 추가
      disabled={localStorage.getItem('surveyStatus') === 'true'}
    />
  );
});


const AssetSurveyDetail = () => {
  //페이지에 들어올 때 QR로 찍은 assetCode가 바로 들어갈 수 있게 바로 input에 focus를 두기 위함
  const inputRef = useRef(null); // input 요소에 대한 ref 생성

  //다른 페이지에서 이 페이지로 넘어올 때 스크롤을 최상단으로
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // input에 포커스 설정
    }
    window.scrollTo(0, 0);
  }, []);

  const locationParam = useLocation();

  //테이블의 페이지가 넘어갈 때 계속 locationValue를 세팅하는 코드가 작동하는데
  //그 데이터가 자산 조사 이력에서 넘어오지 않아 null이 되어 useState로 값을 유지해야함
  // useState로 locationParam의 값을 저장
  const [locationState, setLocationState] = useState({
    location: locationParam.state?.location || localStorage.getItem('location') || '', // 초기값이 없을 경우 ''로 설정
    surveyStartDate: locationParam.state?.surveyStartDate || localStorage.getItem('surveyStartDate') || '',
    surveyBy: locationParam.state?.surveyBy || localStorage.getItem('surveyBy') || '',
    assetSurveyNo: locationParam.state?.assetSurveyNo || localStorage.getItem('assetSurveyNo') || '',
    surveyStatus: locationParam.state?.surveyStatus || localStorage.getItem('surveyStatus') || ''
  });

  // locationState.location을 기반으로 매칭되는 label을 찾음
  const matchedLocation = assetSurveyLocation.find(
    loc => loc.value === locationState.location
  );

  // 테이블의 페이지를 변경했을 때 위치, 자산 조사일, 자산 조사자가 초기화되어
  // 페이지에서 데이터를 받아왔을 때 localStorage에 저장
  useEffect(() => {
    if (locationState.location) {
      localStorage.setItem('location', locationState.location);
    }
    if (locationState.surveyStartDate) {
      localStorage.setItem('surveyStartDate', locationState.surveyStartDate);
    }
    if (locationState.surveyBy) {
      localStorage.setItem('surveyBy', locationState.surveyBy);
    }
    if (locationState.assetSurveyNo) {
      localStorage.setItem('assetSurveyNo', locationState.assetSurveyNo);
    }
    if (locationState.surveyStatus) {
      //console.log("얘가 참이라고??" + locationState.surveyStatus);
      localStorage.setItem('surveyStatus', locationState.surveyStatus);
    }
  }, [locationState]);

  //미확인된 자산 확인할 때 사용
  const [isChecked, setIsChecked] = useState(false);
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const onClickCompleteSurvey = async () => {
    try {
      const response = await fetch(`${URL}/completeSurvey/${locationState.assetSurveyNo}`, { method: 'PUT' });

      if (!response.ok) {
        alert('자산 조사 완료에 실패했습니다.');
        return;
      }

      alert("자산 조사 완료");
      window.location.href = '/jsx/AssetSurveyHistory';

    } catch (error) {
      console.error('자산 조사 완료 중 오류:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const [data, setData] = useState([]);
  //console.log('얘가 실행되긴해?');

  useEffect(() => {
    //console.log('test');
    fetch(`${URL}/assetSurveyDetail/${locationState.assetSurveyNo}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log('받은 데이터 : ' + data);
        setData(data);
      })
      .catch((error) => console.error('error : ', error));
  }, [locationState.assetSurveyNo]);

  //console.log('선택한 레코드 자산 번호 : ' + locationState.assetSurveyNo);
  //const data = getDetailTable(locationState.assetSurveyNo);
  //console.log('얘가 null이라고? : ' + JSON.stringify(data));

  //console.log("로컬 스토리지 : " + JSON.stringify(localStorage));

  //--------------------------------------------------------------------------------------------------------------------------
  // 체크박스 상태 관리를 위한 상태 추가
  const [exactLocationStates, setExactLocationStates] = useState({});
  const [assetStatusStates, setAssetStatusStates] = useState({});
  //assetSurveyContent 관리
  const [assetSurveyContent, setAssetSurveyContent] = useState({});

  const handleContentChange = useCallback((infoNo, content) => {
    setAssetSurveyContent(prevState => ({
      ...prevState,
      [infoNo]: content,
    }));
  }, []);

  const columns = useMemo(() => [
    { Header: '자산 조사 상세 번호', accessor: 'infoNo' },
    { Header: '자산 코드', accessor: 'assetCode', defaultCanSort: true, },
    { Header: '자산명', accessor: 'assetName', defaultCanSort: false, },
    { Header: '자산 소유자', accessor: 'assetOwner', defaultCanSort: false, },
    { Header: '자산 담당자', accessor: 'assetSecurityManager', defaultCanSort: false, },
    {
      Header: '정위치 유무', accessor: 'exactLocation',
      Cell: ({ row }) => (
        <input
          type='checkbox'
          checked={exactLocationStates[row.id] ?? row.values.exactLocation}
          onChange={(e) => handleExactLocation(e, row)}
          //disabled는 true, false를 넣어야 하는데
          //localStorage.getItem은 항상 문자열('true', 'false')을 반환
          disabled={localStorage.getItem('surveyStatus') === 'true'}
        />
      )
    },
    {
      Header: '상태', accessor: 'assetStatus',
      Cell: ({ row }) => (
        <input
          type='checkbox'
          checked={assetStatusStates[row.id] ?? row.values.assetStatus}
          onChange={(e) => handleAssetStatus(e, row)}
          disabled={localStorage.getItem('surveyStatus') === 'true'}
        />
      )
    },
    {
      Header: '내용', accessor: 'assetSurveyContent',
      Cell: ({ row }) => (
        <AssetSurveyContentCell
          row={row}
          assetSurveyContent={assetSurveyContent}
          onContentChange={handleContentChange}
        />
      )
    },
  ], [assetSurveyContent, handleContentChange, exactLocationStates, assetStatusStates]);

  //정위치 유무 체크박스 선택 시 동작00
  const handleExactLocation = (e, row) => {
    const updatedState = {
      ...exactLocationStates,
      [row.id]: e.target.checked,
    };
    setExactLocationStates(updatedState);

    //console.log('exactLocation Row:', updatedRow);

    fetch(`${URL}/updateAssetSurveyDetail`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // JSON 형식으로 데이터 전송
      },
      body: JSON.stringify({ // 여기에서 JSON.stringify()를 사용하여 객체를 문자열로 변환
        "requestType": true,
        "infoNo": row.original.infoNo,
        "updateValue": e.target.checked,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        console.log('성공'); // 성공 시 서버 응답 출력
      })
      .catch((error) => {
        alert('네트워크 응답이 올바르지 않습니다.');
        console.error('오류 발생:', error); // 오류 발생 시 오류 메시지 출력
      });
  };

  //상태 체크박스 선택 시 동작
  const handleAssetStatus = (e, row) => {
    const updatedState = {
      ...assetStatusStates,
      [row.id]: e.target.checked,
    };
    setAssetStatusStates(updatedState);

    //console.log('assetStatus Row:', updatedRow);

    fetch(`${URL}/updateAssetSurveyDetail`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // JSON 형식으로 데이터 전송
      },
      body: JSON.stringify({ // 여기에서 JSON.stringify()를 사용하여 객체를 문자열로 변환
        "requestType": false,
        "infoNo": row.original.infoNo,
        "updateValue": e.target.checked,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        console.log('성공'); // 성공 시 서버 응답 출력
      })
      .catch((error) => {
        alert('네트워크 응답이 올바르지 않습니다.');
        console.error('오류 발생:', error); // 오류 발생 시 오류 메시지 출력
      });
  };

  const videoRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);

  // QR 코드 인식 함수
  const startScanning = async () => {
    setIsScanning(true);

    // 비디오 스트림 가져오기
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream; // 비디오 요소에 스트림 설정

    QRScanner.scanImage(videoRef.current, { returnDetailedScanResult: true })
      .then(result => {
        console.log('QR 코드 인식 결과:', result);
        setIsScanning(false);
        // QR 코드 인식 후 추가 로직을 여기에 작성
      })
      .catch(err => {
        console.error('QR 코드 인식 오류:', err);
        setIsScanning(false);
      });
  };

  const stopScanning = () => {
    setIsScanning(false);
    QRScanner.stop(); // 스캔 중지
  };

  return (
    <div>
      <Card></Card>

      <Card>
        <Card.Body>
          <Row>
            <Col>
              <strong>위치 : </strong>
              <span>{/* 매칭되는 location이 있으면 label을 표시, 없으면 locationValue 그대로 표시 */}
                {matchedLocation ? matchedLocation.label : locationState.location}</span>
            </Col>

            <Col>
              <strong>자산 조사일 : </strong>
              <span>{locationState.surveyStartDate}</span>
            </Col>

            <Col>
              <strong>자산 조사자 : </strong>
              <span>{locationState.surveyBy}</span>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className='justify-content-between'>
        <Col lg={4}>
          <Row>
            <Col>
              {/* <p style={{ marginBottom: 8, marginTop: 4 }}><strong>미확인 자산</strong></p> */}
              <Form.Check
                type="checkbox"
                id="btn-check"
                className="btn-check"
                checked={isChecked}
                onChange={handleToggle}
                autoComplete="off"
              />

              <Button
                variant="outline-primary"
                as="label"
                htmlFor="btn-check"
                active={isChecked} // 활성화된 상태일 때 스타일 적용
              >
                <strong>미확인 자산 보기</strong>
              </Button>
            </Col>

            <Col>
              <InputGroup>
                <Form.Control
                  ref={inputRef}
                />
              </InputGroup>

            </Col>
          </Row>
        </Col>



        <Col className='col-auto'>
          <Button onClick={startScanning}>QR인식</Button>
          <>
            {isScanning && (
              <video ref={videoRef} style={{ width: '100%', height: 'auto' }} autoPlay />
            )}
          </>
        </Col>
      </Row>

      <Card></Card>

      <Card>
        <Card.Body>
          {/* 
          <p>테이블 들어갈 자리</p>  */}
          {data && data.length > 0 ? (
            <DetailTable detailColumn={columns} detailData={data} />
          ) : (
            <p>데이터가 없습니다.</p>  // 데이터가 없을 때 보여줄 내용
          )}
        </Card.Body>
      </Card>

      <Row className='row-cols-auto justify-content-end'>
        <Col>
          {/* 자산 조사 완료 버튼 */}
          {localStorage.getItem('surveyStatus') === 'true' ? '' : <SurveyCompleteButton onClickCompleteSurvey={onClickCompleteSurvey} />}
        </Col>
        <Col>
          {/* 자산 조사 뒤로가기 버튼 */}
          {localStorage.getItem('surveyStatus') === 'true' ?
            <Link to={"/jsx/AssetSurveyHistory"}>
              <Button variant="primary">뒤로가기</Button>
            </Link>
            : <SruveyCancelButton />
          }
        </Col>
      </Row>

      <Card></Card>
    </div >
  );
};

export default AssetSurveyDetail;
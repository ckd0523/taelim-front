import React, { useState } from 'react';
import axios from 'axios';

const AssetSurveyRegister = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handlePostRequest = () => {
    const postData = {
      location: "MAIN_1F",
      round: 1,
      email: "user10@example.com"
    };

    axios.post("http://localhost:8080/register", postData) // 서버에 보낼 데이터
      .then(response => {
        setResponse(response.data); // 응답 데이터 상태 업데이트
      })
      .catch(error => {
        setError(error.message); // 오류 상태 업데이트
      });
  };

  return (
    <div>
      <button onClick={handlePostRequest}>자산 조사 등록 테스트</button>
    </div>
  );
};

export default AssetSurveyRegister;

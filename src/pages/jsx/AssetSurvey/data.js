import { useState, useEffect } from "react";

const URL = import.meta.env.VITE_BASIC_URL;

const getDetailTable = (assetSurveyNo) => {
  const [data, setData] = useState([]);
  //console.log('얘가 실행되긴해?');

  useEffect(() => {
    //console.log('test');
    fetch(`${URL}/assetSurveyDetail/${assetSurveyNo}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log('받은 데이터 : ' + data);
        setData(data);
      })
      .catch((error) => console.error('error : ', error));
  }, []);

  return data;
};

export { getDetailTable };
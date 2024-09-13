import { useState, useEffect } from "react";

const URL = import.meta.env.VITE_BASIC_URL;

const DetailTable = (assetSurveyNo) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${URL}/assetSurveyDetail/${assetSurveyNo}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error('error : ', error));
  }, []);

  return data;
};

export { DetailTable };
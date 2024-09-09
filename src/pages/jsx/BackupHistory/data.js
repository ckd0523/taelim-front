import { useState, useEffect } from "react";

const BackUpHistory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/backUpHistory')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error('error : ', error));


  }, []);

  return data;
};

export default BackUpHistory;
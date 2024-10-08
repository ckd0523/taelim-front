import { useState, useEffect } from "react";

const URL = import.meta.env.VITE_BASIC_URL;

const BackUpTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${URL}/backUpHistory`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error('error : ', error));
  }, []);

  return data;
};

export default BackUpTable;
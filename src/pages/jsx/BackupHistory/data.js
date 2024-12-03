import api from "@/common/api/authAxios";
import { useState, useEffect } from "react";

const URL = import.meta.env.VITE_BASIC_URL;

const BackUpTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const getBackUpHistory = await api.get(`${URL}/backUpHistory`);

        setData(getBackUpHistory.data)
      } catch (error) {
        console.error('error : ', error);
      }
    }

    getData();
  }, []);
  return data;
};

export default BackUpTable;
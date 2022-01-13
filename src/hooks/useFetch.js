/* eslint-disable react-hooks/exhaustive-deps */
//useFetch.js
import React, { useState, useEffect } from "react";
const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

function useFetch(url, timeout) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });
  const [timer, setTimer] = useState(null);

  const clearTimer = () => {
    if (timer) clearTimeout(timer);
  };

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(
        "🚀TCL: ~ file: useFetch.js ~ line 15 ~ fetchData ~ data",
        data
      );

      // setData(data.hits);
      setData(data);

      // if (data.Response === "True") {
      //   setData(data.Search || data);
      //   setError({ show: false, msg: "" });
      // } else {
      //   setError({ show: true, msg: data.Error });
      // }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    clearTimer();

    if (url && timeout) {
      // const newTimer = setTimeout(fetchData(url), timeout);
      const newTimer = setTimeout(() => fetchData(url), timeout);
      setTimer(newTimer);
    } else {
      fetchData(url);
    }
  }, [url]);

  return { data, isLoading, error, fetchData };
}
export default useFetch;

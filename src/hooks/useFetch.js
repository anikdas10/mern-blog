import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, option = {}, limit = 0, responseKey = null,dependencies) => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (page) params.append("page", page);
        if (limit !== null) params.append("limit", limit);
        console.log(params.toString());
        const response = await axios.get(`${url}?${params.toString()}`, option);
        const fetchedData = responseKey
          ? response.data[responseKey]
          : response.data;
        setData(fetchedData);
        setTotalPages(response.data.totalPages);
        setError(null);
      } catch (err) {
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, page,...dependencies]);

  return { data, page, totalPages, setPage, loading, error };
};

export default useFetch;

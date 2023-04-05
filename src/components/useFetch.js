import { useState, useEffect } from 'react';

export default function useFetch({ api, method, headers, body }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  function fetchData() {
      const fetchOptions = {
        method,
        mode: 'cors'
      };
      if (headers) {
        fetchOptions.headers = headers;
      }
      if (body) {
        fetchOptions.body = body;
      }

      fetch(api, fetchOptions)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err))
        .then(() => setLoading(false))
  }

  useEffect(() => {
    if (method.trim() === '') return;
    if (loading === false) return;
    fetchData();
  }, [data, api, method, headers, body]);

  return { data, loading };
}

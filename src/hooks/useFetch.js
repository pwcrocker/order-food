import { useEffect, useState } from 'react';

export default function useFetch(endpoint) {
  const [resData, setResData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        console.log('fetching data');
        const res = await fetch('http://localhost:3000/' + endpoint);
        const data = await res.json();
        if (!res.ok) {
          throw Error("Couldn't fetch data");
        }
        setResData(data);
        setError(null);
      } catch (err) {
        console.log('An error occurred: ' + err);
        setResData(null);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return { resData, isLoading, error };
}

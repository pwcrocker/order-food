import { useEffect, useState } from 'react';
import HOSTNAME from '../config/env';

export default function useFetch(endpoint) {
  const [resData, setResData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await fetch(`http://${HOSTNAME}:3000/${endpoint}`);
        if (!res.ok) {
          throw Error("Couldn't fetch data");
        }
        const data = await res.json();
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

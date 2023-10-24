import { useState, useEffect, useCallback } from "react";

export const useGet = (url = '') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
     
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('hubo algun problema');
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error:any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};

export const usePost = (url='')=> {
  const [loadingPost, setLoadingPost] = useState(false);
  const [errorPost, setErrorPost] = useState(null);

  const sendPostData = async (data = {}) => {
    console.log('me ejecuto send post')
    setLoadingPost(true);
    setErrorPost(null);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('No pudo crear la entidad');
      }

      const responseData = await response.json();

      setLoadingPost(false);

      return responseData;
    } catch (error:any) {
      setErrorPost(error);
      setLoadingPost(false);
      return null;
    }
  };

  return { sendPostData, loadingPost, errorPost };
}



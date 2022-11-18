import axios from 'axios';
import {useEffect, useState} from 'react';

function useFetch(url) {
  const [data, setData] = useState([]);
  //Loadding spinner
  const [loading, setLoading] = useState(true);
  //Eror durumu için
  const [error, setError] = useState(null);

  //Veri Apiden async method kullanılarak cekilen yer
  const fetchData = async () => {
    try {
      const {data: responseData} = await axios.get(url);
      setData(responseData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  //Açıldığında verilen getirilmesini sağlayan yer
  useEffect(() => {
    fetchData();
  }, []);

  return {error, loading, data};
}
export default useFetch;

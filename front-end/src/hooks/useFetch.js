import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import httpStatus from 'http-status';
import { useDispatch } from 'react-redux';

function useFetch(requestType, path, stateType = null, payload = null) {
  const [responseData, setResponseData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function handleFetch() {
      const { token } = JSON.parse(localStorage.getItem('user')) || navigate('/');

      const api = axios.create({
        baseURL: `http://${process.env.REACT_APP_HOSTNAME}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      await api[requestType](path, payload)
        .then(({ data }) => {
          setResponseData(data);

          if (stateType) {
            dispatch({ type: stateType, data });
          }
        })
        .catch(({ response }) => {
          if (response.status === httpStatus.UNAUTHORIZED) {
            localStorage.removeItem('user');
            navigate('/');
          }
        });
    }

    handleFetch();
  }, [requestType, path, payload, navigate, dispatch, stateType]);

  return responseData;
}

export default useFetch;

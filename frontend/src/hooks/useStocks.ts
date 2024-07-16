// src/hooks/useStocks.js
import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_STOCKS = gql`
  query GetStocks {
    stocks {
      id
      symbol
      name
      price
    }
  }
`;

const useStocks = () => {
  const { loading, error, data } = useQuery(GET_STOCKS);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    if (data) {
      setStocks(data.stocks);
    }
  }, [data]);

  return { stocks, loading, error };
};

export default useStocks;

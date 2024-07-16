// src/hooks/useStocks.js
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_STOCKS } from '../GraphQL/Queries';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

interface StocksData {
  stocks: Stock[];
}

const useStocks = () => {
  const { loading, error, data } = useQuery<StocksData>(GET_STOCKS);
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    if (data) {
      setStocks(data.stocks);
    }
  }, [data]);

  return { stocks, loading, error };
};

export default useStocks;

// src/hooks/useStocks.js
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_STOCKS } from '../GraphQL/Queries';

interface TimeSerie {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  timeSeries: TimeSerie[];
}

interface StocksData {
  stocks: Stock[];
}

const useStocks = (interval: string) => {
  const { loading, error, data } = useQuery<StocksData>(GET_STOCKS, {
    variables: { interval },
  });

  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    if (data) {
      setStocks(data.stocks);
    }
  }, [data]);

  return { stocks, loading, error };
};

export default useStocks;

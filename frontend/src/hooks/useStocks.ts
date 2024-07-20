import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_STOCKS } from '../GraphQL/Queries';

const useStocks = (interval: string, search?: string) => {
  const { loading, error, data } = useQuery<StocksData>(GET_STOCKS, {
    variables: { interval, search },
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

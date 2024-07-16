import React from 'react';
import useStocks from './hooks/useStocks';

function App() {
  const { stocks, loading, error } = useStocks();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <h1>Stocks</h1>
      <ul>
        {stocks.map(stock => (
          <li key={stock.id}>
            {stock.symbol} - {stock.name}: ${stock.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App

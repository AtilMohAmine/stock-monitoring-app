import StockChart from './components/StockChart';
import useStocks from './hooks/useStocks';

function App() {
  const { stocks, loading, error } = useStocks('5min');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <h1>Stocks</h1>
      <ul>
        {stocks.map(stock => (
          <li key={stock.symbol}>
            {stock.symbol} - {stock.name}: ${stock.price}
            <StockChart timeSeries={stock.timeSeries} symbol={stock.symbol} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App

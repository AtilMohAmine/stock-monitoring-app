import StockChart from './components/StockChart';
import useStocks from './hooks/useStocks';

import { Input } from "@/shadcn/components/ui/input"
import { Button } from "@/shadcn/components/ui/button"
import { useMemo, useState } from 'react';
import useDebounce from './hooks/useDebounce';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { stocks, loading, error } = useStocks('daily', debouncedSearchTerm);

  const stockCharts = useMemo(() => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    return stocks.map((stock) => (
      <StockChart 
        key={stock.symbol}
        name={stock.name}
        symbol={stock.symbol}
        price={stock.price}
        change={stock.change}
        timeSeries={stock.timeSeries}
      />
    ));
  }, [stocks, loading, error]);

    return (
      <div className="flex flex-col min-h-screen">
        <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="#" className="font-bold text-xl">
              Market Chart
            </a>
            <nav className="hidden md:flex gap-4">
              <a href="#" className="hover:text-primary-foreground/80">
                Indices
              </a>
              <a href="#" className="hover:text-primary-foreground/80">
                Sectors
              </a>
              <a href="#" className="hover:text-primary-foreground/80">
                Stocks
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <form className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <Input
                type="search"
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-md bg-primary/20 focus:bg-primary/30 focus:outline-none"
              />
            </form>
            <Button variant="ghost" size="icon" className="rounded-full">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {stockCharts}
          </div>
          {
            !stocks.length && (<p className='flex items-center justify-center w-full font-bold text-xl mt-40'>There is no stocks to show</p>)
          }
        </main>
        <footer className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
          <div className="text-sm">&copy; 2024 Market Chart. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary-foreground/80">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary-foreground/80">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-foreground/80">
              Contact Us
            </a>
          </div>
        </footer>
      </div>
    )
  }

export default App

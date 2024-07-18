import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shadcn/components/ui/card"
import TrendingUpIcon from "./TrendingUpIcon";
import TrendingDownIcon from "./TrendingDownIcon";
import PriceLineChart from "./PriceLineChart";

const StockChart = ({ name, symbol, price, change, timeSeries }: Stock) => {

    return (
        <Card className="bg-card text-card-foreground">
        <CardHeader>
            <CardTitle>{name} ({symbol})</CardTitle>
            <CardDescription>
            <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">${price}</div>
                { 
                    change >= 0
                    ? (
                        <div className="text-green-500 flex items-center gap-1">
                            <TrendingUpIcon />
                            <span>+{Number(change).toFixed(2)}%</span>
                        </div>
                       )
                    : (
                        <div className="text-red-500 flex items-center gap-1">
                            <TrendingDownIcon />
                            <span>{Number(change).toFixed(2)}%</span>
                        </div>
                      )
                }   
            </div>
            </CardDescription>
        </CardHeader>
        <CardContent>
          <PriceLineChart data={timeSeries} />
        </CardContent>
        </Card>
    )
};

export default StockChart;

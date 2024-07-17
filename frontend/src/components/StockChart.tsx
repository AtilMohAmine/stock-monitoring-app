import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TimeSerie {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

interface StockChartProps {
    symbol: string;
    timeSeries: TimeSerie[];
}

const StockChart = ({ symbol, timeSeries }: StockChartProps) => {

    const chartData = {
        labels: timeSeries.map(entry => entry.time) || [],
        datasets: [
            {
                label: `${symbol} Stock Price`,
                data: timeSeries.map(entry => entry.close) || [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `${symbol} Stock Price`,
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default StockChart;

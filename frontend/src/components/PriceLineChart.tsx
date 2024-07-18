import { CartesianGrid, XAxis, Line, LineChart } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/shadcn/components/ui/chart"

interface PriceChartProps {
    data: TimeSerie[];
}

export default function PriceLineChart({ data }: PriceChartProps) {
    return (
        <div className="aspect-[9/4]">
          <ChartContainer
            config={{
              desktop: {
                label: "Stock Data",
                color: "hsl(var(--chart-1))",
              },
            }}
          >
            <LineChart
              accessibilityLayer
              data={
                data.map(item => ({
                  time: item.time,
                  close: item.close,
                }))
              }
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => new Date(value).toLocaleString('default', { day: 'numeric', month: 'short' })}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line dataKey="close" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </div>
      )
}

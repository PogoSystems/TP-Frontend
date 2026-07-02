import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Dot,
} from 'recharts';

export interface LineChartDataPoint {
    label: string;
    score: number;
}

interface LineChartProps {
    data: LineChartDataPoint[];
}

export function LineChart({ data }: LineChartProps) {
    const safeData = data.length > 0 ? data : [{ label: '', score: 0 }];
    return (
        <ResponsiveContainer width="100%" height={280}>
            <RechartsLineChart
                data={safeData}
                margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                    dataKey="label"
                    type="category"
                    allowDuplicatedCategory={false}
                    tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'Inter, sans-serif' }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    domain={[0, 100]}

                    tick={{ fill: '#6b7280', fontSize: 12, fontFamily: 'Inter, sans-serif' }}
                    axisLine={false}
                    tickLine={false}
                    ticks={[0, 25, 50, 75, 100]}
                />
                <Tooltip
                    formatter={(value) => [`${value}%`, 'Puntuación']}
                    contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        fontSize: '12px',
                    }}
                />
                <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#1c398e"
                    strokeWidth={2.5}
                    dot={<Dot r={4} fill="#1c398e" stroke="#fff" strokeWidth={2} />}
                    activeDot={{ r: 6, fill: '#1c398e', stroke: '#fff', strokeWidth: 2 }}
                />
            </RechartsLineChart>
        </ResponsiveContainer>
    );
}

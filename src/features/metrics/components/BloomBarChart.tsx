import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import type { BloomStatsResponse } from '../types/metrics.types.ts';
import { BloomLevelLabel } from '../../../shared/types/bloomLevel.ts';


const BAR_COLOR = '#2e6f95';

interface BloomBarChartProps {
    data: BloomStatsResponse[];
}

/**
 * Gráfico de barras verticales para "Rendimiento por nivel de Bloom".
 * Muestra el porcentaje de acierto por nivel cognitivo.
 * Usa recharts BarChart, siguiendo el mismo patrón que BloomRadarChart y LineChart.
 */
export function BloomBarChart({ data }: BloomBarChartProps) {
    const chartData = data.map((d) => ({
        name: BloomLevelLabel[d.bloom_level],
        score: Math.round(d.percentage)
    }));

    return (
        <ResponsiveContainer width="100%" height={150}>
            <BarChart
                data={chartData}
                margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis
                    dataKey="name"
                    tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'Inter, sans-serif' }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'Inter, sans-serif' }}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip
                    formatter={(value) => [`${value}%`, 'Acierto']}
                    contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        fontSize: '12px',
                    }}
                />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {chartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={BAR_COLOR} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

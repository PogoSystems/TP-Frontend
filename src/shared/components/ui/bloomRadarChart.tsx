import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';

export interface BloomRadarDataPoint {
    level: string;
    value: number;
}

interface BloomRadarChartProps {
    data: BloomRadarDataPoint[];
}

export function BloomRadarChart({ data }: BloomRadarChartProps) {
    return (
        <ResponsiveContainer width="100%" height={280}>
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis
                    dataKey="level"
                    tick={{ fill: '#6b7280', fontSize: 12, fontFamily: 'Inter, sans-serif' }}
                />
                <Radar
                    name="Puntuación (%)"
                    dataKey="value"
                    stroke="#dc4b4b"
                    fill="#dc4b4b"
                    fillOpacity={0.25}
                    strokeWidth={2}
                />
                <Tooltip
                    formatter={(value) => [`${value}%`, 'Puntuación']}
                    contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        fontSize: '12px',
                    }}
                />
            </RadarChart>
        </ResponsiveContainer>
    );
}

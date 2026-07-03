import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';

const BLOOM_BASE_STRUCTURE = [
    { level: "Remember", value: 0 },
    { level: "Understand", value: 0 },
    { level: "Apply", value: 0 },
    { level: "Analyze", value: 0 },
    { level: "Evaluate", value: 0 },
    { level: "Create", value: 0 },
];

export interface BloomRadarDataPoint {
    level: string;
    value: number;
}

interface BloomRadarChartProps {
    data: BloomRadarDataPoint[];
}

export function BloomRadarChart({ data }: BloomRadarChartProps) {
    const safeData = BLOOM_BASE_STRUCTURE.map(base => {
        const found = data.find(d => d.level === base.level);
        return {
            level: base.level,
            value: found?.value ?? 0,
        };
    });

    return (
        <ResponsiveContainer width="100%" height={280}>
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={safeData}>
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

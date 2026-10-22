import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import {BloomLevel, BloomLevelLabel} from "../../types/bloomLevel.ts";

export interface BloomRadarDataPoint {
    level: string;
    value: number;
}

interface BloomRadarChartProps {
    data: BloomRadarDataPoint[];
}

export function BloomRadarChart({ data }: BloomRadarChartProps) {
    const chartData  = Object.values(BloomLevel).map((level) => {
        const found = data.find((d) => d.level === level);

        return {
            level: BloomLevelLabel[level],
            value: found?.value ?? 0,
        };
    });

    return (
        <div className="w-full overflow-hidden">
            <ResponsiveContainer width="100%" height={260}>
                <RadarChart cx="50%" cy="50%" outerRadius="62%" data={chartData} margin={{ top: 10, right: 15, bottom: 10, left: 15 }}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis
                        dataKey="level"
                        tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'Inter, sans-serif' }}
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
        </div>
    );
}

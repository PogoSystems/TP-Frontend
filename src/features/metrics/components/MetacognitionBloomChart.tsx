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
import type { BloomMetacognitionResponse } from '../types/metacognition.types';
import { BloomLevelLabel } from '../../../shared/types/bloomLevel';

interface MetacognitionBloomChartProps {
    data: BloomMetacognitionResponse[];
}

function getBarColor(accuracy: number): string {
    if (accuracy >= 75) return '#59A14F';
    if (accuracy >= 50) return '#4E79A7';
    return '#f97316';
}

export function MetacognitionBloomChart({ data }: MetacognitionBloomChartProps) {
    const chartData = data.map((d) => ({
        name: BloomLevelLabel[d.bloom_level] ?? d.bloom_level,
        accuracy: Math.round(d.calibration_accuracy * 10) / 10,
        actual: d.actual_correct,
        expected: d.expected_correct,
        attempted: d.questions_attempted,
        bias: d.bias,
    }));

    return (
        <ResponsiveContainer width="100%" height={220}>
            <BarChart
                data={chartData}
                margin={{ top: 12, right: 12, left: -20, bottom: 0 }}
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
                    content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) return null;
                        const item = payload[0].payload;
                        return (
                            <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-md text-xs flex flex-col gap-1">
                                <p className="font-semibold text-[#1a3a5a] text-sm">{item.name}</p>
                                <p className="text-[#2e6f95] font-medium">
                                    Calibración: <span className="font-bold">{item.accuracy}%</span>
                                </p>
                                <div className="text-gray-500 text-[11px] pt-1 border-t border-gray-100 flex flex-col gap-0.5">
                                    <p>Preguntas evaluadas: {item.attempted}</p>
                                    <p>Aciertos reales: {item.actual}</p>
                                    <p>Aciertos proyectados: {item.expected}</p>
                                </div>
                            </div>
                        );
                    }}
                />
                <Bar dataKey="accuracy" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColor(entry.accuracy)} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

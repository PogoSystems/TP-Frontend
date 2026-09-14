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
import type { MetacognitionProgressPoint } from '../types/metacognition.types';

interface MetacognitionLineChartProps {
    points: MetacognitionProgressPoint[];
}

export function MetacognitionLineChart({ points }: MetacognitionLineChartProps) {
    const safeData =
        points.length > 0
            ? points.map((p) => ({
                  label: p.period,
                  accuracy: Math.round(p.calibration_accuracy * 10) / 10,
                  expected: p.avg_expected,
                  actual: p.avg_actual,
                  count: p.quizzes_count,
              }))
            : [{ label: '', accuracy: 0, expected: 0, actual: 0, count: 0 }];

    return (
        <ResponsiveContainer width="100%" height={280}>
            <RechartsLineChart
                data={safeData}
                margin={{ top: 12, right: 16, left: -16, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                    dataKey="label"
                    tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'Inter, sans-serif' }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tick={{ fill: '#6b7280', fontSize: 12, fontFamily: 'Inter, sans-serif' }}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip
                    content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) return null;
                        const data = payload[0].payload;
                        return (
                            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-md text-xs flex flex-col gap-1.5">
                                <p className="font-semibold text-[#1a3a5a] text-sm">{data.label}</p>
                                <p className="text-[#1a3a5a] font-medium">
                                    Calibración: <span className="font-bold">{data.accuracy}%</span>
                                </p>
                                <div className="text-gray-500 text-[11px] pt-1 border-t border-gray-100 flex flex-col gap-0.5">
                                    <p>Esperado promedio: <span className="font-semibold text-[#1a3a5a]">{data.expected}</span></p>
                                    <p>Real promedio: <span className="font-semibold text-[#1a3a5a]">{data.actual}</span></p>
                                    <p>Quizzes evaluados: <span className="font-semibold text-[#1a3a5a]">{data.count}</span></p>
                                </div>
                            </div>
                        );
                    }}
                />
                <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#1a3a5a"
                    strokeWidth={2.5}
                    dot={<Dot r={4} fill="#1a3a5a" stroke="#fff" strokeWidth={2} />}
                    activeDot={{ r: 6, fill: '#1a3a5a', stroke: '#fff', strokeWidth: 2 }}
                />
            </RechartsLineChart>
        </ResponsiveContainer>
    );
}

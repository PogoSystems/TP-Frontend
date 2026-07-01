interface QuizBloomResultBarProps {
    label: string;
    correct: number;
    total: number;
}

// Color per bloom label (matches order of difficulty)
const LABEL_COLORS: Record<string, string> = {
    Recordar: 'bg-[#fb2c36]',
    Comprender: 'bg-[#e25353]',
    Aplicar: 'bg-[#ffaf77]',
    Analizar: 'bg-[#fb2c36]',
    Evaluar: 'bg-[#fb2c36]',
    Crear: 'bg-[#e25353]',
};

export function QuizBloomResultBar({ label, correct, total }: QuizBloomResultBarProps) {
    const percentage = total > 0 ? (correct / total) * 100 : 0;
    const barColor = LABEL_COLORS[label] ?? 'bg-[#fb2c36]';

    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#364153] uppercase tracking-wide">{label}</p>
                <p className="text-sm text-[#4a5565]">{correct}/{total}</p>
            </div>
            <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                <div
                    className={`h-2 rounded-full ${barColor} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

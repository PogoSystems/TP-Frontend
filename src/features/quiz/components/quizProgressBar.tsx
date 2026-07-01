interface QuizProgressBarProps {
    percentage: number; // 0–100
}

export function QuizProgressBar({ percentage }: QuizProgressBarProps) {
    return (
        <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
            <div
                className="h-2 bg-[#db1a1a] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(Math.max(percentage, 0), 100)}%` }}
            />
        </div>
    );
}

type AnswerState = 'idle' | 'selected' | 'correct' | 'incorrect';

interface QuizAnswerOptionProps {
    text: string;
    state: AnswerState;
    onClick: () => void;
    disabled: boolean;
}

const STATE_STYLES: Record<AnswerState, string> = {
    idle: 'bg-white border-[#e5e7eb] hover:border-[#1a3a5a] hover:bg-gray-50 cursor-pointer',
    selected: 'bg-blue-50 border-blue-400 cursor-pointer',
    correct: 'bg-[#f0fdf4] border-[#00c950] cursor-default',
    incorrect: 'bg-[#fef2f2] border-[#fb2c36] cursor-default',
};

const STATE_ICON: Record<AnswerState, string | null> = {
    idle: null,
    selected: null,
    correct: '✓',
    incorrect: '✗',
};

const ICON_COLOR: Record<AnswerState, string> = {
    idle: '',
    selected: '',
    correct: 'text-[#00c950]',
    incorrect: 'text-[#fb2c36]',
};

export function QuizAnswerOption({ text, state, onClick, disabled }: QuizAnswerOptionProps) {
    const icon = STATE_ICON[state];

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full border-[1.6px] border-solid rounded-[10px] px-5 py-4 flex items-center justify-between transition-all duration-150 text-left ${STATE_STYLES[state]}`}
        >
            <span className="text-base font-medium text-[#1a3a5a]">{text}</span>
            {icon && (
                <span className={`text-lg font-bold shrink-0 ml-3 ${ICON_COLOR[state]}`}>
                    {icon}
                </span>
            )}
        </button>
    );
}

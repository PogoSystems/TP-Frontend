interface BloomLevel {
    title: string;
    description: string;
}

interface BloomLevelCardProps {
    level: BloomLevel
    isSelected: boolean
    onToggle: () => void
}

export function BloomLevelCard({ level, isSelected, onToggle }: BloomLevelCardProps) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className={`flex flex-col justify-center p-4 sm:p-5 border-1 rounded-lg w-full sm:w-48 flex-1 min-w-[140px] transition-colors duration-300 text-left cursor-pointer min-h-[44px]
                ${isSelected
                    ? 'border-accent bg-accent-bg text-accent font-medium'
                    : 'border-border-input hover:bg-accent-bg'
                }`}
        >
            <h3 className="text-sm sm:text-base font-semibold">{level.title}</h3>
            <p className="text-xs sm:text-sm font-light text-text-subtle">{level.description}</p>
        </button>
    )
}
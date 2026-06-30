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
            className={`flex flex-col justify-center p-5 border-1 rounded-sm w-48 transition-colors duration-300 text-left cursor-pointer
                ${isSelected
                    ? 'border-accent bg-accent-bg text-accent font-medium'
                    : 'border-border-input hover:bg-accent-bg'
                }`}
        >
            <h3 className="text-base font-semibold">{level.title}</h3>
            <p className="text-sm font-light">{level.description}</p>
        </button>
    )
}
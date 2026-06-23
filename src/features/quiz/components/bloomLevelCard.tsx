interface BloomLevel {
    title: string;
    description: string;
}

interface BloomLevelCardProps {
    level: BloomLevel
}

export function BloomLevelCard({level}: BloomLevelCardProps) {
    return(
        <div className="flex flex-col justify-center p-5 border-1 border-border-input rounded-sm w-48 hover:bg-accent-bg transition-colors duration-300">
            <h3 className="text-base font-semibold">{level.title}</h3>
            <p className="text-sm font-light">{level.description}</p>
        </div>
    )
}
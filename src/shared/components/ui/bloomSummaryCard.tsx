interface BloomSummaryCardProps {
    variant: 'dominant' | 'weak';
    level: string | null;
    percentage: number;
    answeredCount: number;
}

const VARIANT_STYLES = {
    dominant: {
        wrapper: 'bg-[#f4faf9] border-l-4 border-[#15616d] rounded-tl-[10px] rounded-tr-[60px] rounded-bl-[10px] rounded-br-[10px]',
        label: 'text-[#15616d]',
        percentage: 'text-[#15616d]',
        align: 'items-start',
    },
    weak: {
        wrapper: 'bg-[#fdfaf7] border-r-4 border-[#f28f3b] rounded-tl-[60px] rounded-tr-[10px] rounded-bl-[10px] rounded-br-[10px]',
        label: 'text-[#f28f3b]',
        percentage: 'text-[#f28f3b]',
        align: 'items-end text-right',
    },
};

const VARIANT_LABEL: Record<'dominant' | 'weak', string> = {
    dominant: 'Nivel más dominado',
    weak: 'Nivel a reforzar',
};

export function BloomSummaryCard({
    variant,
    level,
    percentage,
    answeredCount,
}: BloomSummaryCardProps) {
    const styles = VARIANT_STYLES[variant];

    return (
        <div className={`flex flex-col gap-2 px-8 pt-6 pb-10 ${styles.wrapper} ${styles.align} flex-1`}>
            <div className={`flex flex-col gap-2 ${styles.align}`}>
                <p className={`text-xs font-semibold uppercase tracking-wide ${styles.label}`}>
                    {VARIANT_LABEL[variant]}
                </p>
                <p className="text-xl font-bold text-[#1a3a5a] uppercase">{level ?? '—'}</p>
            </div>
            <p className={`text-4xl font-bold ${styles.percentage}`}>{percentage}%</p>
            <p className="text-sm text-[#4a5565]">{answeredCount} preguntas respondidas</p>
        </div>
    );
}

import { type BloomLevel, BloomLevelLabel } from '../../../shared/types/bloomLevel';

interface MetacognitionSummaryCardProps {
    variant: 'calibrated' | 'biased';
    level: BloomLevel | null;
    percentage: number;
    subtitle?: string;
}

const VARIANT_STYLES = {
    calibrated: {
        wrapper: 'bg-[#f4faf9] border-l-4 border-[#15616d] rounded-tl-[10px] rounded-tr-[60px] rounded-bl-[10px] rounded-br-[10px]',
        label: 'text-[#15616d]',
        percentage: 'text-[#15616d]',
        align: 'items-start',
    },
    biased: {
        wrapper: 'bg-[#fdfaf7] border-r-4 border-[#f28f3b] rounded-tl-[60px] rounded-tr-[10px] rounded-bl-[10px] rounded-br-[10px]',
        label: 'text-[#f28f3b]',
        percentage: 'text-[#f28f3b]',
        align: 'items-end text-right',
    },
};

const VARIANT_TITLE = {
    calibrated: 'Nivel más calibrado',
    biased: 'Mayor descalibración',
};

export function MetacognitionSummaryCard({
    variant,
    level,
    percentage,
    subtitle,
}: MetacognitionSummaryCardProps) {
    const styles = VARIANT_STYLES[variant];
    const displayLevel = level ? BloomLevelLabel[level] ?? level : '—';

    return (
        <div className={`flex flex-col gap-2 px-8 pt-6 pb-10 ${styles.wrapper} ${styles.align} flex-1`}>
            <div className={`flex flex-col gap-2 ${styles.align}`}>
                <p className={`text-xs font-semibold uppercase tracking-wide ${styles.label}`}>
                    {VARIANT_TITLE[variant]}
                </p>
                <p className="text-xl font-bold text-[#1a3a5a] uppercase">{displayLevel}</p>
            </div>
            <p className={`text-4xl font-bold ${styles.percentage}`}>{Math.round(percentage)}%</p>
            {subtitle && <p className="text-sm text-[#4a5565]">{subtitle}</p>}
        </div>
    );
}

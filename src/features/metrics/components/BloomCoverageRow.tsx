import type { BloomLevelKey } from '../types/metrics.types.ts';

interface BloomCoverageRowProps {
    level: BloomLevelKey;
    questionsAttempted: number;
    maxAttempted: number;           // max across all levels, used to scale bar width
}

const BLOOM_LABEL: Record<BloomLevelKey, string> = {
    remember:   'Recordar',
    understand: 'Comprender',
    apply:      'Aplicar',
    analyze:    'Analizar',
    evaluate:   'Evaluar',
    create:     'Crear',
};

/** Distinct colors per level matching the Figma design palette */
const BLOOM_COLOR: Record<BloomLevelKey, string> = {
    remember:   '#4e79a7',
    understand: '#dc4b4b',
    apply:      '#f28e2b',
    analyze:    '#59a14f',
    evaluate:   '#b07aa1',
    create:     '#76b7b2',
};

/**
 * Fila de la sección "Cobertura cognitiva por nivel".
 * Muestra la etiqueta del nivel, una barra de progreso proporcional al máximo,
 * y el número de preguntas intentadas.
 */
export function BloomCoverageRow({ level, questionsAttempted, maxAttempted }: BloomCoverageRowProps) {
    const widthPercent = maxAttempted > 0 ? Math.round((questionsAttempted / maxAttempted) * 100) : 0;
    const color = BLOOM_COLOR[level];

    return (
        <div className="flex items-center gap-3 w-full">
            <p className="text-[#1a3a5a] text-sm font-medium w-24 shrink-0">{BLOOM_LABEL[level]}</p>
            <div className="bg-[#e5e7eb] rounded-full h-3 flex-1 overflow-hidden">
                <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{ width: `${widthPercent}%`, backgroundColor: color }}
                />
            </div>
            <p className="text-[#6a7282] text-xs font-normal w-20 text-right shrink-0">
                {questionsAttempted} preguntas
            </p>
        </div>
    );
}

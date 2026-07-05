export const BloomLevel={
    REMEMBER:'remember',
    UNDERSTAND:'understand',
    APPLY:'apply',
    ANALYZE:'analyze',
    EVALUATE:'evaluate',
} as const

export const BloomLevelLabel: Record<BloomLevel, string> = {
    remember: 'Recordar',
    understand: 'Comprender',
    apply: 'Aplicar',
    analyze: 'Analizar',
    evaluate: 'Evaluar',
} as const


export type BloomLevel= typeof BloomLevel[keyof typeof BloomLevel]
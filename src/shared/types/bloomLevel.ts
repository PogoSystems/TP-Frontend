export const BloomLevel={
    REMEMBER:'remember',
    UNDERSTAND:'understand',
    APPLY:'apply',
    ANALYZE:'analyze',
    EVALUATE:'evaluate',
} as const

export const BloomLevelLabel: Record<BloomLevel, string> = {
    remember: 'RECORDAR',
    understand: 'COMPRENDER',
    apply: 'APLICAR',
    analyze: 'ANALIZAR',
    evaluate: 'EVALUAR',
} as const


export type BloomLevel= typeof BloomLevel[keyof typeof BloomLevel]
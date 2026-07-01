export const BloomLevel={
    REMEMBER:'remember',
    UNDERSTAND:'understand',
    APPLY:'apply',
    ANALYZE:'analyze',
    EVALUATE:'evaluate',
} as const

export type BloomLevel= typeof BloomLevel[keyof typeof BloomLevel]
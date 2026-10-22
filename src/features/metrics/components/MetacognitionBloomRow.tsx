import type { BloomMetacognitionResponse } from '../types/metacognition.types';
import { BloomLevelLabel } from '../../../shared/types/bloomLevel';

interface MetacognitionBloomRowProps {
    data: BloomMetacognitionResponse;
    maxScore: number;
}

const BLOOM_COLORS: Record<string, string> = {
    remember: '#4e79a7',
    understand: '#dc4b4b',
    apply: '#f28e2b',
    analyze: '#59a14f',
    evaluate: '#b07aa1',
};

export function MetacognitionBloomRow({ data, maxScore }: MetacognitionBloomRowProps) {
    const actualPercent = maxScore > 0 ? Math.min(100, Math.round((data.actual_correct / maxScore) * 100)) : 0;
    const expectedPercent = maxScore > 0 ? Math.min(100, Math.round((data.expected_correct / maxScore) * 100)) : 0;
    const clampedExpected = Math.max(2, Math.min(98, expectedPercent));
    const color = BLOOM_COLORS[data.bloom_level] || '#2e6f95';

    let biasBadge = { label: 'Calibrado', className: 'text-[#59A14F] rounded-lg border' };
    if (data.bias === 'overconfident') {
        biasBadge = { label: 'Sobreest.', className: 'text-[#F28E2B] rounded-lg border' };
    } else if (data.bias === 'underconfident') {
        biasBadge = { label: 'Subest.', className: 'text-[#4E79A7] rounded-lg border' };
    } else if (data.bias === 'variable') {
        biasBadge = { label: 'Variable', className: 'text-[#64748b] rounded-lg border' };
    }

    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 w-full py-1 sm:py-0 border-b border-gray-100/60 sm:border-b-0 pb-2 sm:pb-0 last:border-b-0 last:pb-0">
            {/* Cabecera en móvil / Etiqueta izquierda en escritorio */}
            <div className="flex items-center justify-between sm:w-24 sm:shrink-0">
                <p className="text-[#1a3a5a] text-sm font-medium">
                    {BloomLevelLabel[data.bloom_level] ?? data.bloom_level}
                </p>

                {/* Métricas y badge en móvil */}
                <div className="flex sm:hidden items-center gap-2">
                    <p className="text-[#64748b] text-xs font-medium">
                        {data.actual_correct} real / {data.expected_correct} esp
                    </p>
                    <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${biasBadge.className}`}
                    >
                        {biasBadge.label}
                    </span>
                </div>
            </div>

            {/* Barra de progreso: ancho completo en móvil, flexible en escritorio */}
            <div className="bg-[#e5e7eb] rounded-full h-2.5 flex-1 w-full sm:w-auto relative overflow-visible my-1 sm:my-0">
                <div
                    className="h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${actualPercent}%`, backgroundColor: color }}
                />
                <div
                    className="absolute -top-0.5 -bottom-0.5 w-1 bg-[#0f172a] rounded-full -translate-x-1/2 shadow-xs transition-all duration-500"
                    style={{ left: `${clampedExpected}%` }}
                    title={`Esperado: ${data.expected_correct}`}
                />
            </div>

            {/* Métricas y badge en escritorio */}
            <div className="hidden sm:flex sm:items-center sm:gap-3 sm:shrink-0">
                <p className="text-[#64748b] text-xs font-medium w-28 text-right shrink-0">
                    {data.actual_correct} real / {data.expected_correct} esp
                </p>

                <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${biasBadge.className}`}
                >
                    {biasBadge.label}
                </span>
            </div>
        </div>
    );
}

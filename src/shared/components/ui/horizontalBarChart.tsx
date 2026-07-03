import type {BloomLevel} from "../../types/bloomLevel.ts";

interface VerticalBarChartProps{
    percentage: number;
    bloomLevel:BloomLevel;
}

const BLOOM_LEVEL_COLOR: Record<BloomLevel, string> ={
    remember: 'bg-level-remember',
    understand: 'bg-level-understand',
    apply: 'bg-level-apply',
    analyze: 'bg-level-analyze',
    evaluate: 'bg-level-evaluate',
}

const BLOOM_LEVEL_LABEL: Record<BloomLevel, string> ={
    remember:'Recordar',
    understand:'Entender',
    apply:'Aplicar',
    analyze:'Analizar',
    evaluate:'Evaluar',
}

export function HorizontalBarChart({percentage, bloomLevel}: VerticalBarChartProps){
    return(
        <div className="flex flex-col gap-2 font-medium text-xs text-text-title">
            <div className="flex flex-row justify-between ">
                <p>{BLOOM_LEVEL_LABEL[bloomLevel]}</p>
                <p>{Math.round(percentage)}%</p>
            </div>
            <div className="bg-bg-bar-chart w-full rounded-xl">
                <div className={`${BLOOM_LEVEL_COLOR[bloomLevel]}  h-3 rounded-xl`} style={{width: `${percentage}%`}}>
                </div>
            </div>
        </div>
    )
}
import { Hairball } from "react-loader-spinner/beta";

interface SpinnerProps {
    width?: number;
    height?: number;
    className?: string;
    label?: string;
    monochrome?: boolean;
}

const BLOOM_COLORS = {
    fillColor1: "#4E79A7",
    fillColor2: "#F28E2B",
    fillColor3: "#DC4B4B",
    fillColor4: "#59A14F",
    fillColor5: "#B07AA1",
};

const WHITE_COLORS = {
    fillColor1: "#FFFFFF",
    fillColor2: "rgba(255, 255, 255, 0.8)",
    fillColor3: "rgba(255, 255, 255, 0.6)",
    fillColor4: "rgba(255, 255, 255, 0.9)",
    fillColor5: "#FFFFFF",
};

export function LoadSpinner({width, height, className = "", label, monochrome = false}: SpinnerProps) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <Hairball
                colors={monochrome ? WHITE_COLORS : BLOOM_COLORS}
                backgroundColor="transparent"
                width={width}
                height={height}
            />
            {label && <span className="text-lg text-text-subtle font-medium">{label}</span>}
        </div>
    );
}
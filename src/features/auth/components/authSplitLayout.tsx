import * as React from "react";
import { Card } from "../../../shared/components/ui/card.tsx";

interface AuthSplitLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    brandPlacement?: "top" | "bottom";
    brandSubtitle?: React.ReactNode;
    contentMaxWidth?: string;
}

export function AuthSplitLayout({ title, description, children, footer, brandPlacement = "top", brandSubtitle, contentMaxWidth = "lg:max-w-[372px]" }: AuthSplitLayoutProps) {
    return (
        <Card className="w-full max-w-[840px] overflow-hidden border-0 px-0 py-0 shadow-[0px_4px_20px_0px_rgba(26,43,68,0.08)]">
            <div className="grid min-h-full grid-cols-1 lg:grid-cols-[333fr_467fr]">
                <div className="relative hidden overflow-hidden bg-[linear-gradient(203.08deg,#441E1A_18.427%,#AC0000_97.693%)] px-8 py-10 text-white lg:block lg:px-12 lg:py-12">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full border border-white/10" />
                        <div className="absolute -bottom-20 left-[-24px] h-72 w-72 rounded-full border border-white/10" />
                    </div>

                    <div className={`relative flex h-full min-h-[260px] flex-col ${brandPlacement === "bottom" ? "justify-end" : "justify-between"}`}>
                        {brandPlacement === "top" ? (
                            <div className="space-y-4">
                                <p className="font-logo text-[48px] font-semibold leading-[1.17] tracking-[-0.02em]">Pogo.</p>
                                {brandSubtitle ? <div className="max-w-[220px] text-[16px] leading-6 text-white/95">{brandSubtitle}</div> : <p className="max-w-[220px] text-[16px] leading-6 text-white/95">Plataforma de gestión<br />académica integral.</p>}
                            </div>
                        ) : null}

                        {brandPlacement === "bottom" ? (
                            <div className="pb-2">
                                <p className="font-logo text-[48px] font-semibold leading-[1.17] tracking-[-0.02em]">Pogo.</p>
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-12">
                    <div className={`w-full max-w-full ${contentMaxWidth}`}>
                        <header className="space-y-2 pb-8">
                            <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.01em] text-text-title">
                                {title}
                            </h1>
                            <p className="text-[16px] leading-6 text-text-body">
                                {description}
                            </p>
                        </header>

                        {children}

                        {footer ? <div className="pt-8">{footer}</div> : null}
                    </div>
                </div>
            </div>
        </Card>
    )
}
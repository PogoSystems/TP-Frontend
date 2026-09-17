import { useState } from 'react';
import { GiMonkey } from 'react-icons/gi';
import {SnakeGame} from "./snakeGame.tsx";
import {DinoGame} from "./dinoGame.tsx";

export function GameLoader() {
    const [selectedGame, setSelectedGame] = useState<'snake' | 'dino'>('snake');
    const [score, setScore] = useState(0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 select-none">
            <div className="w-[360px] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">

                <div className="px-5 py-4 bg-[var(--color-bg-dashboard-card-primary)] flex items-center justify-between border-b border-black/20">
                    <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-black/20 text-white">
                            <GiMonkey size={22} />
                        </div>
                        <span className="font-[var(--font-logo)] text-2xl font-black italic tracking-wider text-white">
                            Pogo.
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="animate-pulse text-xs font-mono font-bold text-white/90">● CREANDO QUIZ...</span>
                    </div>
                </div>

                <div className="p-4 bg-black flex flex-col items-center">
                    <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2.5 px-1">
                        <span>{selectedGame === 'snake' ? 'Controles: ↑ ↓ ← →' : 'Controles: Espacio / ↑'}</span>
                        <span className="text-amber-400 font-bold">SCORE: {score}</span>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
                        {selectedGame === 'snake' ? (
                            <SnakeGame onScoreChange={setScore} />
                        ) : (
                            <DinoGame onScoreChange={setScore} />
                        )}
                    </div>
                </div>

                <div className="px-5 py-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">

                    </span>

                    <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                        <button
                            onClick={() => { setSelectedGame('snake'); setScore(0); }}
                            className={`px-3 py-1 text-xs font-mono font-bold rounded-md transition-all ${
                                selectedGame === 'snake'
                                    ? 'bg-[var(--color-bg-dashboard-card-primary)] text-white shadow-sm'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Snake
                        </button>
                        <button
                            onClick={() => { setSelectedGame('dino'); setScore(0); }}
                            className={`px-3 py-1 text-xs font-mono font-bold rounded-md transition-all ${
                                selectedGame === 'dino'
                                    ? 'bg-[var(--color-bg-dashboard-card-primary)] text-white shadow-sm'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Dino
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
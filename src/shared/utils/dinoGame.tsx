import { useEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import { GiMonkey } from 'react-icons/gi';
import { Banana } from 'lucide-react';

interface DinoGameProps {
    onScoreChange: (score: number) => void;
}

export function DinoGame({ onScoreChange }: DinoGameProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        const DINO_WIDTH = 24;
        const DINO_HEIGHT = 24;
        const BANANA_SIZE = 18;
        const GROUND_Y = height - 12;
        const GROUND_DINO_Y = GROUND_Y - DINO_HEIGHT;

        let dinoY = GROUND_DINO_Y;
        let dinoVy = 0;
        let isJumping = false;
        const gravity = 0.65;

        let obstacles: Array<{ x: number; w: number; h: number }> = [];
        let bananas: Array<{ x: number; y: number; collected: boolean }> = [];
        let score = 0;
        let frame = 0;

        const monkeySvg = renderToString(<GiMonkey size={DINO_HEIGHT} color="#f59e0b" />);
        const monkeyBlob = new Blob([monkeySvg], { type: 'image/svg+xml;charset=utf-8' });
        const monkeyUrl = URL.createObjectURL(monkeyBlob);
        const monkeyImg = new Image();
        let monkeyLoaded = false;
        monkeyImg.onload = () => { monkeyLoaded = true; };
        monkeyImg.src = monkeyUrl;

        const bananaSvg = renderToString(<Banana size={BANANA_SIZE} color="#facc15" />);
        const bananaBlob = new Blob([bananaSvg], { type: 'image/svg+xml;charset=utf-8' });
        const bananaUrl = URL.createObjectURL(bananaBlob);
        const bananaImg = new Image();
        let bananaLoaded = false;
        bananaImg.onload = () => { bananaLoaded = true; };
        bananaImg.src = bananaUrl;

        const handleKeyDown = (e: KeyboardEvent) => {
            if ([' ', 'ArrowUp'].includes(e.key)) {
                e.preventDefault();
                if (!isJumping) {
                    dinoVy = -10.5;
                    isJumping = true;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        const interval = setInterval(() => {
            frame++;

            dinoVy += gravity;
            dinoY += dinoVy;

            if (dinoY >= GROUND_DINO_Y) {
                dinoY = GROUND_DINO_Y;
                dinoVy = 0;
                isJumping = false;
            }

            if (frame % 90 === 0) {
                obstacles.push({
                    x: width,
                    w: 14,
                    h: 22 + Math.random() * 10,
                });
            }

            if (frame % 80 === 0 && Math.random() > 0.25) {
                bananas.push({
                    x: width,
                    y: GROUND_Y - 30 - Math.random() * 35, // Altura para saltar
                    collected: false,
                });
            }

            obstacles.forEach((obs) => (obs.x -= 4.2));
            obstacles = obstacles.filter((obs) => obs.x + obs.w > 0);

            bananas.forEach((b) => (b.x -= 4.2));
            bananas = bananas.filter((b) => b.x + BANANA_SIZE > 0 && !b.collected);

            const dinoX = 25;

            for (const b of bananas) {
                if (
                    !b.collected &&
                    dinoX < b.x + BANANA_SIZE &&
                    dinoX + DINO_WIDTH > b.x &&
                    dinoY < b.y + BANANA_SIZE &&
                    dinoY + DINO_HEIGHT > b.y
                ) {
                    b.collected = true;
                    score += 50;
                    onScoreChange(score);
                }
            }

            // Colisión con Obstáculos
            for (const obs of obstacles) {
                const obsY = GROUND_Y - obs.h;
                if (
                    dinoX < obs.x + obs.w &&
                    dinoX + DINO_WIDTH > obs.x &&
                    dinoY + DINO_HEIGHT > obsY
                ) {
                    obstacles = [];
                    bananas = [];
                    score = 0;
                    frame = 0;
                    dinoY = GROUND_DINO_Y;
                    dinoVy = 0;
                    isJumping = false;
                    onScoreChange(0);
                    break;
                }
            }

            if (frame % 5 === 0) {
                score += 1;
                onScoreChange(score);
            }

            ctx.fillStyle = '#0d1f12';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#15803d';
            ctx.fillRect(0, GROUND_Y - 2, width, 2);
            ctx.fillStyle = '#4a2e18'; // Tierra oscura
            ctx.fillRect(0, GROUND_Y, width, height - GROUND_Y);

            if (bananaLoaded) {
                bananas.forEach((b) => {
                    if (!b.collected) {
                        ctx.drawImage(bananaImg, b.x, b.y, BANANA_SIZE, BANANA_SIZE);
                    }
                });
            }

            ctx.fillStyle = '#166534';
            obstacles.forEach((obs) => {
                ctx.fillRect(obs.x, GROUND_Y - obs.h, obs.w, obs.h);
            });

            if (monkeyLoaded) {
                ctx.drawImage(monkeyImg, dinoX, dinoY, DINO_WIDTH, DINO_HEIGHT);
            }

        }, 1000 / 60);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearInterval(interval);
            URL.revokeObjectURL(monkeyUrl);
            URL.revokeObjectURL(bananaUrl);
        };
    }, [onScoreChange]);

    return <canvas ref={canvasRef} width={320} height={180} className="block bg-[#0d1f12] rounded" />;
}
import { useEffect, useRef } from 'react';

interface SnakeGameProps {
    onScoreChange: (score: number) => void;
}

export function SnakeGame({ onScoreChange }: SnakeGameProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const gridSize = 12;
        const tileCountX = Math.floor(canvas.width / gridSize);
        const tileCountY = Math.floor(canvas.height / gridSize);

        let snake = [{ x: 5, y: 5 }];
        let food = { x: 15, y: 10 };
        let dirX = 1;
        let dirY = 0;
        let nextDirX = 1;
        let nextDirY = 0;
        let score = 0;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }
            if (e.key === 'ArrowUp' && dirY === 0) { nextDirX = 0; nextDirY = -1; }
            if (e.key === 'ArrowDown' && dirY === 0) { nextDirX = 0; nextDirY = 1; }
            if (e.key === 'ArrowLeft' && dirX === 0) { nextDirX = -1; nextDirY = 0; }
            if (e.key === 'ArrowRight' && dirX === 0) { nextDirX = 1; nextDirY = 0; }
        };

        window.addEventListener('keydown', handleKeyDown);

        const spawnFood = () => {
            food = {
                x: Math.floor(Math.random() * tileCountX),
                y: Math.floor(Math.random() * tileCountY),
            };
        };

        const interval = setInterval(() => {
            dirX = nextDirX;
            dirY = nextDirY;

            const head = { x: snake[0].x + dirX, y: snake[0].y + dirY };

            if (head.x < 0) head.x = tileCountX - 1;
            if (head.x >= tileCountX) head.x = 0;
            if (head.y < 0) head.y = tileCountY - 1;
            if (head.y >= tileCountY) head.y = 0;

            if (snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
                snake = [{ x: 5, y: 5 }];
                dirX = 1; dirY = 0;
                nextDirX = 1; nextDirY = 0;
                score = 0;
                onScoreChange(0);
                return;
            }

            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                score += 10;
                onScoreChange(score);
                spawnFood();
            } else {
                snake.pop();
            }

            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#ef4444';
            ctx.fillRect(food.x * gridSize + 1, food.y * gridSize + 1, gridSize - 2, gridSize - 2);

            snake.forEach((seg, i) => {
                ctx.fillStyle = i === 0 ? '#22c55e' : '#4ade80';
                ctx.fillRect(seg.x * gridSize + 1, seg.y * gridSize + 1, gridSize - 2, gridSize - 2);
            });
        }, 80);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearInterval(interval);
        };
    }, [onScoreChange]);

    return <canvas ref={canvasRef} width={320} height={180} className="block bg-slate-900 rounded" />;
}
import { useState, useEffect } from 'react';

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

type CountdownProps = {
    /** ISO date string to count down to */
    targetDate: string;
};

const pad = (n: number) => String(n).padStart(2, '0');

function calcTimeLeft(target: number): TimeLeft {
    const diff = Math.max(0, target - Date.now());
    return {
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1_000),
    };
}

/** Live countdown timer to a target date. */
export default function Countdown({ targetDate }: CountdownProps) {
    const target = new Date(targetDate).getTime();
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(target));

    useEffect(() => {
        const id = setInterval(() => {
            setTimeLeft(calcTimeLeft(target));
        }, 1_000);
        return () => clearInterval(id);
    }, [target]);

    const blocks: { label: string; value: number }[] = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds },
    ];

    return (
        <div className="flex gap-3" aria-label="Countdown timer" role="timer">
            {blocks.map(({ label, value }) => (
                <div
                    key={label}
                    className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 px-3 py-3 rounded-xl w-20 shadow-inner"
                >
                    <span className="text-2xl font-black text-primary-600 dark:text-primary-400 tabular-nums">
                        {pad(value)}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-gray-500 mt-1">{label}</span>
                </div>
            ))}
        </div>
    );
}

import confetti from "canvas-confetti";
import { useEffect } from "react";

export function useConfetti() {
  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50;

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: Math.random() - 0.2,
        },
        colors: ["#FF69B4", "#FFB6C1", "#FFC0CB", "#FF1493", "#DB7093"],
        disableForReducedMotion: true,
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);
}

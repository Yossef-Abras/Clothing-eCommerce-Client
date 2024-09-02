import { useEffect } from "react";

const generateRandomPositions = (num) => {
  return Array.from({ length: num }).map(() => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 50 + 10,
    delay: Math.random() * 5,
  }));
};

export default function MovingCircles({ numCircles = 20 }) {
  const circles = generateRandomPositions(numCircles);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCircles = generateRandomPositions(numCircles);
      circles.forEach((circle, index) => {
        circle.top = newCircles[index].top;
        circle.left = newCircles[index].left;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [circles, numCircles]);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
      {circles.map((circle, index) => (
        <div
          key={index}
          className="absolute bg-orange-400 rounded-full opacity-50 animate-pulse"
          style={{
            top: `${circle.top}%`,
            left: `${circle.left}%`,
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            animationDelay: `${circle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

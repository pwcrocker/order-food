import { useEffect } from 'react';

export default function ProgressBar({
  totalTime,
  remainingTime,
  onDecrement,
  timeInterval,
}) {
  useEffect(() => {
    const interval = setInterval(() => {
      onDecrement(timeInterval);
    }, timeInterval);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress id="order-time" max={totalTime} value={remainingTime} />;
}

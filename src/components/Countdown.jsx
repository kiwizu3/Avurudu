import React, { useEffect, useState } from "react";

const Countdown = ({ targetDate, onReminder }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const diff = new Date(targetDate) - now;
    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, total: diff };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = getTimeLeft();
      setTimeLeft(newTime);
      if (newTime && newTime.total < 5 * 60 * 1000) onReminder?.();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return <span className="text-danger">Occurred</span>;

  const { days, hours, minutes, seconds } = timeLeft;

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`);
  if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`);
  parts.push(`${seconds}s`);

  return <h5 className="fw-bold">{parts.join(" ")}</h5>;
};

export default Countdown;

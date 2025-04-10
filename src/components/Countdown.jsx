import React, { useEffect, useState } from "react";

const Countdown = ({ targetDate, onReminder }) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  function getTimeLeft(date) {
    const now = new Date();
    const diff = new Date(date) - now;
    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, total: diff };
  }

  useEffect(() => {
    setTimeLeft(getTimeLeft(targetDate));

    const interval = setInterval(() => {
      const newTime = getTimeLeft(targetDate);
      setTimeLeft(newTime);
      if (newTime && newTime.total < 5 * 60 * 1000) onReminder?.();
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onReminder]);

  if (!timeLeft) return <small className="text-danger text-sm">Occurred</small>;

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="countdown-container">
      <TimeBlock value={days} label="days" />
      <TimeBlock value={hours} label="hrs" />
      <TimeBlock value={minutes} label="mins" />
      <TimeBlock value={seconds} label="secs" />
    </div>
  );
};

const TimeBlock = ({ value, label }) => (
  <div className="time-block">
    <div className="time-value">{value}</div>
    <div className="time-label">{label}</div>
  </div>
);

export default Countdown;

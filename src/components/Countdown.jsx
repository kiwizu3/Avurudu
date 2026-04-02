import React, { useEffect, useState } from "react";

const Countdown = ({ targetDate, onReminder }) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  // Convert a "YYYY-MM-DDTHH:mm:ss" string in Sri Lanka time (UTC+5:30) to a UTC Date
  function toSriLankaDate(dateStr) {
    // If it's already a full ISO string with offset, use as-is
    if (dateStr.includes("+") || dateStr.endsWith("Z")) {
      return new Date(dateStr);
    }
    // Otherwise, treat as Sri Lanka local time (UTC+5:30)
    // Append the SL offset explicitly
    return new Date(dateStr + "+05:30");
  }

  function getTimeLeft(targetDate) {
    const now = new Date();
    const target = typeof targetDate === "string" ? toSriLankaDate(targetDate) : targetDate;
    const diff = target - now;

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

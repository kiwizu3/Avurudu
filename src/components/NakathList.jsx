import React from "react";
import { motion } from "framer-motion";
import Countdown from "./Countdown.jsx";

const NakathList = ({ nakathData, language, showReminder }) => {
  const now = new Date();

  // Sort all events by time ascending
  const sorted = [...nakathData].sort((a, b) => new Date(a.time) - new Date(b.time));

  // Split into upcoming and past
  const upcoming = sorted.filter(event => new Date(event.time) > now);
  const past = sorted.filter(event => new Date(event.time) <= now);

  // Take the closest upcoming event as "featured"
  const featured = upcoming.length > 0 ? upcoming[0] : null;
  const rest = [...upcoming.slice(1), ...past];

  return (
    <div className="px-custom my-4">
      {/* Featured */}
      {featured && (
        <motion.div
          className="card border-2 border-gold mb-5 p-4 shadow-lg position-relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="position-absolute top-0 end-0 pe-3 pt-2 fs-4">🔥</span>
          <h2 className="mb-3">{featured[language].title}</h2>
          <p className="lead">{featured[language].description}</p>
          <Countdown targetDate={featured.time} onReminder={showReminder} />
        </motion.div>
      )}

      {/* Masonry List */}
      <div className="masonry-list mt-n4">
        {rest.map((item, index) => {
          const isPast = new Date(item.time) <= now;
          return (
            <div
              key={index}
              className={`masonry-item card border-2 border-gold mb-3 p-3 ${isPast ? "opacity-50" : ""}`}
            >
              <h3 className="mb-3">{item[language].title}</h3>
              <p>{item[language].description}</p>
              {item.time && (
                <div className="mt-2">
                  <Countdown targetDate={item.time} onReminder={showReminder} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NakathList;

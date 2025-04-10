import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Countdown from "./Countdown.jsx";

const NakathList = ({ nakathData, language, showReminder }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [overflowingStates, setOverflowingStates] = useState({});
  const descriptionRefs = useRef({});
  const measuredHeights = useRef({});

  const now = new Date();

  const sorted = [...nakathData].sort((a, b) => new Date(a.time) - new Date(b.time));
  const upcoming = sorted.filter(event => new Date(event.time) > now);
  const past = sorted.filter(event => new Date(event.time) <= now);

  const featured = upcoming.length > 0 ? upcoming[0] : null;
  const rest = [...upcoming.slice(1), ...past];

  const toggleExpand = (index) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  useEffect(() => {
    const newOverflowStates = {};

    Object.entries(descriptionRefs.current).forEach(([index, el]) => {
      if (el) {
        const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
        const maxHeight = lineHeight * 2;

        newOverflowStates[index] = el.scrollHeight > maxHeight;
        measuredHeights.current[index] = el.scrollHeight;
      }
    });

    setOverflowingStates(newOverflowStates);
  }, [language, nakathData, expandedIndex]);

  return (
    <div className="px-custom my-4">
      {/* Featured */}
      {featured && (
        <motion.div
          className="card featured-card border-2 border-gold mb-5 p-4 shadow-lg position-relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="position-absolute bottom-0 end-0 pe-2 pb-2 fs-4">🔥</span>
          <h2 className="mb-3 ritual-title">{featured[language].title}</h2>
          <p className="lead">{featured[language].description}</p>
          <Countdown targetDate={featured.time} onReminder={showReminder} />
        </motion.div>
      )}

      {/* Masonry List */}
      <div className="masonry-list mt-n4">
        {rest.map((item, index) => {
          const isPast = new Date(item.time) <= now;
          const isExpanded = expandedIndex === index;
          const description = item[language].description;

          return (
            <div
              key={index}
              className={`masonry-item card border-2 border-gold mb-3 p-3 ${isPast ? "opacity-50" : ""}`}
            >
              <h3 className="mb-3 ritual-title">{item[language].title}</h3>

              <motion.div
                initial={false}
                animate={{
                  height: isExpanded ? measuredHeights.current[index] || "auto" : 48,
                  opacity: isExpanded ? 1 : 0.9,
                  pointerEvents: isExpanded ? "auto" : "none",
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <motion.p
                  className={`description ${isExpanded ? "expanded" : "truncated"}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  ref={(el) => {
                    descriptionRefs.current[index] = el;
                  }}
                >
                  {description}
                </motion.p>
              </motion.div>

              {overflowingStates[index] && (
                <span
                  className="see-more-link"
                  onClick={() => toggleExpand(index)}
                >
                  {isExpanded ? "See less" : "See more"}
                </span>
              )}

              <div className="mt-2">
                <Countdown targetDate={item.time} onReminder={showReminder} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NakathList;

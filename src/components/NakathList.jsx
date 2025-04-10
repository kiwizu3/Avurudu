import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Countdown from "./Countdown.jsx";

const NakathList = ({ nakathData, language, showReminder }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [overflowingStates, setOverflowingStates] = useState({});
  const descriptionRefs = useRef({});
  const measuredHeights = useRef({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animateCards, setAnimateCards] = useState(true);

  // ⏱ Update every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // ❌ Disable animations briefly on language switch
  useEffect(() => {
    setAnimateCards(false);
    const timeout = setTimeout(() => setAnimateCards(true), 100);
    return () => clearTimeout(timeout);
  }, [language]);

  // 📏 Recalculate height & overflow on updates
  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      const newOverflowStates = {};
      Object.entries(descriptionRefs.current).forEach(([index, el]) => {
        if (el) {
          const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
          const maxHeight = lineHeight * 2;
          const scrollHeight = el.scrollHeight;

          newOverflowStates[index] = scrollHeight > maxHeight;
          measuredHeights.current[index] = scrollHeight;
        }
      });
      setOverflowingStates(newOverflowStates);
    });
  }, [language, nakathData, expandedIndex]);

  const sorted = [...nakathData].sort((a, b) => new Date(a.time) - new Date(b.time));
  const upcoming = sorted.filter(event => new Date(event.time) > currentTime);
  const past = sorted.filter(event => new Date(event.time) <= currentTime);

  const featured = upcoming.length > 0 ? upcoming[0] : null;
  const rest = [...upcoming.slice(1), ...past];

  const toggleExpand = (index) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

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
        <AnimatePresence>
          {rest.map((item, index) => {
            const isPast = new Date(item.time) <= currentTime;
            const isExpanded = expandedIndex === index;
            const description = item[language].description;

            const Wrapper = animateCards ? motion.div : "div";

            return (
              <Wrapper
                key={item.time}
                layout={animateCards ? true : undefined}
                initial={animateCards ? { opacity: 0, y: -10 } : undefined}
                animate={animateCards ? { opacity: 1, y: 0 } : undefined}
                exit={animateCards ? { opacity: 0, y: 10 } : undefined}
                transition={animateCards ? { duration: 0.3 } : undefined}
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
                    {language === "en"
                      ? isExpanded ? "See less" : "See more"
                      : isExpanded ? "සඟවන්න" : "තවත් බලන්න"}
                  </span>
                )}

                <div className="mt-2">
                  <Countdown targetDate={item.time} onReminder={showReminder} />
                </div>
              </Wrapper>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NakathList;

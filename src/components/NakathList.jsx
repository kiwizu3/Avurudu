import React from "react";
import Countdown from "./Countdown.jsx";

const NakathList = ({ nakathData, language, showReminder }) => {
  // Sort by descending time (recent first)
  const sortedData = [...nakathData].sort((a, b) => new Date(a.time) - new Date(b.time));

  return (
    <div className="masonry-list">
      {sortedData.map((item, index) => (
        <div key={index} className="masonry-item bg-white card border-2 border-gold mb-3 p-3">
          <h3 className="mb-3">{item[language].title}</h3>
          <p className="">{item[language].description}</p>
          {item.time && (
            <div className="mt-2">
              <Countdown targetDate={item.time} onReminder={showReminder} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NakathList;

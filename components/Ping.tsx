import React from "react";

const Ping = () => {
  return (
    <div className="relative">
      <div className="absolute -left-2 -top-2">
        <span className="flex w-3 h-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-400 opacity-75"></span>
          <span className="relative inline-flex w-3 h-3 rounded-full bg-success-500"></span>
        </span>
      </div>
    </div>
  );
};

export default Ping;
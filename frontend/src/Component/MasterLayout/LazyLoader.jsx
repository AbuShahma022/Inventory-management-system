import React from "react";

function LazyLoader() {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 overflow-hidden z-[9999]">
      <div className="h-1 bg-blue-500 animate-loader"></div>
    </div>
  );
}

export default LazyLoader;

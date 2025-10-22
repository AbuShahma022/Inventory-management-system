import React from "react";
import { FadeLoader } from "react-spinners";
import { useSelector } from "react-redux";

function FullScreenLoader() {
  const {visible} = useSelector((state) => state.loader);
  if (!visible) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-[9999]">
      <FadeLoader color="#36d7b7" height={15} width={5} radius={2} margin={2} />
    </div>
  );
}

export default FullScreenLoader;

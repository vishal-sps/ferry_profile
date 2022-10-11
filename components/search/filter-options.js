import React from "react";
import Close from "../close.svg";

function FilterOptions() {
  return (
    <div className="text-sm flex items-center md:mb-0 mb-5">
      <button
        onClick={() => setShow(true)}
        className="border p-2 rounded-lg mr-3 flex items-center"
      >
        <div className="bg-red-500 text-white rounded-full h-4 w-4 text-xs mr-1">
          1
        </div>
        Filter
      </button>

      <button className="bg-black text-white p-2 rounded-lg mr-3 flex items-center">
        Popular
        <Close className="ml-2" />
      </button>

      <button className="border p-2 rounded-lg">Ratings</button>
    </div>
  );
}

export default FilterOptions;

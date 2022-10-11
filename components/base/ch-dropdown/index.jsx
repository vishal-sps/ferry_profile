import React, { useEffect, useRef, useState } from "react";

import { useOuterClick } from "../../../utils/useOuterClicks";

function ChDropdown({
  children,
  options,
  handleOnClick,
  loading,
  show = false,
  width = 300,
  height = 500,
  top = 40,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useOuterClick(dropdownRef, () => {
    if (showDropdown) {
      setShowDropdown(false);
    }
  });

  useEffect(() => {
    setShowDropdown(show);
  }, [show]);

  return (
    <div className="relative h-full">
      <div className="flex flex-col h-full" ref={dropdownRef}>
        {children}
      </div>

      {showDropdown && (
        <div className="absolute z-20" style={{ top, width }}>
          {loading ? (
            <div className="text-sm bg-white border rounded px-3 py-2">
              Loading...
            </div>
          ) : (
            <>
              {options.length ? (
                <div
                  className="flex flex-col bg-white border rounded px-3 py-2"
                  style={{ maxHeight: height, overflowY: "auto" }}
                >
                  {options.map((option) => (
                    <div
                      className="text-sm py-2 hover:bg-red-500 hover:text-white px-2 cursor-pointer"
                      key={option.id}
                      onClick={() => handleOnClick(option)}
                    >
                      {option.name}
                    </div>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ChDropdown;

import { useEffect } from "react";

/**
 * Hook allows callback when clicked outside of the passed ref
 */
export const useOuterClick = (ref, callback) => {
  useEffect(() => {
    /**
     * return callback if clicked outside of ref element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        return callback();
      }
    }

    // Bind the event listener
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    };
  });
};

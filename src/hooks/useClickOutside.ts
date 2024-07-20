import { useEffect, useRef } from "react";
import { assertIsNode } from "../lib/assertions";

// Hook to add a click event listener to the document body checking
// if user clicked outside of rendered element. Accepts callback
// function as arg that is called if user clicked outside element.
export function useClickOutside(callback: Function) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      assertIsNode(e.target);
      if (wrapperRef.current?.contains(e.target)) return;
      callback();
    }

    // This is a workaround to prevent click event from firing on render.
    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [wrapperRef, callback]);

  return { wrapperRef };
}

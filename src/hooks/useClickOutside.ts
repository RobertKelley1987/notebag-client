import { useEffect, useRef } from "react";
import { assertIsNode } from "../lib/assertions";

export function useClickOutside(callback: Function, deps?: any[]) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
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
    },
    deps ? [...deps, wrapperRef] : [wrapperRef]
  );

  return { wrapperRef };
}

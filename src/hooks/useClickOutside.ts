import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { assertIsNode } from "../utils";

export function useClickOutside() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      assertIsNode(e.target);
      if (wrapperRef.current?.contains(e.target)) return;
      navigate("/");
    }

    // This is a shitty workaround, otherwise click event fires on render.
    setTimeout(() => {
      document.body.addEventListener("click", handleClick);
    }, 100);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [wrapperRef]);

  return { wrapperRef };
}

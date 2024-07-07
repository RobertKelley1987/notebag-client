import { useState, useEffect } from "react";

const MOBILE_PX = "640px";

// Hook to detect mobile screen size.
// Returns boolean indicating whether screen is mobile size.
export function useScreenSize() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  console.log(isSmallScreen);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_PX})`);
    const callback = () => setIsSmallScreen(mediaQuery.matches);

    // Set initial state
    setIsSmallScreen(mediaQuery.matches);

    // Update state when query status changes
    mediaQuery.addEventListener("change", callback);

    return () => mediaQuery.removeEventListener("change", callback);
  }, []);

  return { isSmallScreen };
}

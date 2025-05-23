
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Check immediately
    checkMobile();
    
    // Add event listener with performance optimization
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(checkMobile, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return !!isMobile;
}

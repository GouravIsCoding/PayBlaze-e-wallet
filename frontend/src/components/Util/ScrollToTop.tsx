import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]); // Empty dependency array means this effect will run only once after the component mounts

  return null; // No need to render anything, just scroll to top
}

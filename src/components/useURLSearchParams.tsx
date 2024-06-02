import { useState, useEffect } from "react";

const getURLSearchParams = () => {
  if (typeof window !== "undefined") {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams(); // Return a new instance to avoid undefined errors
};

export const useURLSearchParams = () => {
  const [urlSearchParams, setUrlSearchParams] = useState(getURLSearchParams);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const onChange = () => {
        setUrlSearchParams(new URLSearchParams(window.location.search));
      };

      window.addEventListener("popstate", onChange);
      return () => {
        window.removeEventListener("popstate", onChange);
      };
    }
  }, []);

  return urlSearchParams;
};

export default useURLSearchParams;

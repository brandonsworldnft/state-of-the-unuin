import { useRef, useEffect, useState } from "react";

export const useWidthRef = () => {
  const widthRef = useRef(null);
  const [width, setWidth] = useState(undefined);
  const [height, setHeight] = useState(undefined);

  const getWidth = () => {
    const newWidth = widthRef?.current?.clientWidth;
    const newHeight = widthRef?.current?.clientHeight;
    setWidth(newWidth);
    setHeight(newHeight);
  };

  useEffect(() => {
    getWidth();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", getWidth);
    return () => {
      window.removeEventListener("resize", getWidth);
    };
  }, [width]);

  return { widthRef, width, height, getWidth };
};

import { useSpring, type UseSpringProps } from "@react-spring/web";
import { useEffect, useMemo, useState } from "react";

export const useMousePosition = (
  springProps?: UseSpringProps,
  springDeps?: readonly any[]
) => {
  const [X, setX] = useState(0);
  const [Y, setY] = useState(0);

  const [{ x, y }, api] = useSpring(
    () => ({
      x: X + 0.1,
      y: Y + 0.1,
      ...springProps,
    }),
    springDeps
  );

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // console.log({ clientx: event.clientX, clienty: event.clientY });
      api.start({ x: event.clientX, y: event.clientY });
      setX(event.clientX);
      setY(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return useMemo(
    () => ({
      x,
      y,
    }),
    [x, y]
  );
};

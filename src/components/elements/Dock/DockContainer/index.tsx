import * as React from "react";
import { animated, useSpringValue } from "@react-spring/web";
import { clamp } from "@react-spring/shared";

import { DockContext } from "./DockContext";
import { useWindowResize } from "../hooks/useWindowResize";

interface DockProps {
  children: React.ReactNode;
}

export const DOCK_ZOOM_LIMIT = [-100, 50];

const DockContainer = ({ children }: DockProps) => {
  const [hovered, setHovered] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  const isZooming = React.useRef(false);
  const dockRef = React.useRef<HTMLDivElement>(null!);

  const setIsZooming = React.useCallback((value: boolean) => {
    isZooming.current = value;
    setHovered(!value);
  }, []);

  const zoomLevel = useSpringValue(1, {
    onChange: () => {
      setWidth(dockRef.current.clientWidth);
    },
  });

  useWindowResize(() => {
    setWidth(dockRef.current.clientWidth);
  });

  return (
    <DockContext.Provider value={{ hovered, setIsZooming, width, zoomLevel }}>
      <animated.div
        ref={dockRef}
        style={{
          position: "fixed",
          bottom: "6px",
          left: "50%",
          transform: "translateX(-50%)",
          alignItems: "flex-end",
          height: "50px",
          display: "flex",
          padding: "0 12px",
          gap: "14px",
          backgroundColor: "rgba(40, 40, 40, 0.215)",
          backdropFilter: "blur(12px)",
          boxShadow: "inset 0 0 0.1em rgba(255, 255, 255, 0.66)",
          border: "solid 1px rgba(40, 40, 40, 0.1625)",
          willChange: "contents",
          boxSizing: "content-box",
          borderRadius: "12px",
          transformOrigin: "center bottom",

          // x: "-50%",
          scale: zoomLevel
            .to({
              range: [DOCK_ZOOM_LIMIT[0], 1, DOCK_ZOOM_LIMIT[1]],
              output: [2, 1, 0.5],
            })
            .to((value) => clamp(0.5, 2, value)),
        }}
        onMouseOver={() => {
          if (!isZooming.current) {
            setHovered(true);
          }
        }}
        onMouseOut={() => {
          setHovered(false);
        }}
      >
        {children}
      </animated.div>
    </DockContext.Provider>
  );
};

export default DockContainer;

import React, { useState } from "react";
import Draggable from "react-draggable";
import HeadingBar from "./HeadingBar";
import { animated, useSpring } from "@react-spring/web";

type Props = {
  title: string;
  children: React.ReactNode;
};

const Window = ({ title, children }: Props) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [oldPos, setOldPos] = useState({ x: 0, y: 0 });

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      setOldPos({ x: pos.x, y: pos.y });
      setPos({ x: 0, y: 0 });
    } else {
      setPos({ x: oldPos.x, y: oldPos.y });
    }
    setIsFullScreen(!isFullScreen);
  };

  const styles = useSpring({
    to: {
      height: isFullScreen ? "91.5%" : "50%",
      minWidth: isFullScreen ? "100%" : "60%",
      minHeight: isFullScreen ? "91.5%" : "25%",
      maxWidth: isFullScreen ? "100%" : "80%",
    },
    config: {
      mass: 1,
      tension: 300,
      friction: 30,
    },
  });

  return (
    <div className="grid place-items-center min-h-screen overflow-hidden">
      <Draggable
        handle=".heading-bar"
        position={pos}
        onDrag={(e, data) => {
          setPos({ x: data.x, y: data.y });
        }}
      >
        <animated.div
          className={`rounded-lg shadow-xl resize overflow-hidden backdrop-blur-lg bg-[rgb(23,23,23,0.85)] ${
            isFullScreen ? "mt-[-35px]" : ""
          }`}
          style={styles}
        >
          <HeadingBar title={title} onExpandClick={toggleFullScreen} />
          {children}
        </animated.div>
      </Draggable>
    </div>
  );
};

export default Window;

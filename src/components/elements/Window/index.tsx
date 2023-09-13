import React from "react";
import Draggable from "react-draggable";
import HeadingBar from "./HeadingBar";

type Props = {
  children?: React.ReactNode;
};

const Window = ({ children }: Props) => {
  return (
    <div className="grid place-items-center min-h-screen overflow-hidden">
      <Draggable bounds="parent" handle=".heading-bar">
        <div
          className="rounded-lg shadow-xl resize overflow-hidden backdrop-blur-lg bg-[rgb(23,23,23,0.85)]"
          style={{
            height: "40%",
            minWidth: "60%",
            minHeight: "25%",
            maxHeight: "80%",
            maxWidth: "80%",
          }}
        >
          <HeadingBar />
          {children}
        </div>
      </Draggable>
    </div>
  );
};

export default Window;

import React from "react";
import MenuContent from "../Menu";
import Draggable from "react-draggable";
import Dock from "../Dock";
import Terminal from "../Terminal";
import HeadingBar from "./HeadingBar";

type Props = {
  children?: React.ReactNode;
};

const Window = ({ children }: Props) => {
  const BOUND = 512;
  return (
    <div>
      <MenuContent programName="Finder" />
      <div className="grid place-items-center min-h-screen overflow-hidden">
        <Draggable
          bounds={{
            top: -128,
            left: -BOUND,
            right: BOUND,
            bottom: BOUND,
          }}
          handle=".heading-bar"
        >
          <div className="rounded-lg shadow-xl resize overflow-hidden backdrop-blur-lg bg-[rgb(23,23,23,0.85)] h-1/4 w-3/4">
            <HeadingBar />
            {/* <Terminal /> */}
          </div>
        </Draggable>
      </div>
      <Dock />
    </div>
  );
};

export default Window;

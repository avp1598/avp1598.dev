import React from "react";
import MenuContent from "../Menu";
import Dock from "../Dock";

type Props = {};

const Window = (props: Props) => {
  return (
    <div>
      <MenuContent programName="Finder" />
      <Dock />
    </div>
  );
};

export default Window;

import React from "react";
import * as Menubar from "@radix-ui/react-menubar";
import AppleIcon from "@/static/apple.png";
import BatteryIcon from "@/static/battery.png";
import WifiIcon from "@/static/wifi.png";
import ControlCenterIcon from "@/static/controlcenter.png";
import { convertToReadableDate } from "@/utils";

type MenuContentProps = {
  title: string;
};

const MenuContent = ({ title }: MenuContentProps) => {
  return (
    <Menubar.Root className="hidden md:flex justify-between items-center absolute z-10 bg-[rgb(40,40,40,0.25)] text-white w-full h-6 box-border text-sm backdrop-blur-lg">
      <Menubar.Menu>
        <div className="mx-4 flex flex-row items-center gap-4">
          <Menubar.Trigger id="apple">
            <img
              src={AppleIcon.src}
              className="h-[18px] w-[16px] mb-0.5"
              style={{
                filter: "invert(1)",
              }}
              alt="Apple"
            />
          </Menubar.Trigger>
          <Menubar.Trigger id="title">
            <div className="text-xs font-bold ml-2">{title}</div>
          </Menubar.Trigger>
          <Menubar.Trigger id="file">
            <div className="text-xs">File</div>
          </Menubar.Trigger>
          <Menubar.Trigger id="edit">
            <div className="text-xs">Edit</div>
          </Menubar.Trigger>
          <Menubar.Trigger id="view">
            <div className="text-xs">View</div>
          </Menubar.Trigger>
          <Menubar.Trigger id="window">
            <div className="text-xs">Window</div>
          </Menubar.Trigger>
          <Menubar.Trigger id="help">
            <div className="text-xs">Help</div>
          </Menubar.Trigger>
        </div>
        <div className="flex flex-row gap-4 float-right mr-4 items-center opacity-90">
          <Menubar.Trigger id="battery">
            <img
              src={BatteryIcon.src}
              className="h-[12px] w-[20px]"
              style={{
                filter: "invert(1)",
              }}
              alt="Battery"
            />
          </Menubar.Trigger>
          <Menubar.Trigger id="wifi">
            <img
              src={WifiIcon.src}
              className="h-[12px] w-[16px]"
              style={{
                filter: "invert(1)",
              }}
              alt="Wifi"
            />
          </Menubar.Trigger>
          <Menubar.Trigger id="controlcenter">
            <img
              src={ControlCenterIcon.src}
              className="h-[12px] w-[14px]"
              style={{
                filter: "invert(1)",
              }}
              alt="Control Center"
            />
          </Menubar.Trigger>
          <Menubar.Trigger id="time">
            <div className="text-xs">
              {convertToReadableDate(new Date().getTime())}
            </div>
          </Menubar.Trigger>
        </div>
      </Menubar.Menu>
    </Menubar.Root>
  );
};

export default MenuContent;

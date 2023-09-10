import React from "react";
import styles from "./styles.module.css";
import icon from "@/static/home.png";

type Props = {};

const HeadingBar = (props: Props) => {
  return (
    <div className="heading-bar">
      <div className={styles.wrapper}>
        <div className="flex flex-row gap-2 ml-3">
          <div className="bg-[rgb(255,95,88)] h-[0.9rem] w-[0.9rem] rounded-full border border-[hsl(2.5,100%,55.5%)] cursor-pointer" />
          <div className="bg-[rgb(255,189,46)] h-[0.9rem] w-[0.9rem] rounded-full border border-[hsl(41,100%,48.7%)] cursor-pointer" />
          <div className="bg-[rgb(38,201,0)] h-[0.9rem] w-[0.9rem] rounded-full border border-[hsl(100,100%,40.8%)] cursor-pointer" />
        </div>
        <div className="flex flex-row mx-2 gap-2 items-center justify-center w-full">
          <img
            src={icon.src}
            alt="icon"
            className="w-[1.5rem] h-[1.5rem] mr-2"
          />
          <div className="text-[rgb(100,100,100)] flex-nowrap text-ellipsis overflow-hidden font-semibold">
            avp: ~/Documents/portfolio — zsh — 100×35
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadingBar;

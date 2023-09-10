import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

type Props = {};

const Terminal = (props: Props) => {
  const [val, setVal] = useState("");
  const [typing, setTyping] = useState(false);
  const [command, setCommand] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.addEventListener("select", (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
    inputRef.current?.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => setTyping(false), 200);
    return () => clearTimeout(timeoutId);
  }, [typing]);

  return (
    <div className="p-2">
      <div className="flex items-center">
        <div className="text-[rgb(255,95,88)] font-mono">root@avp1598:~ </div>
        <input
          type="text"
          value={val}
          ref={inputRef}
          className="bg-transparent outline-none text-[rgb(40,220,14)] font-mono w-0 max-w-[100ch] caret-transparent border-none ml-2"
          onBlur={(e) => e.target.focus()}
          onChange={(e) => {
            e.preventDefault();
            if (e.target.value.length > 100) return;
            setVal(e.target.value);
            setTyping(true);
            e.target.style.width = `${e.target.value.length}ch`;
          }}
          onKeyDown={(e) => {
            let ctrlCheck = false;
            if (e.ctrlKey) {
              ctrlCheck = true;
            }
            if (!cursorRef.current || !inputRef.current) return;
            let currentPos = parseFloat(
              cursorRef.current.style.transform.slice(11)
            );
            let textLength = inputRef.current.value.length;
            let checkPos = Math.abs(Math.floor(currentPos));
            switch (e.key) {
              case "ArrowLeft":
                console.log({ checkPos, textLength, ctrlCheck });
                if (checkPos < textLength && !ctrlCheck) {
                  setTyping(true);
                  cursorRef.current.style.transform = `translateX(${
                    currentPos - 1
                  }ch)`;
                } else {
                  e.preventDefault();
                }
                break;
              case "Delete":
                if (checkPos !== 1 && !ctrlCheck) {
                  cursorRef.current.style.transform = `translateX(${
                    currentPos + 1
                  }ch)`;
                } else {
                  e.preventDefault();
                }
                break;
              case "Home":
                if (checkPos <= textLength) {
                  cursorRef.current.style.transform = `translateX(${
                    -textLength - 0.5
                  }ch)`;
                } else {
                  e.preventDefault();
                }
                break;
              case "End":
                if (checkPos !== 1) {
                  cursorRef.current.style.transform = `translateX(-0.5ch)`;
                } else {
                  e.preventDefault();
                }
                break;
              case "ArrowRight":
                console.log({ checkPos, textLength, ctrlCheck });
                if (checkPos !== 0 && !ctrlCheck) {
                  setTyping(true);
                  cursorRef.current.style.transform = `translateX(${
                    currentPos + 1
                  }ch)`;
                } else {
                  e.preventDefault();
                }
                break;
              // case "ArrowUp":
              //   if (counter > 0) {
              //     setCounter(counter - 1);
              //     let currentCommand = commands[counter - 1];
              //     setVal(currentCommand);
              //     e.target.style.width =
              //       currentCommand.length + "ch";
              //     cursorRef.current.style.transform = `translateX(${
              //       -currentCommand.length - 0.5
              //     }ch)`;
              //   }
              //   break;
              // case "ArrowDown":
              //   if (counter <= commands.length - 1) {
              //     if (counter === commands.length - 1) {
              //       setVal("");
              //       e.target.style.width = "0ch";
              //       cursorRef.current.style.transform = `translateX(-0.5ch)`;
              //     } else {
              //       setCounter(counter + 1);
              //       let currentCommand = commands[counter + 1];
              //       setVal(currentCommand);
              //       e.target.style.width =
              //         currentCommand.length + "ch";
              //       cursorRef.current.style.transform = `translateX(${
              //         -currentCommand.length - 0.5
              //       }ch)`;
              //     }
              //   }
              //   break;
              case "Enter":
                // setCommand(val);
                break;
              default:
                // console.log(e.key)
                break;
            }
          }}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
        />
        {/* <div className="w-2 h-4 bg-[rgb(40,255,18)] animate-blink" /> */}
        <div
          ref={cursorRef}
          className={clsx(
            "w-[1ch] h-4 bg-[rgb(40,220,14)] font-mono",
            typing ? "animate-none" : "animate-blink"
          )}
          style={{
            transform: "translateX(0ch)",
          }}
        />
      </div>
    </div>
  );
};

export default Terminal;

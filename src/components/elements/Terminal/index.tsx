import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { getResponse } from "./commands";

type Props = {};

const Terminal = (props: Props) => {
  const [commands, setCommands] = useState<string[]>([""]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    if (commands.length === 0) setCommands([""]);
  }, [commands]);

  return (
    <SimpleBar
      style={{
        height: "90%",
        maxHeight: "calc(100vh - 100px)",
      }}
    >
      <div className="p-2">
        <div className="font-mono text-terminal">
          <div>ZSH version 6.9.0 (x86_64-apple-darwin20.3.0)</div>
          <div>
            Type <span className="text-cyan-500">'help'</span> to get started.
          </div>
        </div>
        {commands.map((cmd, i) => (
          <div key={i} className="mb-1">
            <TerminalInput
              index={i}
              command={cmd}
              setCommands={setCommands}
              commandHistory={commandHistory}
              setCommandHistory={setCommandHistory}
              historyIndex={historyIndex}
              setHistoryIndex={setHistoryIndex}
            />
          </div>
        ))}
      </div>
    </SimpleBar>
  );
};

type TerminalInputProps = {
  index: number;
  command: string;
  setCommands: React.Dispatch<React.SetStateAction<string[]>>;
  commandHistory: string[];
  setCommandHistory: React.Dispatch<React.SetStateAction<string[]>>;
  historyIndex: number;
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const TerminalInput = ({
  index,
  command,
  setCommands,
  commandHistory,
  setCommandHistory,
  historyIndex,
  setHistoryIndex,
}: TerminalInputProps) => {
  const [typing, setTyping] = useState(false);

  const [val, setVal] = useState<string>(command);
  const [response, setResponse] = useState<JSX.Element>();
  const [disabled, setDisabled] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!disabled) {
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
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => setTyping(false), 200);
    return () => clearTimeout(timeoutId);
  }, [typing]);

  return (
    <>
      <div className="flex items-center">
        <div className="text-[rgb(255,95,88)] font-mono">root@avp1598:~ </div>
        <input
          aria-label="Terminal Input"
          type="text"
          value={val}
          ref={inputRef}
          className="bg-transparent outline-none text-terminal font-mono w-0 max-w-[100ch] caret-transparent border-none ml-2"
          onBlur={(e) => {
            if (!disabled) {
              e.target.focus();
            }
          }}
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
                if (checkPos !== 0 && !ctrlCheck) {
                  setTyping(true);
                  cursorRef.current.style.transform = `translateX(${
                    currentPos + 1
                  }ch)`;
                } else {
                  e.preventDefault();
                }
                break;
              case "ArrowUp":
                if (historyIndex > 0) {
                  const target = e.target as HTMLInputElement;
                  setHistoryIndex((prev) => {
                    const newIndex = prev - 1;
                    setVal(commandHistory[newIndex]);
                    target.style.width = `${commandHistory[newIndex].length}ch`;
                    return newIndex;
                  });
                }
                break;
              case "ArrowDown":
                if (historyIndex < commandHistory.length - 1) {
                  const target = e.target as HTMLInputElement;
                  setHistoryIndex((prev) => {
                    const newIndex = prev + 1;
                    setVal(commandHistory[newIndex]);
                    target.style.width = `${commandHistory[newIndex].length}ch`;
                    return newIndex;
                  });
                }
                break;
              case "Enter":
                setDisabled(true);
                setHistoryIndex((prev) => prev + 1);
                setCommandHistory((prev) => [...prev, val.trim()]);

                if (val.trim() === "clear") {
                  setCommands([]);
                  return;
                }

                const response = getResponse(val.trim());
                setResponse(response);
                setCommands((prev) => {
                  prev[index] = val.trim();
                  prev.push("");
                  return prev;
                });
                break;
              case "Tab":
                e.preventDefault();
                const target = e.target as HTMLInputElement;
                const availableFiles = [
                  ".github",
                  "src",
                  "README.md",
                  "PROJECTS.md",
                  "resume.sh",
                  "contact.ts",
                ];
                const currentVal = target.value;
                const currentValSplit = currentVal.split(" ");
                const currentValLast =
                  currentValSplit[currentValSplit.length - 1];

                if (currentValLast === "") {
                  target.value = currentVal + "  ";
                  target.style.width = `${target.value.length}ch`;
                  return;
                }

                const filteredFiles = availableFiles.filter((file) =>
                  file.startsWith(currentValLast)
                );

                if (filteredFiles.length === 0) return;

                if (filteredFiles.length > 0) {
                  const newVal = target.value.replace(
                    currentValLast,
                    filteredFiles[0]
                  );
                  target.value = newVal;
                  setVal(newVal);
                  target.style.width = `${newVal.length}ch`;
                  return;
                }

                break;
              default:
                break;
            }
          }}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
        />
        <div
          ref={cursorRef}
          className={clsx(
            "w-[1ch] h-4 bg-terminal font-mono",
            typing ? "animate-none" : "animate-blink",
            disabled ? "hidden" : ""
          )}
          style={{
            transform: "translateX(0ch)",
          }}
        />
      </div>
      <div>{response}</div>
    </>
  );
};

export default Terminal;

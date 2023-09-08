import React from "react";
import { DockContainer } from "./DockContainer";
import { DockCard } from "./DockCard";
import { Card } from "./Card";
import { DockDivider } from "./DockDivider";
import TerminalIcon from "@/static/terminal.png";
import CodeIcon from "@/static/code.png";
import GithubIcon from "@/static/github.png";
import QemuIcon from "@/static/qemu.png";
import FolderIcon from "@/static/folder.png";
import FounderIcon from "@/static/founder.jpg";
import DopeIcon from "@/static/dope.svg";
import ContactIcon from "@/static/contact.png";

type Props = {};
const GRADIENTS = [
  {
    src: TerminalIcon.src,
    smallHeight: false,
  },
  {
    src: CodeIcon.src,
    smallHeight: true,
  },
  {
    src: GithubIcon.src,
    smallHeight: true,
  },
  {
    src: QemuIcon.src,
    smallHeight: true,
  },
  { src: FolderIcon.src, smallHeight: true },
  { src: FounderIcon.src, smallHeight: false },
  { src: DopeIcon.src, smallHeight: true },
  { src: null, smallHeight: false },
  { src: ContactIcon.src, smallHeight: false },
];

function Dock({}: Props) {
  return (
    <DockContainer>
      {GRADIENTS.map((src, index) =>
        src.src ? (
          <DockCard key={src.src}>
            <Card src={src.src} smallHeight={src.smallHeight} />
          </DockCard>
        ) : (
          <DockDivider key={index} />
        )
      )}
    </DockContainer>
  );
}

export default Dock;

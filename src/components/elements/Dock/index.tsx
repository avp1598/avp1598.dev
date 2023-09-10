import { DockContainer } from "./DockContainer";
import { DockCard } from "./DockCard";
import { Card } from "./Card";
import { DockDivider } from "./DockDivider";
import TerminalIcon from "@/static/terminal.png";
import CodeIcon from "@/static/code.png";
import GithubIcon from "@/static/github.png";
import FinderIcon from "@/static/finderIcon.png";
import ContactIcon from "@/static/contact.png";
import BooksIcon from "@/static/iBooks.jpg";

type Props = {};
const Apps = [
  { src: FinderIcon.src, smallHeight: false },
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
    src: BooksIcon.src,
    smallHeight: false,
  },
  { src: null, smallHeight: false },
  { src: ContactIcon.src, smallHeight: false },
];

function Dock({}: Props) {
  return (
    <DockContainer>
      {Apps.map((src, index) =>
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

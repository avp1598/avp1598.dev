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
  {
    src: TerminalIcon.src,
    smallHeight: false,
    route: "/",
  },
  { src: FinderIcon.src, smallHeight: false, route: "/resume" },
  {
    src: CodeIcon.src,
    smallHeight: true,
    route: "/code",
  },
  {
    src: GithubIcon.src,
    smallHeight: true,
    route: "https://github.com/avp1598",
  },
  // {
  //   src: BooksIcon.src,
  //   smallHeight: false,
  //   route: "/books",
  // },
  { src: null, smallHeight: false },
  { src: ContactIcon.src, smallHeight: false, route: "/contact" },
];

function Dock({}: Props) {
  return (
    <DockContainer>
      {Apps.map((src, index) =>
        src.src ? (
          <DockCard key={src.src}>
            <Card
              src={src.src}
              smallHeight={src.smallHeight}
              route={src.route}
            />
          </DockCard>
        ) : (
          <DockDivider key={index} />
        )
      )}
    </DockContainer>
  );
}

export default Dock;

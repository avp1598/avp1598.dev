import { Card } from "./Card";
import { DockDivider } from "./DockDivider";
import TerminalIcon from "@/static/terminal.png";
import CodeIcon from "@/static/code.png";
import GithubIcon from "@/static/github.png";
import FinderIcon from "@/static/finder.png";
import ThingsIcon from "@/static/things.png";
import ContactIcon from "@/static/contact.png";
import DockCard from "./DockCard";
import DockContainer from "./DockContainer";
import { animated, useSpring } from "@react-spring/web";

type Props = {};

const Apps = [
  {
    src: TerminalIcon.src,
    smallHeight: false,
    tooltip: "Terminal",
    route: "/",
  },
  {
    src: FinderIcon.src,
    smallHeight: false,
    tooltip: "Resume",
    route: "/resume",
  },
  {
    src: CodeIcon.src,
    smallHeight: true,
    tooltip: "Source Code",
    route: "/code",
  },
  {
    src: GithubIcon.src,
    smallHeight: true,
    tooltip: "Github",
    route: "https://github.com/avp1598",
  },
  {
    src: ThingsIcon.src,
    smallHeight: false,
    tooltip: "Projects",
    route: "/projects",
  },
  { src: null, smallHeight: false },
  {
    src: ContactIcon.src,
    smallHeight: false,
    tooltip: "Contact",
    route: "/contact",
  },
];

function LazyDock({}: Props) {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  return (
    <animated.div style={props}>
      <DockContainer>
        {Apps.map((src, index) =>
          src.src ? (
            <DockCard key={src.src}>
              <Card
                src={src.src}
                smallHeight={src.smallHeight}
                route={src.route}
                tooltip={src.tooltip}
              />
            </DockCard>
          ) : (
            <DockDivider key={index} />
          )
        )}
      </DockContainer>
    </animated.div>
  );
}

export default LazyDock;

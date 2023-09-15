import { useSpring } from "@react-spring/web";
import { type PropsWithChildren } from "react";
import Tilt from "react-parallax-tilt";

const Card: React.FC<PropsWithChildren> = ({ children }) => {
  //   const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  //   const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    // mouseX.set(clientX - left);
    // mouseY.set(clientY - top);
  }
  //   let maskImage = useMotionTemplate`radial-gradient(200px at ${mouseX}px ${mouseY}px, white, transparent)`;
  //   let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <Tilt scale={1.05}>
      <div
        onMouseMove={onMouseMove}
        className="overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 border-zinc-600 mb-12 w-64"
      >
        {/* <div className="pointer-events-none">
          <div className="absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
          <motion.div
            className="absolute inset-0 z-10 bg-gradient-to-br opacity-100 via-zinc-200/10 transition duration-1000 group-hover:opacity-50 "
            style={style}
          />
          <motion.div
            className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
            style={style}
          />
        </div> */}

        {children}
      </div>
    </Tilt>
  );
};

type Props = {
  url: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
};

const ProjectCard = ({ url, title, description, date, tags }: Props) => {
  return (
    <Card>
      <a href={url} target="_blank">
        <article className="p-4">
          <div className="flex justify-between gap-2 items-center">
            <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
              {date ? (
                <time dateTime={new Date(date).toISOString()}>
                  {Intl.DateTimeFormat(undefined, {
                    dateStyle: "medium",
                  }).format(new Date(date))}
                </time>
              ) : (
                <span>SOON</span>
              )}
            </span>
          </div>
          <h2 className="font-medium duration-1000 text-2xl text-zinc-200 group-hover:text-white font-display">
            {title}
          </h2>
          <p className="mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200">
            {description}
          </p>
          {tags && (
            <div className="flex flex-wrap mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 mb-2 mr-2 text-xs font-medium tracking-wide text-zinc-100 bg-zinc-800 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </a>
    </Card>
  );
};

export default ProjectCard;

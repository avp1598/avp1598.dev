import clsx from "clsx";

interface CardProps {
  src: string;
  route?: string;
  smallHeight?: boolean;
}

export const Card = ({ src, smallHeight, route }: CardProps) => (
  <a href={route} target={route?.startsWith("http") ? "_blank" : "_self"}>
    <span
      className={`relative flex items-center justify-center z-0 overflow-hidden w-full h-full rounded-lg ${
        smallHeight ? "bg-white" : ""
      }`}
    >
      {/* <img
      src={src}
      alt=""
      className="absolute z-10 opacity-40 blur-lg"
      style={{
        transform: "translate(10px) scale(1.25)",
      }}
    /> */}

      <img
        src={src}
        alt=""
        className={clsx(
          "relative z-0",
          smallHeight ? "h-3/4 w-3/4" : "h-full w-full"
        )}
      />
    </span>
  </a>
);

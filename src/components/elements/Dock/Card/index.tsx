import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import clsx from "clsx";

interface CardProps {
  src: string;
  tooltip: string;
  route?: string;
  smallHeight?: boolean;
}

export const Card = ({ src, tooltip, smallHeight, route }: CardProps) => (
  <TooltipProvider delayDuration={100}>
    <Tooltip>
      <TooltipTrigger className="h-full w-full">
        <a
          href={route}
          target={route?.startsWith("http") ? "_blank" : "_self"}
          aria-label={tooltip}
        >
          <span
            className={`relative flex items-center justify-center z-0 overflow-hidden w-full h-full rounded-lg ${
              smallHeight ? "bg-white" : ""
            }`}
          >
            <img
              src={src}
              alt={tooltip}
              className={clsx(
                "relative z-0",
                smallHeight ? "h-3/4 w-3/4" : "h-full w-full"
              )}
            />
          </span>
        </a>
      </TooltipTrigger>
      <TooltipContent className="text-slate-200 font-semiBold p-2 rounded-lg text-xs mb-2 backdrop-blur-xl bg-[rgb(40,40,40,0.215)] backdrop-filter cursor-none">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

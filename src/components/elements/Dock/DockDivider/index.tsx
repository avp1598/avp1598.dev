import * as React from "react";
import { useGesture } from "@use-gesture/react";
import { useDock } from "../DockContainer/DockContext";
import { DOCK_ZOOM_LIMIT } from "../DockContainer";

export const DockDivider = () => {
  const { zoomLevel, setIsZooming } = useDock();

  const bind = useGesture(
    {
      onDrag: ({ down, offset: [_ox, oy], cancel, direction: [_dx, dy] }) => {
        /**
         * Stop the drag gesture if the user goes out of bounds otherwise
         * the animation feels stuck but it's the gesture state catching
         * up to a point where the scaling can actualy animate again.
         */
        if (oy <= DOCK_ZOOM_LIMIT[0] && dy === -1) {
          cancel();
        } else if (oy >= DOCK_ZOOM_LIMIT[1] && dy === 1) {
          cancel();
        } else if (zoomLevel) {
          zoomLevel.start(oy, {
            immediate: down,
          });
        }
      },
      onDragStart: () => {
        setIsZooming(true);
      },
      onDragEnd: () => {
        setIsZooming(false);
      },
    },
    {
      drag: {
        axis: "y",
      },
    }
  );

  if (!zoomLevel) {
    return null;
  }

  return (
    <div
      className="h-full flex items-center py-2 hover:cursor-ns-resize"
      {...bind()}
    >
      <span className="w-[0.1rem] h-full rounded-sm bg-[rgb(255,255,255,0.5)]"></span>
    </div>
  );
};

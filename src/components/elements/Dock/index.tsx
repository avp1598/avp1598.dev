import React, { Suspense } from "react";

const LazyDock = React.lazy(() => import("./LazyDock"));

type Props = {};

function Dock({}: Props) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyDock />
      </Suspense>
    </div>
  );
}

export default Dock;

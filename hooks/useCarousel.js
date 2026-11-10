"use client";
import { useCallback, useRef, useState } from "react";

/** สไลด์โฆษณา: เลื่อนได้ด้วยปุ่ม จุด และการปัดนิ้ว (cycle ใช้รีสตาร์ทเส้นเวลา) */
export function useCarousel(count) {
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const startX = useRef(null);

  const goTo = useCallback((i) => { setIndex((i + count) % count); setCycle((c) => c + 1); }, [count]);
  const step = useCallback((d) => { setIndex((i) => (i + d + count) % count); setCycle((c) => c + 1); }, [count]);

  const swipe = {
    onPointerDown: (e) => { startX.current = e.clientX; },
    onPointerUp: (e) => {
      if (startX.current !== null && Math.abs(e.clientX - startX.current) > 40) step(e.clientX < startX.current ? 1 : -1);
      startX.current = null;
    },
  };

  return { index, cycle, goTo, next: () => step(1), prev: () => step(-1), swipe };
}

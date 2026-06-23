"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import "./horizontal-scroll.css";
import { HorizontalScrollProps } from "./horizontal-scroll.types";

const SCROLL_THUMB_WIDTH = 150;

export default function HorizontalScroll({
  children,
  className = "",
  contentClassName = "",
}: HorizontalScrollProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [thumbLeft, setThumbLeft] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(SCROLL_THUMB_WIDTH);

  const updateThumb = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return;
    }

    const trackWidth = track.clientWidth;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    const maxThumbLeft = trackWidth - SCROLL_THUMB_WIDTH;

    setThumbWidth(trackWidth > 0 ? Math.min(SCROLL_THUMB_WIDTH, trackWidth) : SCROLL_THUMB_WIDTH);

    if (maxScroll <= 0 || maxThumbLeft <= 0) {
      setThumbLeft(0);
      return;
    }

    setThumbLeft((viewport.scrollLeft / maxScroll) * maxThumbLeft);
  }, []);

  useEffect(() => {
    updateThumb();

    window.addEventListener("resize", updateThumb);

    return () => {
      window.removeEventListener("resize", updateThumb);
    };
  }, [updateThumb]);

  return (
    <div className={`horizontal-scroll ${className}`}>
      <div
        className="horizontal-scroll__viewport"
        ref={viewportRef}
        onScroll={updateThumb}
        tabIndex={0}
        aria-label="Scrollable content"
      >
        <div className={`horizontal-scroll__content ${contentClassName}`}>{children}</div>
      </div>
      <div className="horizontal-scroll__track" ref={trackRef} aria-hidden="true">
        <div
          className="horizontal-scroll__thumb"
          style={{
            transform: `translateX(${thumbLeft}px)`,
            width: `${thumbWidth}px`,
          }}
        />
      </div>
    </div>
  );
}

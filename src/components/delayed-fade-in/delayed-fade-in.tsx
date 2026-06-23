"use client";

import { type CSSProperties, useEffect, useState } from "react";

import "./delayed-fade-in.css";
import { DelayedFadeInProps } from "./delayed-fade-in.types";

export default function DelayedFadeIn({
  children,
  className = "",
  delay = 300,
  duration = 500,
}: DelayedFadeInProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [delay]);

  const style = {
    "--delayed-fade-in-duration": `${duration}ms`,
  } as CSSProperties;

  return (
    <div
      className={`delayed-fade-in ${isVisible ? "delayed-fade-in--visible" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

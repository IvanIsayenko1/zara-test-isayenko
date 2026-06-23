"use client";

import { type CSSProperties, type ReactNode, useEffect, useState } from "react";

import "./delayed-fade-in.css";

type DelayedFadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

export function DelayedFadeIn({
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

"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import "./header.css";
import logo from "@/assets/icons/logo.svg";
import bag from "@/assets/icons/bag.svg";
import { useLoading } from "@/context/loading-context";
import Link from "next/link";

export default function Header() {
  const { loadingProgress, setIsComplete } = useLoading();

  console.log("loadingProgress", loadingProgress);
  const loadingStyle = {
    "--header-loading-progress": loadingProgress / 100,
  } as CSSProperties;

  return (
    <header
      className={`header ${loadingProgress > 0 ? "header--loading" : ""}`}
      style={loadingStyle}
    >
      <Link
        href="/"
        onClick={() => {
          setIsComplete(true);
        }}
      >
        <Image src={logo} alt="Logo" width={74} height={24} loading="eager" />
      </Link>
      <div className="header__cart">
        <Image src={bag} alt="Shopping Bag" width={18} height={18} loading="eager" />
        <span className="header__cart-count">{0}</span>
      </div>
    </header>
  );
}

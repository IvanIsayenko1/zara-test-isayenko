"use client";

import type { CSSProperties } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import bag from "@/assets/icons/bag.svg";
import filledBag from "@/assets/icons/filled-bag.svg";
import logo from "@/assets/icons/logo.svg";
import { useCart } from "@/context/cart-context";
import { useLoading } from "@/context/loading-context";

import "./header.css";

export default function Header() {
  const { loadingProgress, setIsComplete } = useLoading();
  const { cartItems } = useCart();

  const pathname = usePathname();

  const loadingStyle = {
    "--header-loading-progress": loadingProgress / 100,
  } as CSSProperties;

  const isCartPage = pathname.includes("cart");

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

      {!isCartPage && (
        <Link className="header__cart" href="/cart">
          <span className="header__cart-icon" aria-hidden="true">
            <Image
              className="header__cart-icon-image"
              src={bag}
              alt="Shopping Bag"
              width={13}
              height={16}
              loading="eager"
            />
            <Image
              className="header__cart-icon-image header__cart-icon-image--filled"
              src={filledBag}
              alt="Shopping Bag (filled)"
              width={13}
              height={16}
              loading="eager"
            />
          </span>
          <span className="header__cart-count">{cartItems.length}</span>
        </Link>
      )}
    </header>
  );
}

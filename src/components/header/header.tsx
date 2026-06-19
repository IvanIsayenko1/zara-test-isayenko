"use client";

import Image from "next/image";
import "./header.css";
import logo from "@/assets/icons/logo.svg";
import bag from "@/assets/icons/bag.svg";
import { useShopping } from "@/context/shopping-context";

export default function Header() {
  const { shoppingList, isLoading } = useShopping();
  const shoppingCount = shoppingList.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={`header ${isLoading ? "header--loading" : ""}`}>
      <Image src={logo} alt="Logo" width={74} height={24} />
      <div className="header__cart">
        <Image src={bag} alt="Shopping Bag" width={18} height={18} />
        <span className="header__cart-count">{shoppingCount}</span>
      </div>
    </header>
  );
}

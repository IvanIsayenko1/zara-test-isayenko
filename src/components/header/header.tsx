import Image from "next/image";
import "./header.css";
import logo from "@/assets/icons/logo.svg";
import bag from "@/assets/icons/bag.svg";

export default function Header() {
  return (
    <header className="header">
      <Image src={logo} alt="Logo" />
      <div className="cart-container">
        <Image src={bag} alt="Bag" />
        <span className="cart-count">0</span>
      </div>
    </header>
  );
}

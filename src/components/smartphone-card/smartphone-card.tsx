"use client";

import Image from "next/image";
import "./smartphone-card.css";
import phonePlaceholder from "../../assets/placeholders/phone-placeholder.png";
import { useHome } from "@/context/home-context";
// import Link from "next/link";

export function SmarthponeCard() {
  const { openPhone } = useHome();

  const handleClick = () => {
    openPhone("random id");
  };

  return (
    // <Link href="/smartphone/randomId" className="smartphone-card">
    <div className="smartphone-card" onClick={handleClick}>
      <div className="smartphone-card__image-wrapper">
        <div className="smartphone-card__image-inner">
          <Image
            src={phonePlaceholder}
            alt="Photo of the smartphone"
            className="smartphone-card__image"
            fill
          />
        </div>
      </div>
      <div className="smartphone-card__footer">
        <div className="smartphone-card__footer__content">
          <span className="smartphone-card__brand">apple</span>
          <span className="smartphone-card__model">iphone 15 pro</span>
        </div>
        <span className="smartphone-card__price">1219 EUR</span>
      </div>
    </div>
    // </Link>
  );
}

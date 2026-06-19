"use client";

import Image from "next/image";
import { useHome } from "@/context/home-context";
import arrowLeft from "@/assets/icons/arrow-left.svg";

import "./smartphone-detail.css";

export default function SmartphoneDetail() {
  const { selectedPhoneId, closePhone } = useHome();
  const isOpen = Boolean(selectedPhoneId);

  return (
    <div className={`smartphone-detail ${isOpen ? "smartphone-detail--open" : ""}`}>
      <div className="smartphone-detail__navigation">
        <div className="smartphone-detail__navigation__back" onClick={closePhone}>
          <div className="smartphone-detail__navigation__back__icon">
            <Image src={arrowLeft} alt="Navigate back" width={5} height={8} />
          </div>
          back
        </div>
      </div>
    </div>
  );
}

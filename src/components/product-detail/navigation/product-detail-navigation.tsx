import Image from "next/image";
import Link from "next/link";

import arrowLeft from "@/assets/icons/arrow-left.svg";

import "./product-detail-navigation.css";

export default function ProductDetailNavigation() {
  return (
    <div className="product-detail-navigation">
      <Link className="product-detail-navigation__back" href="/">
        <div className="product-detail-navigation__back__icon">
          <Image src={arrowLeft} alt="Navigate back" width={5} height={8} loading="eager" />
        </div>
        back
      </Link>
    </div>
  );
}

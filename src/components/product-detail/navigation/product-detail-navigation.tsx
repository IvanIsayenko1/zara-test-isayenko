import { useLoading } from "@/context/loading-context";
import Image from "next/image";
import Link from "next/link";
import arrowLeft from "@/assets/icons/arrow-left.svg";
import "./product-detail-navigation.css";

export default function ProductDetailNavigation() {
  const { setIsComplete } = useLoading();

  const navigateBackHandler = () => {
    // to avoid the load animation in the list of the produts
    setIsComplete(true);
  };

  return (
    <div className="product-detail-navigation">
      <Link className="product-detail-navigation__back" href="/" onClick={navigateBackHandler}>
        <div className="product-detail-navigation__back__icon">
          <Image src={arrowLeft} alt="Navigate back" width={5} height={8} loading="eager" />
        </div>
        back
      </Link>
    </div>
  );
}

import Button from "@/components/button/button";
import { useCart } from "@/context/cart-context";
import Link from "next/link";
import "./cart-footer.css";

export default function CartFooter() {
  const { cartItems } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart-footer">
      <Link href="/">
        <Button label="CONTINUE SHOPPING" variant="outlined" onClick={() => {}} />
      </Link>

      {cartItems.length > 0 && (
        <div className="cart-footer__end">
          <div className="cart-footer__end__total">
            <span>Total</span>
            <span>{total} EUR</span>
          </div>
          <Button label="PAY" variant="primary" onClick={() => {}} />
        </div>
      )}
    </div>
  );
}

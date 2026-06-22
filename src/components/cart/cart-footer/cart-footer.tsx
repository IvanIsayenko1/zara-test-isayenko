import Link from "next/link";

import Button from "@/components/button/button";
import { useCart } from "@/context/cart-context";

import "./cart-footer.css";

export default function CartFooter() {
  const { cartItems } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);
  const isCartNotEmpty = cartItems.length > 0;

  return (
    <>
      <div className="cart-footer">
        <Link href="/">
          <Button label="CONTINUE SHOPPING" variant="outlined" onClick={() => {}} />
        </Link>

        {isCartNotEmpty && (
          <div className="cart-footer__end">
            <div className="cart-footer__end__total">
              <span>Total</span>
              <span>{total} EUR</span>
            </div>
            <Button
              label="PAY"
              variant="primary"
              onClick={() => {
                alert("TODO: Not implemented");
              }}
            />
          </div>
        )}
      </div>

      <div className="cart-footer__mobile">
        {isCartNotEmpty && (
          <div className="cart-footer__mobile__total">
            <span>Total</span>
            <span>{total} EUR</span>
          </div>
        )}
        <div className="cart-footer__mobile__end">
          <Link href="/">
            <Button
              label="CONTINUE SHOPPING"
              variant="outlined"
              onClick={() => {}}
              className="cart-footer__mobile__button"
            />
          </Link>
          {isCartNotEmpty && (
            <Button
              label="PAY"
              variant="primary"
              className="cart-footer__mobile__button"
              onClick={() => {
                alert("TODO: Not implemented");
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

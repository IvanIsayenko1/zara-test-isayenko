import { CartItem as CartItemType } from "@/context/cart-context";
import "./cart-item.css";
import Image from "next/image";
import Button from "@/components/button/button";

export default function CartItem({ item, onRemove }: { item: CartItemType; onRemove: () => void }) {
  return (
    <div className="cart-item">
      <div className="cart-item__image-wrapper">
        <Image
          src={item.imageUrl}
          alt={item.name}
          className="cart-item__image"
          fill
          sizes="262px"
          loading="eager"
        />
      </div>
      <div className="cart-item__info">
        <div className="cart-item__content">
          <div className="cart-item__metadata">
            <div className="cart-item__name">
              {item.brand} {item.name}
            </div>
            <div className="cart-item__meta">
              {item.storage} | {item.color}
            </div>
          </div>
          <div className="cart-item__price">{item.price} EUR</div>
        </div>

        <Button label="Eliminar" variant="danger" onClick={onRemove} />
      </div>
    </div>
  );
}

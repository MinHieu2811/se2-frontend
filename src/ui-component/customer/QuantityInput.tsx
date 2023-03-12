import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCart } from "../../context/CartProvider";
import { ProductModel } from "../../model/product";

type Props = {
  label?: string;
  className?: string;
  isHorizontal?: boolean;
  value: number;
  product: ProductModel
};

function QuantityInput({ label, className, isHorizontal, value, product }: Props) {
    const { addToCartHandler, removeFromCart} = useCart()
  return (
    <div
      className={`quantity-input field ${isHorizontal ? "is-horizontal" : ""} ${
        className ?? ""
      }`}
    >
      {label && (
        <div className="is-hidden-tablet field-label is-normal">
          <label className="label is-capitalized has-text-left label-quantity">
            {label}
          </label>
        </div>
      )}
      <div className="field-body">
        <div className="field has-addons">
          <span className="control">
            <button className="icon-button button left">
              {removeFromCart && <AiOutlineMinus onClick={() => removeFromCart(product, false)}/>}
            </button>
          </span>
          <span className="control control-input">{value}</span>
          <span className="control is-right">
            <button className="icon-button button right">
              {addToCartHandler && <AiOutlinePlus onClick={() => addToCartHandler(product, value)}/>}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default QuantityInput;

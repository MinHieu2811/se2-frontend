import React from "react";
import { CartModel, useCart } from "../../context/CartProvider";
import QuantityInput from "./QuantityInput";
import { AiOutlineClose } from "react-icons/ai";

export default function Variants() {
  const { cart } = useCart();
  return (
    <>
      <div className="order-variants">
        <div className="order-variants__bottom"></div>
        <div className="variant-wrapper">
          {cart?.map((variant, index: number) => {
            return (
              <div className="variant-item" key={index}>
                {<Variant variant={variant} />}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

type VariantType = {
  variant: CartModel;
};

function Variant({ variant }: VariantType) {
  const { removeFromCart } = useCart();

  return (
    <>
      <div className="variant">
        <div className="variant--top columns is-mobile is-variable is-2">
          <div className="column col-4">
            <figure className="variant__image image is-square">
              <img src={variant?.product?.images[0]} alt="" />
            </figure>
          </div>
          <div className="column col-8">
            <div className="columns is-vcentered is-variable mb-0">
              <div className="column pb-1-mobile">
                <div className="variant__title">{variant?.product?.name}</div>
              </div>
              <div className="column pt-1-mobile pb-1-mobile is-hidden-mobile">
                <div className="variant__remove">
                  {removeFromCart && (
                    <button
                      className={`button is-text has-text-link`}
                      onClick={() => removeFromCart(variant?.product, true)}
                    >
                      <AiOutlineClose />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="variant__quantity desktop is-flex">
              <QuantityInput
                label=""
                className="mb-0"
                isHorizontal
                value={variant?.quantity}
                product={variant?.product}
              />
              <div className="variant__price is-pulled-right">
                ${variant?.quantity * variant?.product?.price}
              </div>
            </div>
          </div>
        </div>
        <div className="variant__quantity mobile is-flex">
          <QuantityInput
            label=""
            className="mb-0"
            isHorizontal
            value={variant?.quantity}
            product={variant?.product}
          />
          <div className="column is-4 pt-1-mobile pb-1-mobile btn-remove-mobile is-hidden-desktop">
            <div className="variant__remove">
              {removeFromCart && (
                <button
                  className={`button is-text has-text-link`}
                  onClick={() => removeFromCart(variant?.product, true)}
                >
                  <AiOutlineClose />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <hr />
    </>
  );
}

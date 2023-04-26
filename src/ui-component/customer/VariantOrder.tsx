import React from 'react'
import { CartModel } from '../../context/CartProvider'

type Props = {
  order: CartModel
}

function VariantOrder({order}: Props) {
  const {product, quantity} = order
  return (
    <div className="variant">
        <div className="variant--top columns is-mobile is-variable is-2">
          <div className={`column`}>
            <figure className="variant__image image is-square">
              <img src={product?.images[0]} alt="" />
            </figure>
          </div>
          <div className="column">
            <div className="columns is-vcentered is-variable is-2 mb-0">
              <div className="column pb-1-mobile">
                <div className="variant__title">{product?.name}</div>
                <div className="size--small">
                  <div className="variant__property expand-on-mobile">
                    <div className="property-and-price">
                      <div className="property">
                        <span className="property_stronger">Quantity</span>:{` `}
                        <span className="property__number">{quantity}</span>
                      </div>
                      <div className="variant__price">
                        <span className="curency-text">Brand: {product?.brand}</span>
                      </div>
                      <div className="variant__price">
                        <span className="curency-text">Price: ${product?.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="variant__quantity mobile">
          <div className="variant__price is-pulled-right">
            <del className="compared">{getCurrency(variant.compare_price ?? 0)}</del>
            {getCurrency(variant.price ?? 0)}
          </div>
        </div> */}
      </div>
  )
}

export default VariantOrder
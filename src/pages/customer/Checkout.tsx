import React, { useEffect } from "react";
import { useCart } from "../../context/CartProvider";
import VariantOrder from "../../ui-component/customer/VariantOrder";
import { BsCurrencyDollar } from "react-icons/bs";
import Helmet from "../../ui-component/shared/Helmet";
import CheckoutForm from "../../ui-component/customer/CheckoutForm";
import { useSyncedState } from "../../hooks/useSyncedState";
import { AddressErrors, CustomerAddress } from "../../model/address";
import { initAddress } from "../../utils/initAddress";
import { validateAddressField } from "../../utils/validateInput";

function Checkout() {
  const { cart } = useCart();
  const [addressErrors, setAddressErrors] = useSyncedState<AddressErrors>({})
  const [ addressSyncedProps, ,getAddressSyncedProp] = useSyncedState<CustomerAddress>(
    initAddress({})
  )

  useEffect(() => {
    ;(Object.keys(addressSyncedProps) as Array<keyof CustomerAddress>)?.forEach((key) => {
      validateAddressField(key, addressSyncedProps[key]).then(() => {
        setAddressErrors((prevErrors) => {
          return {
            ...prevErrors,
            [key]: ''
          }
        })
      }).catch((err) => {
        setAddressErrors((prevAddrErrs) => {
          return {
            ...prevAddrErrs,
            [key]: err.details?.[0]?.message
          }
        })
      })
    })
  }, [addressSyncedProps, setAddressErrors])

  return (
    <div className="checkout-wrapper">
      <Helmet title="Checkout" />
      <div className="order-variants col-5">
        <div className="hide-on-mobile">
          <>
            {cart.length > 1 && (
              <div className="multi-order">
                <div className="multi-order__content">
                  You’ve ordered multiple products and parcels may arrive
                  separately.
                </div>
              </div>
            )}
            <div className="order-warpper" key={`code-${0}`}>
              <div className="order-warpper__order">
                Order <span className="order-warpper__code">#1923798</span>{" "}
                <span className="order-warpper__length">
                  ({cart?.reduce((qty, cart) => qty + cart?.quantity, 0) || 0}{" "}
                  item
                  {cart?.reduce((qty, cart) => qty + cart?.quantity, 0) > 1 &&
                    "s"}
                  )
                </span>
              </div>
              {cart?.map((variant, index) => {
                return (
                  <div key={`variant_${index}`} className="variant-item">
                    <VariantOrder order={variant} />
                    {cart?.length - 1 > index && <hr />}
                  </div>
                );
              })}
            </div>
          </>
        </div>

        {1 ? (
          <div className="order-variants__summary bg-change-dynamic-total">
            <div className="item">
              <div className="item__label">Subtotal</div>
              <div className="item__number">
                <>
                  <BsCurrencyDollar />
                  {cart?.reduce(
                    (qty, cart) => qty + cart?.product?.price * cart?.quantity,
                    0
                  )}
                </>
              </div>
            </div>
            <div className="item">
              <div className="item__label">Discount Code</div>
              <div className="item__number">
                {undefined ? (
                  <>
                    <BsCurrencyDollar />
                    {cart?.reduce(
                      (qty, cart) =>
                        qty + cart?.product?.price * cart?.quantity,
                      0
                    )}
                  </>
                ) : (
                  <span className="item__number__free">Free</span>
                )}
              </div>
            </div>
            {/* {discount_amount ? (
              <>
                <div className="item">
                  <div className="item__label item__label__discount">
                    Discount
                  </div>
                  <div className="item__number item__label__discount">
                    - {getCurrency(discount_amount ?? 0)}
                  </div>
                </div>
              </>
            ) : null} */}

            <div className="item">
              <div className="item__label">Shipping Fee</div>
              <div className="item__number">
                {/* {(isCollect && order?.tax_engine) || !isCheckingOut
                  ? getCurrency(tax_amount ?? 0)
                  : "--"} */}
              </div>
            </div>

            <div className="item total-style">
              <div className="item__label item__label--bold item-label-total total-text-style">
                Total{" "}
                {cart?.reduce((qty, cart) => qty + cart?.quantity, 0) > 1
                  ? `(${cart?.reduce(
                      (qty, cart) => qty + cart?.quantity,
                      0
                    )} items)`
                  : `(${cart?.reduce(
                      (qty, cart) => qty + cart?.quantity,
                      0
                    )} item)`}
              </div>
              <div className="item__number item__number--bold item-label-total">
                <BsCurrencyDollar />
                {cart?.reduce(
                  (qty, cart) => qty + cart?.product?.price * cart?.quantity,
                  0
                )}
              </div>
            </div>

            <div className="line"></div>
          </div>
        ) : null}
      </div>
      <div className="checkout-wrapper__right col-7">
        <CheckoutForm
          valueSyncedProps={getAddressSyncedProp()}
          errors={addressErrors}
          className="form-block"
          label=""/>
      </div>
    </div>
  );
}

export default Checkout;

import React, { useEffect, useMemo } from "react";
import { useCart } from "../../context/CartProvider";
import VariantOrder from "../../ui-component/customer/VariantOrder";
import { BsCurrencyDollar } from "react-icons/bs";
import Helmet from "../../ui-component/shared/Helmet";
import CheckoutForm from "../../ui-component/customer/CheckoutForm";
import { useSyncedState } from "../../hooks/useSyncedState";
import { AddressErrors, CustomerAddress } from "../../model/address";
import { initAddress } from "../../utils/initAddress";
import { validateAddressField } from "../../utils/validateInput";
import { VoucherOrder } from "../../model/order";
import { axiosInstance } from "../../client-api";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthProvider";
// import VoucherCard from "../../ui-component/customer/Voucher";

const genOrderToken = () => {
  return new Date().getTime().toString().slice(0, 8);
};

// const fakeVoucher = [
//   {
//     code: "save30",
//     quantity: 12,
//     expiredAt: "2023-08-12 00:00:00",
//     discountAmount: {
//       value: 0.3,
//       minimumApplicable: 200,
//     },
//   },
//   {
//     code: "save20",
//     quantity: 12,
//     expiredAt: "2022-08-12 00:00:00",
//     discountAmount: {
//       value: 0.2,
//       minimumApplicable: 200,
//     },
//   },
// ];

let order: any = {
  id: genOrderToken(),
};
function Checkout() {
  const { cart, totalPrice, totalItems, clearCart, voucher } = useCart();
  const [addressErrors, setAddressErrors] = useSyncedState<AddressErrors>({});
  const [addressSyncedProps, , getAddressSyncedProp] =
    useSyncedState<CustomerAddress>(initAddress({}));
  const navigate = useNavigate();
  const { token } = useAuth()

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) =>
          total + Number(item?.quantity) * Number(item?.product.price),
        0
      ),
    [cart]
  );
  const [voucherSyncedProps, , ] =
    useSyncedState<VoucherOrder>({
      code: "",
      expiredAt: "",
      discountAmount: 0,
    });
  // order.cart = {
  //   items: cart,
  //   totalItems: totalItems,
  //   totalPrice: totalPrice,
  //   voucher: voucher || null,
  // };

  order.products = cart.map((item) => ({
    id: item?.product?.id,
    amount: item?.quantity
  }))
  order.voucherCode = voucher && voucher?.code

  order.customerId = token || localStorage.getItem('access_token')
  order.payment = "COD"
  order.address = addressSyncedProps?.address
  order.name = addressSyncedProps?.name
  order.phone = addressSyncedProps?.phone
  order.email = addressSyncedProps?.email

  useEffect(() => {
    if (localStorage.getItem("order")) {
      localStorage.setItem("order", JSON.stringify(order));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voucher]);

  useEffect(() => {
    (Object.keys(addressSyncedProps) as Array<keyof CustomerAddress>)?.forEach(
      (key) => {
        validateAddressField(key, addressSyncedProps[key])
          .then(() => {
            setAddressErrors((prevErrors) => {
              return {
                ...prevErrors,
                [key]: "",
              };
            });
          })
          .catch((err) => {
            setAddressErrors((prevAddrErrs) => {
              return {
                ...prevAddrErrs,
                [key]: err.details?.[0]?.message,
              };
            });
          });
      }
    );
  }, [addressSyncedProps, setAddressErrors]);

  useEffect(() => {
    if (voucherSyncedProps?.code && voucher && order?.cart) {
      order.cart.voucher = voucher ;
      order.cart.totalPrice =
        totalPrice - totalPrice * voucherSyncedProps?.discountAmount;
    }
  }, [voucherSyncedProps, totalPrice, voucher]);

  const submitOrder = async (paymentInfo?: any) => {
    if (order && paymentInfo) {
      // order.orderInfo.paymentInfo = paymentInfo;
      order.payment = "PAYPAL"
    }
    // if (voucherSyncedProps?.code && order?.cart) {
    //   order.cart.voucher = voucherSyncedProps;
    //   order.cart.totalPrice =
    //     totalPrice - totalPrice * voucherSyncedProps?.discountAmount;
    // }
    localStorage.setItem("order", JSON.stringify(order))
    await axiosInstance
      ?.post("/order", order)
      ?.then(() => {
        clearCart?.();
        navigate("/");
      });
  };

  return (
    <div className="checkout-wrapper">
      <Helmet title="Checkout" />
      <div className="order-variants col-5">
        <div className="hide-on-mobile">
          <>
            <div className="order-warpper" key={`code-${0}`}>
              <div className="order-warpper__order">
                Order <span className="order-warpper__code">#{order?.id}</span>{" "}
                <span className="order-warpper__length">
                  ({totalItems} item
                  {totalItems > 1 && "s"})
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
        <hr />

        {/* <div className="voucher-section">
          {fakeVoucher.map((item, index) => (
            <VoucherCard
              {...item}
              index={index}
              key={`voucher-${index}`}
              voucherSyncedProps={getVoucherSyncedProps()}
            />
          ))}
        </div> */}

        {1 ? (
          <div className="order-variants__summary bg-change-dynamic-total">
            <div className="item">
              <div className="item__label">Subtotal</div>
              <div className="item__number">
                <>
                  <BsCurrencyDollar />
                  {subtotal}
                </>
              </div>
            </div>
            <div className="item">
              <div className="item__label">
                Voucher Code{" "}
                <span style={{ marginLeft: "5px" }}>
                  ({voucher?.code ? "#" : ""}
                  {voucher?.code.toUpperCase().substring(0, 5)}
                </span>
                )
              </div>
              <div className="item__number">
                {voucher?.code ? (
                  <>
                    <BsCurrencyDollar />
                    {(voucher?.discountAmount * subtotal).toFixed(2)}
                  </>
                ) : (
                  <span className="item__number__free">
                    <BsCurrencyDollar />0{" "}
                  </span>
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
                <BsCurrencyDollar />0
              </div>
            </div>

            <div className="item total-style">
              <div className="item__label item__label--bold item-label-total total-text-style">
                Total{" "}
                {totalItems > 1
                  ? `(${totalItems} items)`
                  : `(${totalItems} item)`}
              </div>
              <div className="item__number item__number--bold item-label-total">
                <BsCurrencyDollar />
                {/* {(voucher?.code
                  ? totalPrice - voucher?.discountAmount * totalPrice
                  : totalPrice
                ).toFixed()} */}
                {totalPrice}
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
          label=""
          onSubmit={submitOrder}
        />
      </div>
    </div>
  );
}

export default Checkout;

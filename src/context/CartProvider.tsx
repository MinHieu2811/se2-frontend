import React, { useEffect, useState } from "react";
import { ProductModel } from "../model/product";
import { VoucherOrder } from "../model/order";

type Props = {
  children: JSX.Element;
};

export interface CartModel {
  product: ProductModel;
  quantity: number;
}

interface ValueContext {
  totalPrice: number;
  totalItems: number;
  cart: CartModel[];
  voucher?: VoucherOrder;
  handleVoucher?: (voucher: VoucherOrder) => void;
  addToCartHandler?: (product: ProductModel, quantity?: number) => void;
  removeFromCart?: (product: ProductModel, all: boolean) => void;
  clearCart?: () => void;
}

const CartContext = React.createContext<ValueContext>({
  totalItems: 0,
  totalPrice: 0,
  cart: [],
});

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartModel[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [voucher, setVoucher] = useState<VoucherOrder>();

  const addToCartHandler = (product: ProductModel, quantityAdd?: number) => {
    const productInCart = cart.findIndex(
      (item) => item?.product?.id === product?.id
    );
    const { id } = product;
    if (productInCart >= 0) {
      const changedCart = cart.map(({ product, quantity }) => {
        if (product?.id === id) {
          return quantityAdd
            ? {
                product,
                quantity:
                  quantity + quantityAdd > product?.amount
                    ? product?.amount
                    : quantity + quantityAdd,
              }
            : {
                product,
                quantity:
                  quantity + 1 > product?.amount
                    ? product?.amount
                    : quantity + 1,
              };
        } else {
          return { product, quantity };
        }
      });

      setCart(changedCart);

      localStorage.setItem("cart", JSON.stringify(changedCart));
    } else {
      setCart([
        ...cart,
        {
          product,
          quantity: quantityAdd && product?.amount > 0 ? quantityAdd : 1,
        },
      ]);

      localStorage.setItem(
        "cart",
        JSON.stringify([
          ...cart,
          {
            product,
            quantity: quantityAdd && product?.amount > 0 ? quantityAdd : 1,
          },
        ])
      );
    }
  };

  const handleVoucher = (voucherApply: VoucherOrder) => {
    setVoucher(
      voucher?.code
        ? { code: "", discountAmount: 0, expiredAt: "" }
        : voucherApply
    );
  };

  const removeFromCart = (product: ProductModel, all: boolean) => {
    if (all) {
      const leftoverCart = cart.filter(
        (item) => item?.product?.id !== product?.id
      );
      setCart(leftoverCart);
      localStorage.setItem("cart", JSON.stringify(leftoverCart));
    } else {
      const { id } = product;

      const changedCart = cart.map(({ product, quantity }) => {
        if (product?.id === id) {
          return {
            product,
            quantity: quantity - 1 > 0 ? quantity - 1 : 1,
          };
        } else {
          return { product, quantity };
        }
      });
      setCart(changedCart);
      localStorage.setItem("cart", JSON.stringify(changedCart));
    }
  };

  const clearCart = () => {
    if (localStorage?.getItem("cart")) {
      setCart([]);
      localStorage?.setItem("cart", JSON.stringify([]));
    }
    if(voucher?.code) {
      setVoucher(undefined)
    }
  };

  useEffect(() => {
    const cartFromLocal = JSON.parse(localStorage.getItem("cart") || "");
    if (cartFromLocal?.length) {
      setCart(cartFromLocal);
    }
  }, []);

  useEffect(() => {
    setTotalItems(
      cart.reduce((total, item) => total + Number(item?.quantity), 0)
    );
    const totalPrice = cart.reduce(
      (total, item) =>
        total + Number(item?.quantity) * Number(item?.product.price),
      0
    )
    setTotalPrice(
      voucher?.code ? totalPrice - totalPrice * voucher?.discountAmount : totalPrice
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  useEffect(() => {
    if (voucher?.code) {
      setTotalPrice(
        Number((totalPrice - totalPrice * voucher?.discountAmount).toFixed(2))
      );
    } else {
      setTotalPrice(
        cart.reduce(
          (total, item) =>
            total + Number(item?.quantity) * Number(item?.product.price),
          0
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voucher]);

  const value: ValueContext = {
    totalItems: totalItems,
    totalPrice: totalPrice,
    cart: cart,
    voucher: voucher,
    handleVoucher: handleVoucher,
    removeFromCart: removeFromCart,
    addToCartHandler: addToCartHandler,
    clearCart: clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return React.useContext(CartContext);
};

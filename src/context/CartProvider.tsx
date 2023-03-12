import React, { useEffect, useState } from "react";
import { ProductModel } from "../model/product";

type Props = {
  children: JSX.Element;
};

interface CartModel {
  product: ProductModel;
  quantity: number;
}

interface ValueContext {
  totalPrice: number;
  totalItems: number;
  cart: CartModel[];
  addToCartHandler?: (product: ProductModel, quantity?: number) => void;
  removeFromCart?: (product: ProductModel, all: boolean) => void;
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

  const addToCartHandler = (product: ProductModel, quantity?: number) => {
    const productInCart = cart.findIndex(
      (item) => item?.product?.id === product?.id
    );
    console.log(productInCart);
    if (productInCart >= 0) {
      const leftoverCart = cart.filter(
        (item) => item?.product?.id !== product?.id
      );
      console.log(leftoverCart);
      setCart([
        ...leftoverCart,
        {
          product,
          quantity:
            cart[productInCart]?.quantity + 1 > product?.amount
              ? product?.amount
              : cart[productInCart]?.quantity + 1,
        },
      ]);

      localStorage.setItem(
        "cart",
        JSON.stringify([
          ...leftoverCart,
          {
            product,
            quantity:
              cart[productInCart]?.quantity + 1 > product?.amount
                ? product?.amount
                : cart[productInCart]?.quantity + 1,
          },
        ])
      );
      console.log("run up");
    } else {
      setCart([
        ...cart,
        { product, quantity: quantity && product?.amount > 0 ? quantity : 1 },
      ]);

      localStorage.setItem(
        "cart",
        JSON.stringify([
          ...cart,
          { product, quantity: quantity && product?.amount > 0 ? quantity : 1 },
        ])
      );
      console.log("run down");
    }
  };

  const removeFromCart = (product: ProductModel, all: boolean) => {
    if (all) {
      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
    } else {
      const productInCart = cart.findIndex(
        (item) => item?.product?.id === product?.id
      );
      setCart([
        ...cart,
        {
          product,
          quantity:
            cart[productInCart].quantity - 1 > 0
              ? cart[productInCart].quantity - 1
              : 1,
        },
      ]);
      localStorage.setItem(
        "cart",
        JSON.stringify([
          ...cart,
          {
            product,
            quantity:
              cart[productInCart].quantity - 1 > 0
                ? cart[productInCart].quantity - 1
                : 1,
          },
        ])
      );
    }
  };

  useEffect(() => {
    setTotalItems(
      cart.reduce((total, item) => total + Number(item?.quantity), 0)
    );
    setTotalPrice(
      cart.reduce(
        (total, item) =>
          total + Number(item?.quantity) * Number(item?.product.price),
        0
      )
    );

    // const cartExist = JSON.parse(localStorage.getItem("cart") || '')
    // if(cartExist?.length > 0) {
    //   localStorage.setItem("cart", JSON.stringify(cartExist))
    // }
  }, [cart]);

  const value: ValueContext = {
    totalItems: totalItems,
    totalPrice: totalPrice,
    cart: cart,
    removeFromCart: removeFromCart,
    addToCartHandler: addToCartHandler,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return React.useContext(CartContext);
};

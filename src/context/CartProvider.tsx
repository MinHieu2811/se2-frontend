import React, { useEffect, useState } from "react";
import { ProductModel } from "../model/product";

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
    const { id } = product;
    if (productInCart >= 0) {
      const changedCart = cart.map(({ product, quantity }) => {
        if (product?.id === id) {
          return {
            product,
            quantity:
              quantity + 1 > product?.amount ? product?.amount : quantity + 1,
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
        { product, quantity: quantity && product?.amount > 0 ? quantity : 1 },
      ]);

      localStorage.setItem(
        "cart",
        JSON.stringify([
          ...cart,
          { product, quantity: quantity && product?.amount > 0 ? quantity : 1 },
        ])
      );
    }
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
    setTotalPrice(
      cart.reduce(
        (total, item) =>
          total + Number(item?.quantity) * Number(item?.product.price),
        0
      )
    );
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

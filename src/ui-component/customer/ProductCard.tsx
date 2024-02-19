import React from "react";
import { ProductModel } from "../../model/product";
import { Link } from "react-router-dom";
import {
  AiFillDelete,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import { useCart } from "../../context/CartProvider";
import { useToggleModal } from "../../context/ModalProvider";
import SkeletonLoading from "../shared/SkeletonLoading";

type Props = {
  productInfo: ProductModel;
  isLoading?: boolean;
};

function ProductCard({ productInfo, isLoading = false }: Props) {
  const { addToCartHandler } = useCart();
  const { setOpen } = useToggleModal();

  const addToCart = (product: ProductModel, quantity: number) => {
    addToCartHandler?.(product, quantity);
    setOpen?.();
  };

  if (isLoading) {
    return <SkeletonLoading />;
  }
  return (
    <div className="productCart-wrapper">
      <div className="productCart-wrapper_img">
        {productInfo?.images.length > 1 ? (
          <>
            <img src={productInfo.images[0]} alt={productInfo.name} />
            <img
              src={productInfo.images[1]}
              className="img"
              alt={productInfo.name}
            />
          </>
        ) : (
          <>
            <img src={productInfo.images[0]} alt={productInfo.name} />
            <img
              src={productInfo.images[0]}
              className="img"
              alt={productInfo.name}
            />
          </>
        )}
      </div>
      <div className="productCart-wrapper_info">
        <span className="productCart-wrapper_info_branch">
          {productInfo.brand}
        </span>
        <h3 className="productCart-wrapper_info_name">{productInfo.name}</h3>
        <div className="productCart-wrapper_info_price">
          <span className="price">${productInfo.price}</span>
        </div>
      </div>
      <div className="productCart-wrapper_action">
        <div className="productCart-wrapper_action_save action-wrapper">
          <div
            className={`productCart-wrapper_action_save_icon action-wrapper_icon delay-2`}
          >
            <AiOutlineHeart />
          </div>
        </div>
        <div className="productCart-wrapper_action_add action-wrapper">
          <div className="productCart-wrapper_action_save_icon action-wrapper_icon delay-2">
            {addToCartHandler && (
              <AiOutlineShoppingCart
                onClick={() => addToCart(productInfo, 1)}
              />
            )}
          </div>
        </div>
        <div className="productCart-wrapper_action_save action-wrapper">
          <div className="productCart-wrapper_action_save_icon action-wrapper_icon delay-2">
            <Link to={`/category/${productInfo.id}`}>
              <BiShow />
            </Link>
          </div>
        </div>
        <div className={`productCart-wrapper_action_add action-wrapper delete`}>
          <div className="productCart-wrapper_action_save_icon action-wrapper_icon delay-8">
            <AiFillDelete />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductCard);

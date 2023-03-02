import React from "react";
import { ProductModel } from "../../model/product";
import { Link, useLocation } from "react-router-dom";
import {
  AiFillDelete,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiShow } from "react-icons/bi";

type Props = {
  productInfo: ProductModel;
};

function ProductCard({ productInfo }: Props) {
    const location = useLocation()
  return (
    <div className="productCart-wrapper">
      <div className="productCart-wrapper_img">
        <img src={productInfo.image[0]} alt={productInfo.name} />
        <img
          src={productInfo.image[1]}
          className="img"
          alt={productInfo.name}
        />
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
            // onClick={() => addToWishListHandler(_id)}
          >
            <AiOutlineHeart />
          </div>
        </div>
        <div className="productCart-wrapper_action_add action-wrapper">
          <div className="productCart-wrapper_action_save_icon action-wrapper_icon delay-4">
            {/* {link === null ? (
              <i className="bx bxs-cart-alt" onClick={() => addToCart(_id)}></i>
            ) : (
              <i
                className="bx bxs-cart-alt"
                // onClick={() => addToCart(link)}
              ></i>
            )} */}
            <AiOutlineShoppingCart />
          </div>
        </div>
        <div className="productCart-wrapper_action_save action-wrapper">
          <div className="productCart-wrapper_action_save_icon action-wrapper_icon delay-6">
            {/* {link === null ? (
              <Link to={`/category/${_id}`}>
                <i className="bx bxs-show"></i>
              </Link>
            ) : (
              <Link to={`/category/${link}`}>
                <i className="bx bxs-show"></i>
              </Link>
            )} */}
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

export default ProductCard;

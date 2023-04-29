import React from "react";
import { ProductModel } from "../../model/product";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
  productList: ProductModel[]
}

function HeroSlider({ productList }: Props) {
  return (
    <div className="heroslider">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        className="heroslider-wrapper"
      >
        {productList.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="heroslider-wrapper_item">
              <div className="heroslider-wrapper_item_info">
                <div className="heroslider-wrapper_item_info_wrapper">
                  <div className="heroslider-wrapper_item_info_name">
                    {product.name}
                  </div>
                  <div className="heroslider-wrapper_item_info_brand">
                    {product.brand}
                  </div>
                  <div className="heroslider-wrapper_item_info_btn">
                    <button className="btn">
                      <Link to={`/category/${product.id}`}>Shop now</Link>
                    </button>
                  </div>
                </div>
              </div>
              <div className="heroslider-wrapper_item_img">
                <div className="heroslider-wrapper_item_img_wrapper">
                  <img
                    src={product.images[1]}
                    alt=""
                    className={` slider-img-wrapper_item`}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroSlider;

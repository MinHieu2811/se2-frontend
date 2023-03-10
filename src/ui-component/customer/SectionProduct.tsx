import React from "react";
import { ProductModel } from "../../model/product";
import Grid from "./Grid";
import ProductCard from "./ProductCard";

type Props = {
  products: ProductModel[];
  title: string;
};

export default function SectionProduct({ products, title }: Props) {
  return (
    <section className="section-wrapper">
      <h1 className="title">{title}</h1>
      <Grid col={3} mdCol={2} smCol={1} gap={20}>
        <>
          {products.map((product) => (
            <div key={product.id}>
              <>
                {/* <div className="slider-container_item">
                  <div className="slider-container_item_img">
                    <img src={product.image[0]} alt="" className={`img `} />
                    <img src={product.image[1]} alt={product.name} />
                    <div className="slider-overlay"></div>
                  </div>

                  <div className="slider-container_item_info">
                    <div className="slider-container_item_info_branch">
                      <span>{product.brand}</span>
                    </div>
                    <div className="slider-container_item_info_title">
                      <h3>{product.name}</h3>
                    </div>
                    <div className="slider-container_item_info_price">
                      <span className="price">${product.price}</span>
                    </div>
                  </div>

                  <div className="slider-container_item_btn_container">
                    <div className="slider-container_item_btn_container_item">
                      <Link
                        to={`category/${product.id}`}
                        style={{ height: "100%" }}
                      >
                        <div className="btn-view-detail btn">View detail</div>
                      </Link>
                      <div
                        className="btn-add-cart btn"
                        //   onClick={() => addToWishListHandler(product._id)}
                      >
                        add to wishlist
                      </div>
                    </div>
                  </div>
                </div> */}
                <ProductCard productInfo={product} />
              </>
            </div>
          ))}
        </>
      </Grid>
    </section>
  );
}

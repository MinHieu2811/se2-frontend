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
                <ProductCard productInfo={product} />
              </>
            </div>
          ))}
        </>
      </Grid>
    </section>
  );
}

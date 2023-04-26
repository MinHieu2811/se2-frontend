/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Helmet from "../../ui-component/shared/Helmet";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../ui-component/customer/Layout";
import DropdownSelect from "../../ui-component/customer/Dropdown";
import { DetailedObject } from "../../model/utils";
import Grid from "../../ui-component/customer/Grid";
import products from "../../fake-data";
import ProductCard from "../../ui-component/customer/ProductCard";
import { Breadcrumb } from "../../ui-component/customer/Breadcrumb";
import { useDebounce } from "../../hooks/useDebounce";
import { serializeQuery } from "../../hooks/useSearchNavigate";
import Paginate from "../../ui-component/shared/Pagination";

const properties: DetailedObject<string[]> = {
  brand: ["Tom Ford", "Loubotin", "Dior", "Gucci"],
  sorting: ["Ascending", "Descending"],
};

const initialState: DetailedObject<string | number> = {
  keyword: "",
  sorting: "",
  brand: "",
  page: 1,
};

const Category =() => {
  const [filterObj, setFilterObj] = useState<DetailedObject<string | number>>();
  const [product, setProduct] = useState(products);
  const navigate = useNavigate();
  const location = useLocation();
  const [productGrid, setProductGrid] = useState<JSX.Element>();

  function onPropertyChanged(property: string, name: string) {
    setFilterObj({
      ...filterObj,
      [name]: property,
    });
  }

  const debouncedKeyword = useDebounce({
    keyword: (filterObj?.keyword as string) || "",
    delay: 500,
  });

  useEffect(() => {
    if (filterObj) {
      const query = serializeQuery({ ...filterObj, keyword: debouncedKeyword });
      navigate({
        pathname: "/category",
        search:
          filterObj?.keyword ||
          filterObj?.sorting ||
          filterObj?.brand ||
          filterObj?.page
            ? query
            : "",
      });
      
        const filteredProducts = products
          .filter((product) =>
            product.name.toLowerCase().includes(String(filterObj?.keyword).toLowerCase())
          )
          .filter((product) =>
            filterObj.brand ? product.brand.toLowerCase() === String(filterObj.brand).toLowerCase() : true
          )
          .sort((a, b) => {
            switch (String(filterObj.sorting)) {
              case "Ascending":
                return a.price - b.price;
              case "Descending":
                return b.price - a.price;
              default:
                return 0;
            }
          });
    
        setProduct(filteredProducts);
        }
    
  }, [filterObj, navigate, debouncedKeyword]);

  
  useEffect(() => {
    if (location?.search) {
      const queryString = location?.search?.substring(1);
      const result = JSON.parse(
        '{"' +
          decodeURI(queryString)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
          '"}'
      );
      console.log(result);
      setFilterObj(result);
    } else {
      setFilterObj(initialState);
    }
  }, [window.location.href])
  useEffect(() => {
    const startIndex = (Number(filterObj?.page) - 1) * 3;
    const endIndex = startIndex + 3;
    
    const grid = (
      <Grid col={3} mdCol={2} smCol={2} gap={20}>
        <>
          {product?.slice(startIndex, endIndex).map((item, index) => (
            <div key={index}>
              <ProductCard productInfo={item} />
            </div>
          ))}
        </>
      </Grid>
    );
    setProductGrid(grid);
  }, [product, filterObj]);
  return (
    <Layout>
      <>
        <Helmet title="Category" />
        <div className="category-wrapper">
          <div className="container">
            <Breadcrumb />
            <div className="filter-bar">
              <div className="filter-bar__search">
                <label htmlFor="Search">SEARCH PRODUCT</label>
                <input
                  type="text"
                  id="Search"
                  placeholder="Search"
                  value={filterObj?.keyword}
                  className="filter-search__input"
                  onChange={(e) =>
                    setFilterObj({ ...filterObj, keyword: e.target.value })
                  }
                />
              </div>
              {Object.keys(properties).map((item) => {
                return (
                  <div className={`filter-bar__${item}`} key={`filter-${item}`}>
                    <DropdownSelect
                      propertyName={item.toUpperCase()}
                      selectedProperty={filterObj?.[item] as string}
                      values={properties[item]}
                      onPropertyChanged={onPropertyChanged}
                    />
                  </div>
                );
              })}
            </div>
            <div className="product-list">
              <div>
              {productGrid}
              </div>
                </div>
                <Paginate currentPage={Number(filterObj?.page)} totalPage={2} pathName={"/category"} />
                </div>
          </div>
      </>
    </Layout>
  );
};

export default Category;
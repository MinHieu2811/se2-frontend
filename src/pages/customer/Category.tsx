/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Helmet from "../../ui-component/shared/Helmet";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../../ui-component/customer/Layout";
import DropdownSelect from "../../ui-component/customer/Dropdown";
import { DetailedObject } from "../../model/utils";
import Grid from "../../ui-component/customer/Grid";
import products from "../../fake-data";
import ProductCard from "../../ui-component/customer/ProductCard";
import { Breadcrumb } from '../../ui-component/customer/Breadcrumb';
import { useDebounce } from "../../hooks/useDebounce";

type Props = {};

const properties: DetailedObject<string[]> = {
  brand: ["Tom Ford", "Loubotin", "Dior", "Gucci"],
  sorting: ["Ascending", "Descending"],
};

// interface FilterObject {
//   keyword?: string;
//   brand?: string;
//   sorting?: string;
//   page?: number;
// }

const serializeQuery = (obj: DetailedObject<string>) => {
  let result: string = "";
  Object.keys(obj).forEach((item) => {
    if (obj[item]) {
      return result.concat(`?${item}=${obj[item]}`);
    }
  });

  return result;
};

const initialState: DetailedObject<string> = {
  keyword: '',
  sorting: '',
  brand: ''
}

const Category = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterObj, setFilterObj] = useState<DetailedObject<string>>(initialState);
  const navigate = useNavigate();
  console.log(searchParams.get('keyword'), searchParams.get('brand'), searchParams.get('sorting'))

  function onPropertyChanged(property: string, name: string) {
    setFilterObj({
      ...filterObj,
      [name]: property,
    });
  }

  const debouncedKeyword = useDebounce({keyword: filterObj?.keyword || '', delay: 500})

  useEffect(() => {
    if (filterObj) {
      serializeQuery({...filterObj, keyword: debouncedKeyword});
      const query = new URLSearchParams({...filterObj, keyword: debouncedKeyword});
      setSearchParams(query.toString());
      console.log(query.toString())
      navigate((filterObj?.keyword || filterObj?.sorting || filterObj.brand) ? `?${query.toString()}` : '' );
    }
  }, [filterObj, navigate, debouncedKeyword]);
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
                  className="fiter-search__input"
                  onChange={(e) => setFilterObj({...filterObj, keyword: e.target.value})}
                />
              </div>
              {Object.keys(properties).map((item) => (
                <div className={`filter-bar__${item}`} key={`filter-${item}`}>
                  <DropdownSelect
                    propertyName={item.toUpperCase()}
                    selectedProperty={filterObj?.item as string}
                    values={properties[item]}
                    onPropertyChanged={onPropertyChanged}
                  />
                </div>
              ))}
            </div>
            <div className="product-list">
              <Grid col={3} mdCol={2} smCol={1} gap={20}>
                <>
                  {products?.map((item, index) => (
                    <div key={index}>
                      <ProductCard productInfo={item} />
                    </div>
                  ))}
                </>
              </Grid>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Category;

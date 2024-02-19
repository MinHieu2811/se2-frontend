/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Helmet from "../../ui-component/shared/Helmet";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../ui-component/customer/Layout";
import DropdownSelect from "../../ui-component/customer/Dropdown";
import { DetailedObject } from "../../model/utils";
import Grid from "../../ui-component/customer/Grid";
// import products from "../../fake-data";
import ProductCard from "../../ui-component/customer/ProductCard";
import { Breadcrumb } from "../../ui-component/customer/Breadcrumb";
import { useDebounce } from "../../hooks/useDebounce";
import { serializeQuery } from "../../hooks/useSearchNavigate";
import Paginate from "../../ui-component/shared/Pagination";
import { axiosInstance } from "../../client-api";
import { useToastContext } from "../../ui-component/toast/ToastContext";
import { REMOVE_ALL_AND_ADD } from "../../ui-component/toast";
import axios from "axios";
import { ProductModel } from "../../model/product";
import products from "../../fake-data";
// import { useUpdateEffect } from "../../hooks/useUpdateEffect";

function shallowEqual(
  object1: DetailedObject<string | number>,
  object2: DetailedObject<string | number>
) {
  const keys1 = Object.keys(object1 || {});
  const keys2 = Object.keys(object2 || {});
  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}

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

const PRODUCT_PER_PAGE = 9;

const Category = () => {
  const [filterObj, setFilterObj] = useState<DetailedObject<string | number>>();
  const navigate = useNavigate();
  const location = useLocation();
  const [productList, setProductList] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toastDispatch } = useToastContext();
  const [, setTotalPage] = useState(0);

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
    const queryString = location?.search?.substring(1);
    const result = JSON.parse(
      '{"' +
        decodeURI(queryString)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
    if (
      filterObj &&
      !shallowEqual(filterObj as DetailedObject<number | string>, result)
    ) {
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
      setFilterObj(result);
    } else {
      setFilterObj(initialState);
    }
  }, [window.location.search]);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const query = serializeQuery(filterObj || initialState);
    const queryString = location?.search?.substring(1);
    const result = JSON.parse(
      '{"' +
        decodeURI(queryString)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
    (async () => {
      setLoading(true);
      filterObj &&
        shallowEqual(filterObj as DetailedObject<number | string>, result) &&
        (await axiosInstance
          .get(`/product?${query}`, {
            cancelToken: cancelToken.token,
          })
          .then((res) => res?.data)
          .then((res) => {
            const list = res?.data;
            setTotalPage(Math.ceil(list?.length / PRODUCT_PER_PAGE));
            setProductList(list);
          })
          .finally(() => setLoading(false))
          .catch((err) => {
            console.log(err);
            toastDispatch({
              type: REMOVE_ALL_AND_ADD,
              payload: {
                type: "is-danger",
                content: "Something went wrong!",
              },
            });
          }));
    })();

    return () => {
      cancelToken.cancel();
    };
  }, [filterObj]);

  return (
    <Layout>
      <>
        <Helmet title="Category" />
        {/* {loading && <LoadingCustomer />} */}
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
              <Grid col={3} mdCol={2} smCol={1} gap={20}>
                <>
                  {products?.map((item, index) => (
                    <div key={index}>
                      <ProductCard productInfo={item} isLoading={loading} />
                    </div>
                  ))}
                </>
              </Grid>
            </div>
            <Paginate
              currentPage={Number(filterObj?.page)}
              totalPage={2}
              isAdmin={false}
            />
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Category;

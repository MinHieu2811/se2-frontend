import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { DetailedObject } from "../../model/utils";
import { useSearchNavigate } from "../../hooks/useSearchNavigate";

type PaginationProps = {
  totalPage: number;
  currentPage: number;
  isAdmin: boolean;
};

const initialState: DetailedObject<string | number> = {
  keyword: "",
  sorting: "",
  brand: "",
  page: 1,
};

const Paginate = ({
  totalPage,
  currentPage,
  isAdmin = false,
}: PaginationProps) => {
  const location = useLocation();
  const [filterObj, setFilterObj] = useState<DetailedObject<string | number>>();
  const searchNavigate = useSearchNavigate();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.href]);

  return totalPage > 1 ? (
    <div className={`paginate-wrapper ${!isAdmin ? "category" : ""}`}>
      <Pagination>
        <Pagination.Item
          onClick={() =>
            searchNavigate({
              pathName: "/category",
              queryObj: {
                ...filterObj,
                page: `${currentPage - 1 === 0 ? 1 : currentPage - 1}`,
              },
            })
          }
        >
          <div className="paginate-wrapper_link">
            <BsChevronLeft />
          </div>
        </Pagination.Item>
        {[...Array(totalPage).keys()].map((x) => (
          <Pagination.Item
            className={`paginate-wrapper_link ${
              currentPage === x + 1 ? "active" : ""
            }`}
            key={`page-${x + 1}`}
            onClick={() =>
              searchNavigate({
                pathName: "/category",
                queryObj: {
                  ...filterObj,
                  page: `${x + 1}`,
                },
              })
            }
          >
            <div>{x + 1}</div>
          </Pagination.Item>
        ))}
        <Pagination.Item
          onClick={() =>
            searchNavigate({
              pathName: "/category",
              queryObj: {
                ...filterObj,
                page: `${
                  currentPage + 1 > totalPage ? totalPage : currentPage + 1
                }`,
              },
            })
          }
        >
          <div className="paginate-wrapper_link">
            <BsChevronRight />
          </div>
        </Pagination.Item>
      </Pagination>
    </div>
  ) : (
    <div className={`paginate-wrapper ${!isAdmin ? "category" : ""}`}>
      <Pagination>
        <Pagination.Item
          className={`paginate-wrapper_link`}
          onClick={() =>
            searchNavigate({
              pathName: "/category",
              queryObj: {
                ...filterObj,
                page: `${currentPage - 1 <= 0 ? 1 : currentPage - 1}`,
              },
            })
          }
        >
          Back
        </Pagination.Item>
      </Pagination>
    </div>
  );
};

export default Paginate;

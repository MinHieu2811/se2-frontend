import React from "react";
import { Pagination } from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";

type PaginationProps = {
  totalPage: number;
  currentPage: number;
  isAdmin: boolean;
  keyword?: string;
};

const Paginate = ({
  totalPage,
  currentPage,
  isAdmin = false,
  keyword = "",
}: PaginationProps) => {
  return (
    totalPage > 1 ? (
      <div className="paginate-wrapper">
        <Pagination>
          <Pagination.Item>
            <Link
              to={
                !isAdmin
                  ? keyword
                    ? `/category/search/${keyword}/page/${
                        currentPage - 1 === 0 ? 1 : currentPage - 1
                      }`
                    : `/category/page/${
                        currentPage - 1 === 0 ? 1 : currentPage - 1
                      }`
                  : `/admin/products/all-product/${
                      currentPage - 1 === 0 ? 1 : currentPage - 1
                    }`
              }
              className="paginate-wrapper_link"
            >
              <BsChevronLeft />
            </Link>
          </Pagination.Item>
          {[...Array(totalPage).keys()].map((x) => (
            <Pagination.Item>
              <Link
                key={x + 1}
                to={
                  !isAdmin
                    ? keyword
                      ? `/category/search/${keyword}/page/${x + 1}`
                      : `/category/page/${x + 1}`
                    : `/admin/products/all-product/${x + 1}`
                }
                className={`paginate-wrapper_link ${
                  currentPage === x + 1 ? "active" : ""
                }`}
              >
                {x + 1}
              </Link>
            </Pagination.Item>
          ))}
          <Pagination.Item>
            <Link
              to={
                !isAdmin
                  ? keyword
                    ? `/category/search/${keyword}/page/${
                        currentPage + 1 > totalPage
                          ? totalPage
                          : currentPage + 1
                      }`
                    : `/category/page/${
                        currentPage + 1 > totalPage
                          ? totalPage
                          : currentPage + 1
                      }`
                  : `/admin/products/all-product/${
                      currentPage + 1 > totalPage ? totalPage : currentPage + 1
                    }`
              }
              className="paginate-wrapper_link"
            >
              <BsChevronRight />
            </Link>
          </Pagination.Item>
        </Pagination>
      </div>
    ) : (
        <></>
    )
  );
};

export default Paginate;

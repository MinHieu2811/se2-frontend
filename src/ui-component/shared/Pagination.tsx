import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { DetailedObject } from "../../model/utils";
import { useSearchNavigate } from "../../hooks/useSearchNavigate";

type PaginationProps = {
  totalPage: number;
  currentPage: number;
  pathName: string;
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
  pathName,
}: PaginationProps) => {
  const location = useLocation();
  const [filterObj, setFilterObj] = useState<DetailedObject<string | number>>(
    {}
  );
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
  }, [location?.search]);
  return (
    <div className={`paginate-wrapper ${"category" }`}>
      <Pagination>
        <Pagination.Item
          onClick={() =>
            searchNavigate({
              pathName: pathName,
              queryObj: {
                ...filterObj,
                page: `${
                  currentPage <= 1 ? 1 : currentPage - 1
                }`,
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
                pathName: pathName,
                queryObj: {
                  ...filterObj,
                  page: `${x + 1}`,
                },
              })
            }
          >
            <div>{x+1}</div>
          </Pagination.Item>
        ))}
        <Pagination.Item
          onClick={() =>
            searchNavigate({
              pathName: pathName,
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
  );
};

export default Paginate;

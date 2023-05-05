import React from "react";
import { Pagination } from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const renderPageNumbers = (
  currentPage: number,
  totalPages: number,
  onPageChange: (pageNumber: number) => void
) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    const active = i === currentPage;
    pageNumbers.push(
      <Pagination.Item key={i} active={active} onClick={() => onPageChange(i)}>
        {i}
      </Pagination.Item>
    );
  }

  return pageNumbers;
};

const AdminPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <Pagination>
      <Pagination.Item
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <BsChevronLeft />
      </Pagination.Item>
      {renderPageNumbers(currentPage, totalPages, onPageChange)}
      <Pagination.Item
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <BsChevronRight />
      </Pagination.Item>
    </Pagination>
  );
};

export default AdminPagination;

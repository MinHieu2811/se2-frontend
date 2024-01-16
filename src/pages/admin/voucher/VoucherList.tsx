import React, { useState } from "react";
import { Button, InputGroup, Table } from "react-bootstrap";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import Layout from "../../../ui-component/shared/Layout";
import AdminPagination from "../AdminPagination";
import { useNavigate } from "react-router";
import { useVoucher } from "../../../context/VoucherContext";


const VoucherList = () => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { voucher } = useVoucher();
  const navigate = useNavigate();
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const generateCateGrid = (
    products: any[],
    currentPage: number,
    productsPerPage: number
  ) => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return (
      <Table striped="column" bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Voucher Code</th>
            <th>Voucher Decrease Amount</th>
            <th>Voucher Quantity</th>
            <th>Voucher Expired</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        {voucher?.length ? (
          voucher.slice(startIndex, endIndex).map((item) => (
            <tr key={item?.code}>
              <td>{item?.code.substring(0, 5)}</td>
              <td>{item?.code.substring(0, 5)}</td>
              <td>{item?.value}</td>
              <td>{item?.quantity}</td>
              <td>{item?.expiredAt}</td>

              <td className="d-flex justify-center">
                <Button
                  href={`/admin/products/edit/${item?.code}`}
                  style={{ marginRight: "5px" }}
                >
                  <AiOutlineEdit />
                </Button>
                <Button>
                  <AiFillDelete />
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <></>
        )}
      </Table>
    );
  };
  return (
    <Layout>
      <div className="w-100">
        {/* {loading && <Loading />} */}
        <div className="list-header d-flex">
          <h1 style={{ flex: 1 }}>All Voucher</h1>
          <InputGroup style={{ flex: 2, margin: "0px 20px" }}>
            {/* <Form.Control type="text" placeholder="Keyword" /> */}
          </InputGroup>
          <Button
            style={{ flex: 1 }}
            onClick={() => navigate("/admin/voucher-discount/create-voucher")}
          >
            Create New Voucher
          </Button>
        </div>
        {generateCateGrid(voucher, currentPage, itemsPerPage)}
        <div className="pagination-wrapper" style={{ margin: "20px auto" }}>
          <AdminPagination
            currentPage={currentPage}
            totalPages={Math.ceil(voucher.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default VoucherList;

import React from "react";
import { Link } from "react-router-dom";
import Grid from "./Grid";

const footerAboutLinks = [
    {
      display: "Giới thiệu",
      path: " ",
    },
    {
      display: "Liên hệ",
      path: " ",
    },
    {
      display: "Tuyển dụng",
      path: " ",
    },
    {
      display: "Tin tức",
      path: " ",
    },
    {
      display: "Hệ thống cửa hàng",
      path: " ",
    },
  ];
  
  const footerCustomerLinks = [
    {
      display: "Chính sách đổi trả",
      path: " ",
    },
    {
      display: "Chính sách bảo hành",
      path: " ",
    },
    {
      display: "Chính sách hoàn tiền",
      path: " ",
    },
    {
      display: "Contact",
      path: " ",
    },
  ];

function Footer() {
  return (
    <footer>
      <div className="footer-wrapper">
        <Grid col={4} mdCol={2} smCol={1} gap={30}>
          <>
            <div className="footer_about">
              <Link to="/">
                <h1>SolStore</h1>
              </Link>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                itaque id non architecto ullam culpa, corrupti corporis
                inventore hic facere. Quod ea cumque dicta nobis.
              </p>
            </div>
            <div>
              <div className="footer_title">Tổng đài hỗ trợ</div>
              <div className="footer_content">
                <p>
                  Liên hệ đặt hàng <strong>0123456789</strong>
                </p>
                <p>
                  Thắc mắc đơn hàng <strong>0123456789</strong>
                </p>
                <p>
                  Góp ý, khiếu nại <strong>0123456789</strong>
                </p>
              </div>
            </div>
            <div>
              <div className="footer_title">Về SolStore</div>
              <div className="footer_content">
                {footerAboutLinks.map((item, index) => (
                  <p key={index}>
                    <Link to={item.path}>{item.display}</Link>
                  </p>
                ))}
              </div>
            </div>
            <div>
              <div className="footer_title">Chăm sóc khách hàng</div>
              <div className="footer_content">
                {footerCustomerLinks.map((item, index) => (
                  <p key={index}>
                    <Link to={item.path}>{item.display}</Link>
                  </p>
                ))}
              </div>
            </div>
          </>
        </Grid>
      </div>
    </footer>
  );
}

export default Footer;

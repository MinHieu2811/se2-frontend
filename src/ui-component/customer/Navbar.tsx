import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineUser,
} from "react-icons/ai";
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartModal from "./CartModal";
import { useToggleModal } from "../../context/ModalProvider";

const Navbar = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  const userMenuRef = useRef<HTMLDivElement>(null);

  const { setOpen } = useToggleModal()
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleScroll = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef?.current?.classList?.add("shrink");
    } else {
      headerRef?.current?.classList?.remove("shrink");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logoutHandler = () => {
    navigate("/");
  };

  const handlerUserMenu = () => {
    userMenuRef?.current?.classList?.toggle("show");
  };

  const mainNav = [
    {
      display: "Home",
      path: "/",
    },
    {
      display: "category",
      path: "/category",
    },
    {
      display: "wishlist",
      path: "/wishlist",
    },
  ];

  const { pathname } = useLocation();
  const navActive = mainNav.findIndex(
    (e) => e.path.split("/")[1] === pathname.split("/")[1]
  );

  return (
    <div className="main-nav" ref={headerRef}>
      <div className="main-nav_left">
        <h1>
          <span className="red">Sol</span>Store
        </h1>
      </div>
      <div className="main-nav_center">
        <ul className="main-nav_center_container">
          {mainNav.map((item, index) => (
            <li
              className={`main-nav_center_container_item ${
                index === navActive ? "active" : ""
              }`}
              key={index}
            >
              <Link to={item.path}>{item.display}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="main-nav_right">
        <div className="main-nav_right_item">
          <span className="main-nav_right_item_qty">0</span>
          <HiOutlineShoppingBag onClick={setOpen}/>
        </div>
        <div
          className="main-nav_right_item login-box"
          onClick={handlerUserMenu}
        >
          <>{1 ? <span className="user-name">H</span> : <AiOutlineUser />}</>
          <div className="signin_box" ref={userMenuRef}>
            {isLogin ? (
              <div className="signin_box_container">
                <div className="signin_box_container_item">
                  <Link to="/profile">Profile</Link>
                </div>
                <>
                  {isAdmin ? (
                    <>
                      <div className="signin_box_container_item">
                        <Link to="/admin/userlist">Users</Link>
                      </div>
                      <div className="signin_box_container_item">
                        <Link to="/admin/productlist">Products</Link>
                      </div>
                      <div className="signin_box_container_item">
                        <Link to="/admin/orderlist">Orders</Link>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
                <div
                  className="signin_box_container_item"
                  onClick={logoutHandler}
                >
                  Logout
                </div>
              </div>
            ) : (
              <div className="signin_box_container">
                <div className="signin_box_container_item">
                  <Link to="/login">Sign In</Link>
                </div>
                <div className="signin_box_container_item">
                  <Link to="/register">Sign Up</Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="main-nav_right_item">
          <AiOutlineMenu />
        </div>
      </div>
      <CartModal />
    </div>
  );
};

export default Navbar;

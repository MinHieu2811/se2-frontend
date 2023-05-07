import React, { useEffect, useRef, useState } from "react";
import { AiOutlineHeart, AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import CartModal from "./CartModal";
import { useToggleModal } from "../../context/ModalProvider";
import { useCart } from "../../context/CartProvider";
import { useSearchNavigate } from "../../hooks/useSearchNavigate";
import { DetailedObject } from "../../model/utils";
import { useToggleAuthModal } from "../../context/AuthModalProvider";
import { useAuth } from "../../context/AuthProvider";

const initialState: DetailedObject<string> = {
  keyword: "",
  sorting: "",
  brand: "",
  page: "1"
};

const Navbar = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { token, onLogout, admin } = useAuth()
  const [filterObj, setFilterObj] = useState<DetailedObject<string>>();
  const { setOpenModal } = useToggleAuthModal()
  const [isAdmin, setIsAdmin] = useState(localStorage?.getItem('isAdmin') || false)
  console.log(isAdmin, admin);


  useEffect(() => {
    if(localStorage?.getItem('isAdmin')) {
      setIsAdmin(JSON.parse(localStorage?.getItem('isAdmin') || ''))
    }
  }, [])

  const searchNavigate = useSearchNavigate();
  const location = useLocation();

  const userMenuRef = useRef<HTMLDivElement>(null);

  const { setOpen } = useToggleModal();

  // const [isLogin, setIsLogin] = useState(false);

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

  const handlerUserMenu = () => {
    userMenuRef?.current?.classList?.toggle("show");
  };

  const mainNav = [
    {
      display: "Home",
      path: {
        pathname: "/",
        brand: "",
      },
    },
    {
      display: "Dior",
      path: {
        pathname: "/category",
        brand: "Dior",
      },
    },
    {
      display: "Gucci",
      path: {
        pathname: "/category",
        brand: "Gucci",
      },
    },
    {
      display: "Tom Ford",
      path: {
        pathname: "/category",
        brand: "Tom Ford",
      },
    },
    {
      display: "Loubotin",
      path: {
        pathname: "/category",
        brand: "Loubotin",
      },
    },
  ];

  const { totalItems } = useCart();

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
            <li className={`main-nav_center_container_item`} key={index}>
              <div
                onClick={() => {
                  searchNavigate({
                    pathName: item?.path?.pathname,
                    queryObj: item?.path?.pathname.includes("/category")
                      ? {
                          ...filterObj,
                          brand: item?.path?.brand,
                        }
                      : {},
                  });
                }}
              >
                {item.display}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="main-nav_right">
        <div className="main-nav_right_item">
          <AiOutlineHeart />
        </div>
        <div className="main-nav_right_item">
          <span className="main-nav_right_item_qty">{totalItems}</span>
          <HiOutlineShoppingBag onClick={setOpen} />
        </div>
        <div
          className="main-nav_right_item login-box"
          onClick={handlerUserMenu}
        >
          <>{token ? <span className="user-name">H</span> : <AiOutlineUser />}</>
          <div className="signin_box" ref={userMenuRef}>
            {token ? (
              <div className="signin_box_container">
                <>
                  {isAdmin ? (
                    <>
                      <div className="signin_box_container_item">
                        <Link to="/admin/products/all-product">Dashboard</Link>
                      </div>
                      <div className="signin_box_container_item">
                        <Link to="/admin/voucher-discount/all-voucher">Vouchers</Link>
                      </div>
                      <div className="signin_box_container_item">
                        <Link to="/admin/products/all-product">Products</Link>
                      </div>
                      <div className="signin_box_container_item">
                        <Link to="/admin/order/all-order">Orders</Link>
                      </div>
                      <div className="signin_box_container_item">
                        <Link to="/admin/voucher-discount/all-discount">Discount</Link>
                      </div>
                    </>
                  ) : (
                    <div
                      className="signin_box_container_item"
                    >
                      <Link to="/user/order">My Orders</Link>
                    </div>
                  )}
                </>
                <div
                  className="signin_box_container_item"
                  onClick={onLogout}
                >
                  Logout
                </div>
              </div>
            ) : (
              <div className="signin_box_container">
                <div className="signin_box_container_item">
                  <div onClick={() => setOpenModal?.("LOGIN")}>Sign In</div>
                </div>
                <div className="signin_box_container_item">
                  <div onClick={() => setOpenModal?.("REGISTER")}>Sign Up</div>
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

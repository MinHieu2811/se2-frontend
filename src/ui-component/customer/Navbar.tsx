import React, { useEffect, useRef, useState } from "react";
import { AiOutlineHeart, AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartModal from "./CartModal";
import { useToggleModal } from "../../context/ModalProvider";
import { useCart } from "../../context/CartProvider";
import { useSearchNavigate } from "../../hooks/useSearchNavigate";
import { DetailedObject } from "../../model/utils";

const initialState: DetailedObject<string> = {
  keyword: "",
  sorting: "",
  brand: "",
};

const Navbar = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [filterObj, setFilterObj] = useState<DetailedObject<string>>();

  const searchNavigate = useSearchNavigate();
  const location = useLocation();

  const userMenuRef = useRef<HTMLDivElement>(null);

  const { setOpen } = useToggleModal();
  const navigate = useNavigate();

  const [isLogin] = useState(false);
  const [isAdmin] = useState(false);

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

  const logoutHandler = () => {
    navigate("/");
  };

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
          <>{1 ? <span className="user-name">H</span> : <AiOutlineUser />}</>
          <div className="signin_box" ref={userMenuRef}>
            {!isLogin ? (
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
                    <div
                      className="signin_box_container_item"
                    >
                      <Link to="/user/order">My Orders</Link>
                    </div>
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

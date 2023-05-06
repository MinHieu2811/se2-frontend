import React, { useRef, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useToggleModal } from "../../context/ModalProvider";
import { useCart } from "../../context/CartProvider";
import Variants from "./Variants";
import { useSearchNavigate } from "../../hooks/useSearchNavigate";
import VoucherCard from "./Voucher";
import { useVoucher } from "../../context/VoucherContext";
import { useAuth } from "../../context/AuthProvider";
import { Voucher } from '../../model/order';

function freeze() {
  document.documentElement.classList.add("is-clipped");
}

function unFreeze() {
  document.documentElement.classList.remove("is-clipped");
}

const CartModal = () => {
  const { totalItems, totalPrice } = useCart();
  const { isOpen, setOpen } = useToggleModal();
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchNavigate = useSearchNavigate();
  const navigate = useNavigate();
  const { voucher, listVoucher } = useVoucher();
  const { token } = useAuth();
  const {voucher: selectedVoucher} = useCart()

  //   const [storedValue, setValue] = useLocalStorage("cart", false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const scrollToBottom = () => {
    if (scrollRef?.current) {
      setTimeout(() => {
        scrollRef?.current?.scrollTo({
          top: scrollRef?.current?.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  useEffect(() => {
    (async () => {
      listVoucher?.(token || "");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    const rootContainer = document.querySelector("html");
    if (isOpen) {
      rootContainer?.classList?.add("is-overflow");
    } else {
      rootContainer?.classList?.remove("is-overflow");
    }
  }, [isOpen]);

  const onCheckout = () => {
    setIsCheckingOut(true);
    navigate("/checkout");
  };

  const listVouchers = useMemo(() => {
    // eslint-disable-next-line array-callback-return
    const list = voucher?.map((item) => {
      if (item?.minimumApplicablePrice <= totalPrice || item?.code === selectedVoucher?.code) {
        return item;
      }
    }).filter((item) => item)
    return list;
  }, [voucher, totalPrice, selectedVoucher?.code]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      freeze();
    } else {
      unFreeze();
    }
  }, [isOpen]);

  return (
    <>
      {/* <div className={`cart`}> */}
      <div
        className={`custom-modal slide-right${isOpen ? " is-active" : ""}`}
        style={{
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        <div className="modal-background" onClick={setOpen}></div>
        <div className="modal-card animated faster">
          <header className="modal-card-head">
            <p className="modal-card-title">Your shopping cart</p>
            <button className="delete" aria-label="close" onClick={setOpen}>
              <AiOutlineClose />
            </button>
          </header>
          {/* <section className={`modal-card-body ${isUpdatingCart ? 'disabled' : ''}`}> */}
          {totalItems ? (
            <>
              <section className="modal-card-body">
                <div className="scrollable-content" ref={scrollRef}>
                  <Variants />
                  {listVouchers?.map((item, index) => (
                    <VoucherCard
                      {...item as Voucher}
                      index={index}
                      key={`voucher-${index}`}
                      // voucherSyncedProps={getVoucherSyncedProps()}
                    />
                  ))}
                </div>
                <div className="fixed-bottom">
                  <div className="total">You have total {totalItems} items</div>
                  <hr className="mt-0" />
                  <div className="total">
                    Subtotal
                    <span className="price">${totalPrice}</span>
                  </div>
                  <button
                    className={`button button--cta is-fullwidth is-primary${
                      isCheckingOut ? " is-loading" : ""
                    }`}
                    onClick={() => onCheckout()}
                  >
                    PROCEED TO SECURE CHECKOUT
                  </button>
                </div>
              </section>
            </>
          ) : (
            <section className="modal-card-body">
              <div className="empty-content">
                <div>Looks like your bag is empty.</div>
                <p>Not sure where to start?</p>
                <button
                  onClick={() => {
                    setOpen && setOpen();
                    searchNavigate({
                      pathName: "/category",
                      queryObj: {
                        brand: "",
                        page: "1",
                        sorting: "",
                        keyword: "",
                      },
                    });
                  }}
                  className="button button--cta is-fullwidth is-primary"
                >
                  Discover our products
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default React.memo(CartModal);

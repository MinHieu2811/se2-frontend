import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useToggleModal } from "../../context/ModalProvider";

function freeze() {
  document.documentElement.classList.add("is-clipped");
}

function unFreeze() {
  document.documentElement.classList.remove("is-clipped");
}

const CartModal = () => {
  const { isOpen, setOpen} = useToggleModal()
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
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

  const onCheckout = () => {
    setIsCheckingOut(true);
  };

  // const scrollToTop = () => {
  //   if (scrollRef?.current) {
  //     scrollRef?.current.scrollTo({
  //       top: 0,
  //     });
  //   }
  // };

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
              <button
                className="delete"
                aria-label="close"
                onClick={setOpen}
              >
                <AiOutlineClose />
              </button>
            </header>
            {/* <section className={`modal-card-body ${isUpdatingCart ? 'disabled' : ''}`}> */}
            {1 ? (
              <>
                <section className="modal-card-body">
                  <div className="scrollable-content" ref={scrollRef}>
                    {/* <Variants /> */}
                  </div>
                  <div className="fixed-bottom">
                    <hr className="mt-0" />
                    <div className="total">
                      Subtotal
                      <span className="price">$20</span>
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
                  <p>Check out our bestsellers.</p>
                  <button
                    onClick={() => {
                      setOpen && setOpen()
                      navigate(`/category`);
                    }}
                    className="button button--cta is-fullwidth is-primary"
                  >
                    Discover our bestsellers
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

export default CartModal;

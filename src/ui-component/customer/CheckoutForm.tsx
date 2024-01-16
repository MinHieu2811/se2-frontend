import React, { useEffect, useState } from "react";
import { AddressErrors, CustomerAddress } from "../../model/address";
import { SyncedProps } from "../../hooks/useSyncedState";
import { useCart } from "../../context/CartProvider";
import { AiFillLock } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { axiosImageInstance } from "../../client-api";
import { useToastContext } from "../toast/ToastContext";
import { REMOVE_ALL_AND_ADD } from "../toast";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

type Props = {
  className?: string;
  errors: AddressErrors;
  valueSyncedProps: SyncedProps<CustomerAddress>;
  label: string;
  onSubmit: (paymentInfo?: any) => Promise<void>;
};

function CheckoutForm({
  className,
  errors,
  valueSyncedProps,
  label,
  onSubmit,
}: Props) {
  const [syncedAddress, setSyncedAddress] = valueSyncedProps;
  const { totalPrice } = useCart();
  const { toastDispatch } = useToastContext();
  const [clientId, setClientId] = useState("");

  function onCommonChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof CustomerAddress
  ) {
    // setIsChangeAddress(true)
    const value = event.target.value;
    setSyncedAddress((prevSyncedAddress) => {
      return {
        ...prevSyncedAddress,
        [field]: value,
      };
    });
  }

  function acceptNumber(event: React.ChangeEvent<HTMLInputElement>) {
    const phoneInput = event.target.value;
    let phone = "";
    let digitPhone = phoneInput.replace(/\D/g, "");
    if (digitPhone.length === 11 && digitPhone.startsWith("1")) {
      digitPhone = digitPhone.substring(1);
    }
    const x = digitPhone.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    if (x !== null) {
      phone = (
        !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "")
      ).trim();
    }
    setSyncedAddress((prevSyncedAddress) => {
      return {
        ...prevSyncedAddress,
        phone,
      };
    });
  }

  useEffect(() => {
    (async () => {
      const { data: clientId } = await axiosImageInstance.get("/config/paypal");
      setClientId(clientId);
    })();
  }, []);

  const validateFields = () => {
    let validated;
    (Object.keys(syncedAddress) as Array<keyof CustomerAddress>)?.forEach(
      (key) => {
        if (syncedAddress[key] === "") {
          validated = true;
        } else {
          validated = false;
        }
      }
    );

    return validated;
  };
  return (
    <div className={`address-form ${className ? className : ""}`}>
      <div className="mb-2 has-text-weight-medium">{label}</div>
      <div className="columns is-mobile is-variable is-1 m-0 d-flex">
        <div className="column col-12 pt-0 pb-0 pl-0 mr-2 no-pad">
          <div className=" mb-3">
            <div className="control">
              <input
                value={syncedAddress.name ?? ""}
                name="firstName"
                className={`input ${errors.name ? "is-danger" : ""}`}
                type="text"
                placeholder="Name"
                onChange={(event) => onCommonChange(event, "name")}
                onKeyPress={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
              />
              <p className="help is-danger">{errors.name}</p>
            </div>
          </div>
        </div>
        {/* <div className="column col-6 pt-0 pr-0 pb-0 no-pad">
          <div className=" mb-3">
            <div className="control">
              <input
                value={syncedAddress.last_name ?? ""}
                name="lastName"
                className={`input ${errors.last_name ? "is-danger" : ""}`}
                type="text"
                placeholder="Last name"
                onChange={(event) => onCommonChange(event, "last_name")}
                onKeyPress={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
              />
              <p className="help is-danger">{errors.last_name}</p>
            </div>
          </div>
        </div> */}
      </div>
      <div className=" col-12 no-pad mb-3">
        <div className="control">
          <input
            value={syncedAddress.email ?? ""}
            name="email"
            className={`input ${errors.email ? "is-danger" : ""}`}
            type="text"
            placeholder="Email"
            onChange={(event) => onCommonChange(event, "email")}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
          />
          <p className="help is-danger">{errors.email}</p>
        </div>
      </div>
      <div className=" col-12 no-pad mb-3">
        <div className="control">
          <input
            value={syncedAddress.address ?? ""}
            name="address"
            className={`input ${errors.address ? "is-danger" : ""}`}
            type="text"
            placeholder="Address"
            onChange={(event) => onCommonChange(event, "address")}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
          />
          <p className="help is-danger">{errors.address}</p>
        </div>
      </div>
      <div className="columns is-mobile is-variable is-1 m-0">
        <div className="column d-flex pt-0 pb-0 pl-0">
          <div className=" col-12 mb-3 no-pad">
            <div className="control">
              <input
                value={syncedAddress.city ?? ""}
                name="city"
                className={`input ${errors.city ? "is-danger" : ""}`}
                type="text"
                placeholder="City"
                onChange={(event) => onCommonChange(event, "city")}
                onKeyPress={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
              />
              <p className="help is-danger">{errors.city}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="columns is-mobile is-variable is-1 m-0">
        <div className="column d-flex pt-0 col-12 pr-0 pb-0 no-pad">
          <div className="col-6 no-pad mr-2">
            <div className="control has-prefix">
              <input
                value={syncedAddress.phone ?? ""}
                type="tel"
                name="phone"
                placeholder="Phone number"
                className={`input input__phone_number ${
                  errors.phone ? "is-danger" : ""
                }`}
                onInput={acceptNumber}
                onKeyPress={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
              />
              <span className="prefix">+1</span>
              <p className="help is-danger">{errors.phone}</p>
            </div>
          </div>
          <div className="col-6 mb-3 no-pad">
            <div className="control">
              <input
                className="input disabled"
                type="text"
                placeholder="Country"
                value="United States"
                name="country"
                disabled
                // onChange={(event) => onCommonChange(event, 'country')}
                onKeyPress={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="columns is-mobile is-variable is-1 m-0">
        <button
          className="checkout-button button is-primary col-12"
          onClick={onSubmit}
        >
          <AiFillLock className="mr-2" /> Check out for{" "}
          <BsCurrencyDollar className="ml-2" />
          {totalPrice}
        </button>
        <div className="hr">
          <p className="hr-text">Pay with Paypal</p>
        </div>
        {/* {sdkReady ? (
          <PayPalButton
            currency="USD"
            amount={totalPrice}
            onSuccess={successPaymentHandler}
          />
        ) : (
          <Loading isFullWidth={false} />
        )} */}
        <PayPalScriptProvider
          options={{
            "client-id": clientId,
            currency: "USD",
          }}
        >
          <PayPalButtons
            disabled={validateFields()}
            style={{ layout: "horizontal" }}
            createOrder={(data, actions) => {
              return actions?.order?.create({
                purchase_units: [
                  {
                    amount: {
                      value: `${totalPrice}`,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, action): Promise<void> => {
              return action?.order?.capture().then((details) => {
                // console.log("details", details);
                setTimeout(async () => {
                  await onSubmit(details);
                }, 500);
                toastDispatch({
                  type: REMOVE_ALL_AND_ADD,
                  payload: {
                    type: "is-success",
                    content: `Checkout successfully!`,
                  },
                });
              }) as Promise<void>;
            }}
          />
        </PayPalScriptProvider>
        )
      </div>
    </div>
  );
}

export default CheckoutForm;

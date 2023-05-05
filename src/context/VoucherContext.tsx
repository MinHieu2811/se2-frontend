import React, { useCallback, useState } from "react";
import { Voucher } from "../model/order";
import { axiosInstance } from "../client-api";

type Props = {
  children: JSX.Element;
};

interface ValueContext {
  voucher: Voucher[];
  listVoucher?: (customerId: string) => void;
}

export type AuthenType = "REGISTER" | "LOGIN" | "";

const VoucherContext = React.createContext<ValueContext>({
  voucher: [],
});

export const VoucherProvider = ({ children }: Props) => {
  const [voucher, setVoucher] = useState([]);

  const handleListVoucher = useCallback(async (customerId: string) => {
    try {
      if (!customerId) {
        return;
      }

      await axiosInstance
        ?.get("/voucher", { headers: { 'Authorization': `${customerId}` } })
        ?.then((res) => {
          setVoucher(res?.data?.data);
          return res?.data?.data;
        })
        .catch((err) => console.error(err.toString()));
    } catch (error) {
      console.error(error?.toString());
    }
  }, []);

  const value: ValueContext = {
    voucher: voucher,
    listVoucher: handleListVoucher,
  };

  return (
    <VoucherContext.Provider value={value}>{children}</VoucherContext.Provider>
  );
};

export const useVoucher = () => {
  return React.useContext(VoucherContext);
};

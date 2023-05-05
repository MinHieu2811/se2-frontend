import { useCart } from "../../context/CartProvider";
import { SyncedProps } from "../../hooks/useSyncedState";
import { Voucher, VoucherOrder } from "../../model/order";
import { REMOVE_ALL_AND_ADD } from "../toast";
import { useToastContext } from "../toast/ToastContext";

interface VoucherCardProps extends Voucher {
  index: number;
  voucherSyncedProps?: SyncedProps<VoucherOrder>;
}

const VoucherCard: React.FC<VoucherCardProps> = ({
  code,
  quantity,
  expiredAt,
  value,
  index,
  voucherSyncedProps,
}) => {
  const { toastDispatch } = useToastContext();
  // const [voucherSynced, setVoucherSynced] = voucherSyncedProps;
  const { voucher, handleVoucher } = useCart();

  const handleSetVoucher = () => {
    const expiredDate = new Date(expiredAt).getTime();
    const currDate = new Date().getTime();

    if (expiredDate <= currDate) {
      toastDispatch({
        type: REMOVE_ALL_AND_ADD,
        payload: {
          content: "This voucher is expired!",
          type: "is-danger",
        },
      });
      return;
    }

    if (quantity < 0) {
      toastDispatch({
        type: REMOVE_ALL_AND_ADD,
        payload: {
          content: "This voucher is out of stock!",
          type: "is-danger",
        },
      });
      return;
    }
    handleVoucher?.({
      code: code,
      discountAmount: value,
      expiredAt: expiredAt,
    });
  };

  // const handleRemoveVoucher = () => {
  //   setVoucherSynced({
  //     code: "",
  //     discountAmount: 0,
  //     expiredAt: "",
  //   });
  // }
  return (
    <div
      className="voucher-wrapper"
      style={{ bottom: `${295 + index * 50}px` }}
    >
      <div className="voucher-wrapper__content">
        Apply <span>#{code.substring(0, 5).toUpperCase()}</span> for saving{" "}
        {value * 100}%
      </div>
      {voucher?.code === code ? (
        <div
          className={`voucher-wrapper__btn ${
            voucher?.code === code ? "is-remove" : ""
          }`}
          onClick={handleSetVoucher}
        >
          Remove
        </div>
      ) : (
        <div className="voucher-wrapper__btn" onClick={handleSetVoucher}>
          Apply
        </div>
      )}
    </div>
  );
};

export default VoucherCard;

interface VoucherCardProps {
  code: string
  quantity: number,
  expiredAt: string
  discountAmount: DiscountAmount
  index: number
}

interface DiscountAmount {
  value: number
  minimumApplicable: number
}

const VoucherCard: React.FC<VoucherCardProps> = ({code, quantity, expiredAt, discountAmount, index}) => {
  return (
    <div className="voucher-wrapper" style={{bottom: `${295 + index * 50}px`}}>
      <div className="voucher-wrapper__content">
        Apply <span>{code.toUpperCase()}</span> for saving {discountAmount.value * 100}%
      </div>
      <div className="voucher-wrapper__btn">
        Apply
      </div>
    </div>
  );
};

export default VoucherCard;

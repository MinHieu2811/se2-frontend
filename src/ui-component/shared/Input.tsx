import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  // name: string
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onChange?: (e: any) => void
  value: string
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
  onChange,
  value
}) => {
  return (
    <div className="input-wrapper">
      {formatPrice && (
        <BiDollar
          size={24}
          className="input-icon"
        />
      )}
      <label>{label}</label>
      <input
        id={id}
        // name={name}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={type}
        className={`input-modal ${formatPrice ? "pl-9" : "pl-4"} `}
        style={{border: `1px solid ${errors[id] ? 'rgb(244 63 94)' : 'rgb(212 212 212)'}`, paddingLeft: formatPrice ? '2.25rem' : '1rem'}}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;

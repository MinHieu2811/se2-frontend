import { useState } from "react";
import Layout from "../../../ui-component/shared/Layout";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { axiosInstance } from "../../../client-api";
import { useToastContext } from "../../../ui-component/toast/ToastContext";
import { REMOVE_ALL_AND_ADD } from "../../../ui-component/toast";
interface Props {}

const CreateDiscount = (props: Props) => {
  const [date, setDate] = useState(new Date());
  const [formatDate, setFormatDate] = useState("");
  const [productID, setProductID] = useState("");
  const [discountAmount, setDiscountPercentage] = useState("");


  const applyFormattedDate = (date: Date) =>{
    const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} 00:00:00`;
  setFormatDate(formattedDate);
  }

  const { toastDispatch } = useToastContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(date);
    try {
       await axiosInstance
      .post("https://se2-ecommerce.herokuapp.com/discount",{
        productId: productID,
        discountAmount: discountAmount,
        expiryDate: formatDate,
      }).catch((err) => {
        console.log(err);
        toastDispatch({
          type: REMOVE_ALL_AND_ADD,
          payload: {
            type: "is-danger",
            content: "Something went wrong!",
          },
        });
      });


      // clear the form fields after submission
      setProductID("");
      setDiscountPercentage("");
      setDate(new Date());
    } catch (error) {
      console.error(error);
    }
  };

  const handleDiscountNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductID(event.target.value);
  };

  const handleDiscountPercentageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountPercentage(event.target.value);
  };

  return (
    <Layout>
      <>
        <div className="card w-100">
          <div className="card-body ">
            <form onSubmit={handleSubmit}>
              <Form.Group className="mb-4 width-all">
                <label htmlFor="DiscountID">Product ID</label>
                <Form.Control
                  type="text"
                  name="DiscountID"
                  className="form-control"
                  id="DiscountiD"
                  placeholder="Discount ID"
                  value={productID}
                  onChange={handleDiscountNameChange}
                />
              </Form.Group>

              <Form.Group className="mb-4 width-all">
                <label htmlFor="DiscountAmount">Discount Amount</label>
                <Form.Control
                  type="text"
                  name="DiscountAmount"
                  className="form-control"
                  id="DiscountAmount"
                  placeholder="Discount Amount"
                  value={discountAmount}
                  onChange={handleDiscountPercentageChange}
                />
              </Form.Group>

              <label>Expiry Date</label>
              <br />
              <DatePicker selected={date} onChange={(date) => {
                if (date) {
                  setDate(date);
                  applyFormattedDate(date);
                }
                }} />
              <br />
              <br />
              <button className="btn btn-primary mr-1 mt-2" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default CreateDiscount;

import React, { useState } from "react";
import Layout from "../../../ui-component/shared/Layout";
import Helmet from "../../../ui-component/shared/Helmet";
import { Form } from "react-bootstrap";
import { useToastContext } from "../../../ui-component/toast/ToastContext";
import { REMOVE_ALL_AND_ADD } from "../../../ui-component/toast";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
type Props = {};

const CreateDiscount = (props: Props) => {
  const [reviewImagesBlob, setReviewImagesBlob] = useState<File[]>([]);
  const { toastDispatch } = useToastContext();
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');
  const [startDate, setStartDate] = useState(new Date());
  const radios = [
    { name: 'All Products', value: '1' },
    { name: 'Specific Category', value: '2' },
    { name: 'Specific Product', value: '3' },
  ];
  const onImageChanged = (file: File[]) => {
    if (file && file?.length) {
      const arrayCheck = [".jpg", ".jpeg", ".png", "tiff", "webp", "gif"];
      file.forEach((image) => {
        const nameFile = image?.name;
        if (!arrayCheck.some((v) => nameFile.includes(v))) {
          toastDispatch({
            type: REMOVE_ALL_AND_ADD,
            payload: {
              type: "is-danger",
              content: `Please upload .jpg / .jpeg / .png / .tiff / .webp / .gif file only`,
            },
          });
        } else {
          setReviewImagesBlob([...reviewImagesBlob, image]);
        }
      });
    }
  };

  const handleChange = () => {};
  return (
    <Layout>
      <>
        <Helmet title="Create New Discount" />
        <div className="card w-100">
          <div className="card-body ">
            <form>
              <Form.Group className="mb-4 width-all">
                <label htmlFor="DiscountName">Discount Name</label>
                <Form.Control
                  type="text"
                  name="DiscountName"
                  className="form-control"
                  id="DiscountName"
                  placeholder="Discount Name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-4 width-all">
                <label htmlFor="DiscountCode">Discount Code</label>
                <Form.Control
                  type="text"
                  name="DiscountCode"
                  className="form-control"
                  id="DiscountCode"
                  placeholder="Discount Code"
                  onChange={handleChange}
                />
                {/* <Button variant="primary">Generate Code</Button> */}
                
                <button className="btn btn-primary mt-2">Generate Code</button>
              </Form.Group>
              <Form.Group className="mb-4 width-all">
                <label htmlFor="DiscountDesc">Discount Description</label>
                <textarea className="form-control text-area mr-2" onChange={handleChange} placeholder="Discount Description" style={{width: "100%", resize: "vertical"}} name="DiscountDesc" id="DiscountDesc" />
              </Form.Group>
              <Form.Group className="mb-4 width-all">
                <label htmlFor="DiscountPercentage">Discount Percentage</label>
                <Form.Control
                  type="text"
                  name="DiscountPercentage"
                  className="form-control"
                  id="DiscountPercentage"
                  placeholder="DiscountPercentage"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-4 width-all">
                <ButtonGroup>
                    {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        {radio.name}
                    </ToggleButton>
                    ))}
                </ButtonGroup>         
              </Form.Group>
              <label>Expiry Date </label>
              <DatePicker selected={startDate} onChange={date => date && setStartDate(date)} />
              <button className="btn btn-primary mr-1 mt-2">Submit</button>
            </form>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default CreateDiscount;

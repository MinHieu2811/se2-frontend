import React, { useState } from "react";
import Layout from "../../../ui-component/shared/Layout";
import Helmet from "../../../ui-component/shared/Helmet";
import { Form } from "react-bootstrap";
import { useToastContext } from "../../../ui-component/toast/ToastContext";
import { REMOVE_ALL_AND_ADD } from "../../../ui-component/toast";
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import ToggleButton from 'react-bootstrap/ToggleButton';

type Props = {};

const CreateCategory = (props: Props) => {
  const [reviewImagesBlob, setReviewImagesBlob] = useState<File[]>([]);
  const { toastDispatch } = useToastContext();
  // const [checked, setChecked] = useState(false);
  // const [radioValue, setRadioValue] = useState('1');
  // const [startDate, setStartDate] = useState(new Date());
  // const radios = [
  //   { name: 'All Products', value: '1' },
  //   { name: 'Specific Category', value: '2' },
  //   { name: 'Specific Product', value: '3' },
  // ];
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
        <Helmet title="Create New Category" />
        <div className="card w-100">
          <div className="card-body ">
            <form>
              <Form.Group className="mb-4 width-all">
                <label htmlFor="CategoryName">Category Name</label>
                <Form.Control
                  type="text"
                  name="CategoryName"
                  className="form-control"
                  id="CategoryName"
                  placeholder="Category Name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-4 width-all">
                <label htmlFor="CategoryDesc">Category Description</label>
                <textarea
                  className="form-control text-area mr-2"
                  onChange={handleChange}
                  placeholder="Category Description"
                  style={{ width: "100%", resize: "vertical" }}
                  name="CategoryDesc"
                  id="CategoryDesc"
                />
              </Form.Group>

              <button className="btn btn-primary mr-1 mt-2">Create</button>
            </form>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default CreateCategory;

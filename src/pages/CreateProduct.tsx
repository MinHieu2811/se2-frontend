import React, { useState } from "react";
import Layout from "../ui-component/shared/Layout";
import Helmet from "../ui-component/shared/Helmet";
import { Form } from "react-bootstrap";
import { useToastContext } from "../ui-component/toast/ToastContext";
import { REMOVE_ALL_AND_ADD } from "../ui-component/toast";
import FilesUploader from "../ui-component/shared/UploadFiles";

type Props = {};

const CreateProduct = (props: Props) => {
  const [reviewImagesBlob, setReviewImagesBlob] = useState<File[]>([]);
  const { toastDispatch } = useToastContext();

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
        <Helmet title="Create New Product" />
        <div className="card mt-5">
          <div className="card-body">
            <form>
              <Form.Group className="mb-4">
                <label htmlFor="ProductName">Product Name</label>
                <Form.Control
                  type="text"
                  name="ProductName"
                  className="form-control"
                  id="ProductName"
                  placeholder="Product Name"
                  onChange={handleChange}
                />
              </Form.Group>
              {/* <Form.Group className="mb-4">
                <label htmlFor="ProductDesc">Product Description</label>
                <Form. 
              </Form.Group> */}
              <Form.Group className="mb-4">
                <label htmlFor="ProductPrice">Product Price</label>
                <Form.Control
                  type="text"
                  name="ProductPrice"
                  className="form-control"
                  id="ProductPrice"
                  placeholder="Product Price"
                  onChange={handleChange}
                />
              </Form.Group>
              <div className={`image-container`}>
                <div
                  className={`${
                    reviewImagesBlob?.length
                      ? "after-upload-boarder"
                      : "before-upload-boarder"
                  }`}
                >
                  <FilesUploader
                    className="img-wrapper"
                    multiple={true}
                    allowedTypes="image/*"
                    onFilesChanged={(f) => onImageChanged(f)}
                  />
                  {reviewImagesBlob?.length ? (
                    reviewImagesBlob?.map((image, key) => (
                      <img src={URL.createObjectURL(image)} key={key} alt="" />
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <button className="btn btn-primary mr-2">Submit</button>
            </form>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default CreateProduct;

import React, { useState } from "react";
import Layout from "../../../ui-component/shared/Layout";
import Helmet from "../../../ui-component/shared/Helmet";
import { Form } from "react-bootstrap";
import { useToastContext } from "../../../ui-component/toast/ToastContext";
import { REMOVE_ALL_AND_ADD } from "../../../ui-component/toast";
import FilesUploader from "../../../ui-component/shared/UploadFiles";
import { axiosInstance } from "../../../client-api";

const CreateProduct = () => {
  const [reviewImagesBlob, setReviewImagesBlob] = useState<Blob[]>([]);
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

          return;
        }

        setReviewImagesBlob(file);
      });
    }
  };

  const handleSubmitImage = async (e: any) => {
    try {
      e.preventDefault()
      const formData = new FormData()
      if (reviewImagesBlob.length > 0) {
        reviewImagesBlob?.forEach((image) => {
          formData.append("product", image)
        })
        const res = await axiosInstance
          .post("http://localhost:5000/api/uploads", formData, {
            headers: {
              'Content-Type': 'multipart/form-data; '
            }
          })
          .then((res) => res.data);
        console.log(res);
      } else {
        toastDispatch({
          type: REMOVE_ALL_AND_ADD,
          payload: {
            type: "is-danger",
            content: `Please upload your image`,
          },
        });
      }
    } catch (error: any) {
      toastDispatch({
        type: REMOVE_ALL_AND_ADD,
        payload: {
          type: "is-danger",
          content: error.msg,
        },
      });
    }
  };

  const handleChange = () => {};
  return (
    <Layout>
      <>
        <Helmet title="Create New Product" />
        <div className="card mt-5">
          <div className="card-body height-full">
            {/* <form>
              <Form.Group className="mb-4 width-all">
                <label htmlFor="ProductName" style={{ color: "white" }}>Product Name</label>
                <Form.Control
                  type="text"
                  name="ProductName"
                  className="form-control"
                  id="ProductName"
                  placeholder="Product Name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-4 width-all">
                <label htmlFor="ProductDesc" style={{ color: "white" }}>Product Description</label>
                <textarea className="form-control text-area mr-2" onChange={handleChange} placeholder="Product Description" style={{width: "100%", resize: "vertical"}} name="ProductDesc" id="ProductDesc" />
              </Form.Group>
              <Form.Group className="mb-4 width-all">
                <label htmlFor="ProductPrice" style={{ color: "white" }}>Product Price</label>
                <Form.Control
                  type="text"
                  name="ProductPrice"
                  className="form-control"
                  id="ProductPrice"
                  placeholder="Product Price"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-4 width-all">
                <label htmlFor="ProductQuantity" style={{ color: "white" }}>Product Quantity</label>
                <Form.Control type="number" placeholder="Product Quantity"/>
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
                    className="img-wrapper mb-4 width-all"
                    multiple={true}
                    allowedTypes="image/*"
                    onFilesChanged={(f) => onImageChanged(f)}
                  />
                  {reviewImagesBlob?.length ? (
                    reviewImagesBlob?.map((image, key) => (
                      <img className="preview-image" src={URL.createObjectURL(image)} key={key} alt="" />
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <button className="btn btn-primary mr-2 mt-4" style={{ fontSize: "20px", padding: "10px 15px"}}>Submit</button>
            </form> */}

            <div className={`image-container`}>
              <div
                className={`${
                  reviewImagesBlob?.length
                    ? "after-upload-boarder"
                    : "before-upload-boarder"
                }`}
              >
                <FilesUploader
                  className="img-wrapper mb-4 width-all"
                  multiple={true}
                  allowedTypes="image/*"
                  onFilesChanged={(f) => onImageChanged(f)}
                />
                {reviewImagesBlob?.length ? (
                  reviewImagesBlob?.map((image, key) => (
                    <img
                      className="preview-image"
                      src={URL.createObjectURL(image)}
                      key={key}
                      alt=""
                    />
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
            <button
              className="btn btn-primary mr-2 mt-4"
              style={{ fontSize: "20px", padding: "10px 15px" }}
              onClick={handleSubmitImage}
            >
              Submit
            </button>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default CreateProduct;

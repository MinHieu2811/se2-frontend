import React, { useState } from "react";
import { ProductModel } from "../../model/product";
import FilesUploader from "../shared/UploadFiles";
import { Form } from "react-bootstrap";
import { REMOVE_ALL_AND_ADD } from "../toast";
import { useToastContext } from "../toast/ToastContext";

type Props = {
  initialData?: ProductModel;
  handleSubmit: () => Promise<void>;
};

function ProductForm({ handleSubmit, initialData }: Props) {
  const [productInfo, setProductInfo] = useState<ProductModel>(
    initialData as ProductModel
  );
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

  const handleChange = (e: any) => {
    e.preventDefault();
    setProductInfo({
      ...productInfo,
      [e.target.name]: e.target.value,
    });
  };

  console.log(productInfo)
  return (
    <>
      {/* {!productInfo && <Loading />} */}
      <div className="card mt-5">
        <div className="card-body height-full">
          <form>
            <Form.Group className="mb-4 width-all">
              <label htmlFor="ProductName">Product Name</label>
              <Form.Control
                type="text"
                name="ProductName"
                className="form-control"
                id="ProductName"
                placeholder="Product Name"
                value={productInfo?.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-4 width-all">
              <label htmlFor="ProductDesc">Product Description</label>
              <textarea
                className="form-control text-area mr-2"
                onChange={handleChange}
                placeholder="Product Description"
                style={{ width: "100%", resize: "vertical" }}
                name="ProductDesc"
                value={productInfo?.description}
                id="ProductDesc"
              />
            </Form.Group>
            <Form.Group className="mb-4 width-all">
              <label htmlFor="ProductPrice">Product Price</label>
              <Form.Control
                type="text"
                name="ProductPrice"
                className="form-control"
                id="ProductPrice"
                placeholder="Product Price"
                value={productInfo?.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-4 width-all">
              <label htmlFor="ProductQuantity">Product Quantity</label>
              <Form.Control
                type="number"
                name="ProductQuantity"
                className="form-control"
                id="ProductQuantity"
                placeholder="Product Quantity"
                value={productInfo?.amount}
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
            <button className="btn btn-primary mr-2 mt-4">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProductForm;

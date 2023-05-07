import React, { useState } from "react";
import Layout from "../../../ui-component/shared/Layout";
import Helmet from "../../../ui-component/shared/Helmet";
import { Form } from "react-bootstrap";
import { useToastContext } from "../../../ui-component/toast/ToastContext";
import { REMOVE_ALL_AND_ADD } from "../../../ui-component/toast";
import FilesUploader from "../../../ui-component/shared/UploadFiles";
import { axiosImageInstance, axiosInstance } from "../../../client-api";
import { DetailedObject } from "../../../model/utils";

interface ProductModel extends DetailedObject<string | number | string[]> {
  name: string;
  description: string;
  price: number;
  brand: string;
  amount: number;
  images: string[];
}

const initialStates: ProductModel = {
  name: "",
  description: "",
  brand: "",
  price: 0,
  amount: 0,
  images: [],
};

const CreateProduct = () => {
  const [reviewImagesBlob, setReviewImagesBlob] = useState<Blob | null>();
  const { toastDispatch } = useToastContext();
  const [productInfo, setProductInfo] = useState<ProductModel>(initialStates);

  const onImageChanged = (file: File) => {
    if (file) {
      const arrayCheck = [".jpg", ".jpeg", ".png", "tiff", "webp", "gif"];
      // let images: string[] = [];
      const nameFile = file?.name;
      // images = [...images, `/images/products/${nameFile}`];
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
    }
  };

  const handleSubmitImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", reviewImagesBlob as Blob);
      formData.append("upload_preset", "eyf8dpkh");
      if (reviewImagesBlob) {
        const res = await axiosImageInstance
          .post(
            "https://api.cloudinary.com/v1_1/dp9xqwrsz/image/upload",
            formData
          )
          .then((res) => res);

          return res
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

  const handlePostInfo = async (images: string[]) => {
    try {
      productInfo.images = images;
      let checked: boolean = true;
      Object.keys(productInfo).forEach((item: string) => {
        if (
          productInfo[item] === "" ||
          productInfo[item] === 0 ||
          productInfo["images"]?.length === 0
        ) {
          toastDispatch({
            type: REMOVE_ALL_AND_ADD,
            payload: {
              type: "is-danger",
              content: `Check the field ${item} !!!`,
            },
          });
          checked = false;
          return;
        } else {
          checked = true;
        }
      });
      return (
        checked &&
        (await axiosInstance
          .post("https://se2-ecommerce.herokuapp.com/product", productInfo)
          .then((res) => res?.data))
      );
    } catch (err: any) {
      toastDispatch({
        type: REMOVE_ALL_AND_ADD,
        payload: {
          type: "is-danger",
          content: err.msg,
        },
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // await Promise.allSettled([handleSubmitImage(), handlePostInfo()])
    //   .then(([resultPostInfo, resultSubmitImage]) => {
    //     if (
    //       resultPostInfo?.status === "fulfilled" &&
    //       resultSubmitImage?.status === "fulfilled"
    //     ) {
    //       toastDispatch({
    //         type: REMOVE_ALL_AND_ADD,
    //         payload: {
    //           type: "is-success",
    //           content: "Created successfully",
    //         },
    //       });
    //       setProductInfo(initialStates);
    //       setReviewImagesBlob(null);
    //     }
    //   })
    //   .catch((err) => {
    //     toastDispatch({
    //       type: REMOVE_ALL_AND_ADD,
    //       payload: {
    //         type: "is-danger",
    //         content: err.msg,
    //       },
    //     });
    //   });

    await handleSubmitImage().then((res: any) => {
      setTimeout(async () => {
        debugger
        await handlePostInfo([res?.data?.secure_url]).then(() => {
          setProductInfo(initialStates);
          setReviewImagesBlob(null);
        }).catch((err) => {
          toastDispatch({
            type: REMOVE_ALL_AND_ADD,
            payload: {
              type: "is-danger",
              content: "Something went wrong!",
            },
          });
        });
      }, 2000);
    });
  };

  // await handleSubmitImage()
  //   .then(async (res) => {
  //     // res?.data?.success && handleSubmitImage()
  //     console.log('run');
  //     await handlePostInfo();
  //   })
  //   .then(() => {
  //     // toastDispatch({
  //     //   type: REMOVE_ALL_AND_ADD,
  //     //   payload: {
  //     //     type: "is-success",
  //     //     content: "Created successfully",
  //     //   },
  //     // });
  //     setProductInfo(initialStates);
  //     setReviewImagesBlob([]);
  //   })
  //   .catch((err) => {
  //     toastDispatch({
  //       type: REMOVE_ALL_AND_ADD,
  //       payload: {
  //         type: "is-danger",
  //         content: err.msg,
  //       },
  //     });
  //   });

  const handleChange = (e: any) => {
    e.preventDefault();
    setProductInfo({
      ...productInfo,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Layout>
      <>
        <Helmet title="Create New Product" />
        <div className="card mt-5">
          <div className="card-body height-full">
            {/* <form> */}
            <Form.Group className="mb-4 width-all">
              <label htmlFor="ProductName" style={{ color: "white" }}>
                Product Name
              </label>
              <Form.Control
                type="text"
                name="name"
                className="form-control"
                id="ProductName"
                placeholder="Product Name"
                onChange={handleChange}
                value={productInfo?.name}
              />
            </Form.Group>
            <Form.Group className="mb-4 width-all">
              <label htmlFor="ProductDesc" style={{ color: "white" }}>
                Product Description
              </label>
              <textarea
                className="form-control text-area mr-2"
                onChange={handleChange}
                placeholder="Product Description"
                style={{ width: "100%", resize: "vertical" }}
                name="description"
                id="ProductDesc"
                value={productInfo?.description}
              />
            </Form.Group>
            <Form.Group className="mb-4 width-all">
              <label htmlFor="ProductPrice" style={{ color: "white" }}>
                Product Price
              </label>
              <Form.Control
                type="number"
                name="price"
                className="form-control"
                id="ProductPrice"
                autoComplete="0"
                placeholder="Product Price"
                onChange={handleChange}
                value={productInfo?.price}
              />
            </Form.Group>
            <Form.Group className="mb-4 width-all">
              <label htmlFor="ProductBrand" style={{ color: "white" }}>
                Product Brand
              </label>
              <Form.Control
                type="text"
                name="brand"
                className="form-control"
                id="ProductBrand"
                autoComplete="0"
                placeholder="Product Brand"
                onChange={handleChange}
                value={productInfo?.brand}
              />
            </Form.Group>
            <Form.Group className="mb-4 width-all">
              <label htmlFor="ProductQuantity" style={{ color: "white" }}>
                Product Quantity
              </label>
              <Form.Control
                type="number"
                autoComplete="0"
                placeholder="Product Quantity"
                name="amount"
                value={productInfo?.quantity}
                onChange={handleChange}
              />
            </Form.Group>
            <div className={`image-container`}>
              <div
                className={`${
                  reviewImagesBlob
                    ? "after-upload-boarder"
                    : "before-upload-boarder"
                }`}
              >
                <FilesUploader
                  className="img-wrapper mb-4 width-all"
                  allowedTypes="image/*"
                  onFilesChanged={(f) => onImageChanged(f)}
                  multiple={false}
                />
                {reviewImagesBlob ? (
                  <img
                    className="preview-image"
                    src={URL.createObjectURL(reviewImagesBlob)}
                    alt=""
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="btn btn-primary mr-2 mt-4"
              style={{ fontSize: "20px", padding: "10px 15px" }}
            >
              Submit
            </button>
            {/* </form> */}

            {/* <div className={`image-container`}>
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
            </div> */}
            {/* <button
              className="btn btn-primary mr-2 mt-4"
              style={{ fontSize: "20px", padding: "10px 15px" }}
              onClick={handleSubmitImage}
            >
              Submit
            </button> */}
          </div>
        </div>
      </>
    </Layout>
  );
};

export default CreateProduct;

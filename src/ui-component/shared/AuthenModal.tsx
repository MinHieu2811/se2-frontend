import { useCallback, useState } from "react";
import Heading from "./Heading";
import Input from "./Input";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../../client-api";
import { useToastContext } from "../toast/ToastContext";
import { REMOVE_ALL_AND_ADD } from "../toast";
import { useToggleAuthModal } from "../../context/AuthModalProvider";

interface UserInfo {
  email: string;
  password: string;
  confirmPass?: string;
}

const AuthenModal = () => {
  const { isOpen, setOpenModal, typeModal } = useToggleAuthModal();
  const [loading, setLoading] = useState<boolean>(false);
  const { toastDispatch } = useToastContext();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    password: "",
    confirmPass: "",
  });

  const handleChange = (e: any) => {
    e.preventDefault();
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      confirmPass: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (
      typeModal === "REGISTER" &&
      data?.confirmPass &&
      data?.confirmPass !== data?.password
    ) {
      toastDispatch({
        type: REMOVE_ALL_AND_ADD,
        payload: {
          type: "is-danger",
          content: `Check your password!`,
        },
      });
      setOpenModal?.();
      return;
    }

    delete data.confirmPass;

    setLoading(true);

    await axiosInstance
      .post(
        typeModal === "REGISTER" ? "/customer/register" : "/customer/login",
        data
      )
      .then(() => {
        setOpenModal?.();
      })
      .catch((err) => {
        toastDispatch({
          type: REMOVE_ALL_AND_ADD,
          payload: {
            type: "is-danger",
            content: `Something went wrong! ${err.toString()}`,
          },
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loginFooter = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>First time using SolStore?</div>
          <div className="text-neutral-800 cursor-pointer hover:underline">
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  const registerFooter = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already have an account?</div>
          <div className="text-neutral-800 cursor-pointer hover:underline">
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  console.log(userInfo);

  const loginContent = (
    <div className="input-wrap">
      <Heading title="Welcome back" subtitle="Login to your account" />
      <Input
        id="email"
        label="Email"
        disabled={loading}
        register={register}
        errors={errors}
        required
        onChange={handleChange}
        value={userInfo?.email}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={loading}
        register={register}
        errors={errors}
        required
        onChange={handleChange}
        value={userInfo?.password}
      />
    </div>
  );

  const registerContent = (
    <div className="input-wrap">
      <Heading title="Welcome to SolStore" subtitle="Create an account" />
      <Input
        id="email"
        label="Email"
        disabled={loading}
        register={register}
        errors={errors}
        required
        onChange={handleChange}
        value={userInfo?.email}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={loading}
        register={register}
        errors={errors}
        required
        onChange={handleChange}
        value={userInfo?.password}
      />
      <Input
        id="confirmPass"
        label="Confirm Password"
        type="password"
        disabled={loading}
        register={register}
        errors={errors}
        required
        onChange={handleChange}
        value={userInfo?.confirmPass || ""}
      />
    </div>
  );

  const toggleModal = useCallback(() => {
    setOpenModal?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setOpenModal, isOpen]);

  return (
    <Modal
      disabled={loading}
      isOpen={isOpen}
      title={typeModal}
      actionLabel="Submit"
      onClose={toggleModal}
      onSubmit={handleSubmit(onSubmit)}
      body={typeModal === "LOGIN" ? loginContent : registerContent}
      footer={typeModal === "LOGIN" ? loginFooter : registerFooter}
    />
  );
};

export default AuthenModal;

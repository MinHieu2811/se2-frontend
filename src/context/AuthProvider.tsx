import React, { useEffect, useState, useCallback } from "react";
import { AuthProps, UserModel } from "../model/user";
import { axiosInstance } from "../client-api";

type Props = {
  children: JSX.Element;
};

interface ValueContext {
  userProfile?: UserModel;
  token: string | null;
  onLogin?: (data: AuthProps) => any;
  onRegister?: (data: AuthProps) => any;
  onLogout?: () => void;
  admin?: boolean
}

const AuthContext = React.createContext<ValueContext>({ token: "" });

const initialState = {
  name: "",
  phone: "",
  avatar: "",
  age: 0,
  address: "",
  email: "",
};

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserModel | undefined>();
  const [admin, setAdmin] = useState(false)

  const handleLogin = useCallback(async (data: AuthProps) => {
    if (data?.email === "superadmin@gmail.com" && data?.password === "1234") {
      localStorage?.setItem("isAdmin", JSON.stringify(true));
      setAdmin(true)
    }

    const res = await axiosInstance.post("/customer/login", data);
    setToken(res?.data?.data?.id);
    setUserProfile({
      name: res?.data?.data?.customerProfile?.name,
      phone: res?.data?.data?.customerProfile?.phone,
      avatar: res?.data?.data?.customerProfile?.avatar,
      age: res?.data?.data?.customerProfile?.age,
      address: res?.data?.data?.customerProfile?.address,
      email: res?.data?.data?.email,
    });

    return res;
  }, [])

  const handleRegister = async (data: AuthProps) => {
    if (data?.email === "superadmin@gmail.com" && data?.password === "1234") {
      localStorage?.setItem("isAdmin", JSON.stringify(true));
      setAdmin(true)
    }
    const res = await axiosInstance
      .post("/customer/register", data)
      .then((res) => res.data);
    setToken(res?.data?.id);
    setUserProfile({
      name: res?.data?.customerProfile?.name,
      phone: res?.data?.customerProfile?.phone,
      avatar: res?.data?.customerProfile?.avatar,
      age: res?.data?.customerProfile?.age,
      address: res?.data?.customerProfile?.address,
      email: res?.data?.email,
    });

    return res;
  };

  const handleLogout = () => {
    if (localStorage.getItem("access_token")) {
      localStorage.setItem("access_token", "");
      localStorage.setItem("profile", "");
      localStorage.setItem("isAdmin", "");
      setToken("");
      window.location.href = "/";
      // window.location.replace("/")
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setToken(localStorage.getItem("access_token") || "");
    } else {
      localStorage.setItem("access_token", token || "");
    }
  }, [token]);

  useEffect(() => {
    if (localStorage.getItem("profile")) {
      setUserProfile(
        JSON.parse(
          localStorage.getItem("profile") || JSON.stringify(initialState)
        )
      );
    } else {
      localStorage.setItem("profile", JSON.stringify(userProfile) || "");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userProfile?.name,
    userProfile?.address,
    userProfile?.age,
    userProfile?.email,
    userProfile?.name,
    userProfile?.phone,
  ]);

  const value: ValueContext = {
    userProfile,
    token: token,
    onLogin: handleLogin,
    onRegister: handleRegister,
    onLogout: handleLogout,
    admin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};

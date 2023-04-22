import React, { useState } from "react"
import { AuthProps, UserModel } from '../model/user';
import { axiosInstance } from "../client-api";

type Props = {
    children: JSX.Element
}

interface ValueContext {
    userProfile?: UserModel
    token: string | null
    onLogin?: (data: AuthProps) => any
    onRegister?: (data: AuthProps) => any
    onLogout?: () => void
}

const AuthContext = React.createContext<ValueContext>({token: ''})

export const AuthProvider = ({children}: Props) => {
    const [token, setToken] = useState<string | null>(null)
    const [userProfile, setUserProfile] = useState<UserModel | undefined>()

    const handleLogin = async (data: AuthProps) => {
        const res = await axiosInstance.post("/customer/login", data)
        setToken(res?.data?.data?.id)
        setUserProfile({
            name: res?.data?.data?.customerProfile?.name,
            phone: res?.data?.data?.customerProfile?.phone,
            avatar: res?.data?.data?.customerProfile?.avatar,
            age: res?.data?.data?.customerProfile?.age,
            address: res?.data?.data?.customerProfile?.address,
            email: res?.data?.data?.email
        })

        return res
    }

    const handleRegister = async (data: AuthProps) => {
        const res = await axiosInstance.post("/customer/register", data).then((res) => res.data)
        setToken(res?.data?.id)
        setUserProfile({
            name: res?.data?.customerProfile?.name,
            phone: res?.data?.customerProfile?.phone,
            avatar: res?.data?.customerProfile?.avatar,
            age: res?.data?.customerProfile?.age,
            address: res?.data?.customerProfile?.address,
            email: res?.data?.email
        })

        return res
    }

    const handleLogout = () => {
        if(localStorage.getItem("access_token")) {
            localStorage.setItem("access_token", "")
            setToken("")
            window.location.href = "/"
            // window.location.replace("/")
        }
    }

    const value: ValueContext = {
        userProfile,
        token: token,
        onLogin: handleLogin,
        onRegister: handleRegister,
        onLogout: handleLogout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return React.useContext(AuthContext)
}
import React, { useState } from "react"
import { UserLogin, UserRegister } from '../model/user';

type Props = {
    children: JSX.Element
}

interface ValueContext {
    token: string | null
    onLogin?: ({email, password}: UserLogin) => void
    onRegister?: ({username, email, password}: UserRegister) => void
    onLogout?: () => void 
}

const AuthContext = React.createContext<ValueContext>({token: ''})

export const AuthProvider = ({children}: Props) => {
    const [token, setToken] = useState<string | null>(null)
    const handleLogin = async ({email, password}: UserLogin) => {
    }

    const handleRegister = async ({email, password, username}: UserRegister) => {
    }

    const handleLogout = () => {

    }

    const value: ValueContext = {
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
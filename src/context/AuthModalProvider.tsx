import React, { useCallback, useState } from "react";

type Props = {
    children: JSX.Element
}

interface ValueContext {
    isOpen: boolean
    setOpenModal?: (typeModal?: AuthenType) => void
    typeModal: AuthenType
}

export type AuthenType = "REGISTER" | "LOGIN" | ""

const AuthModalContext = React.createContext<ValueContext>({isOpen: false, typeModal: "LOGIN"})

export const AuthenModalProvider = ({children}: Props) => {

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [typeModal, setTypeModal] = useState<AuthenType>("")

    const handleToggleAuth = useCallback((typeModal?: AuthenType) => {
        setIsOpenModal((prev) => !prev)
        setTypeModal(typeModal || "")
    }, [])

    const value: ValueContext = {
        isOpen: isOpenModal,
        setOpenModal: handleToggleAuth,
        typeModal: typeModal
    }

    return (
        <AuthModalContext.Provider value={value}>
            {children}
        </AuthModalContext.Provider>
    )
}

export const useToggleAuthModal = () => {
    return React.useContext(AuthModalContext)
}
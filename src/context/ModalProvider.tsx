import React, { useState } from "react";

type Props = {
    children: JSX.Element
}

interface ValueContext {
    isOpen: boolean
    setOpen?: () => void
}

const ModalContext = React.createContext<ValueContext>({isOpen: false})

export const ModalProvider = ({children}: Props) => {

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    const handleToggleCart = () => {
        setIsOpenModal((prev) => !prev)
    }

    const value: ValueContext = {
        isOpen: isOpenModal,
        setOpen: handleToggleCart
    }

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )
}

export const useToggleModal = () => {
    return React.useContext(ModalContext)
}
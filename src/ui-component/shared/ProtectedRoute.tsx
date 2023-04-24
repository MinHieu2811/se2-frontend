import { Navigate } from "react-router-dom";
import { useAuth } from '../../context/AuthProvider';
import React from "react";
import { useToastContext } from "../toast/ToastContext";
import { REMOVE_ALL_AND_ADD } from "../toast";

type Props = {
    children: JSX.Element
}

const ProtectedRoute = ({children}: Props) => {
    const { token } = useAuth()
    const { toastDispatch } = useToastContext()

    if(!token) {
        toastDispatch({
            type: REMOVE_ALL_AND_ADD,
            payload: {
                type: "is-danger",
                content: "Please sign up or sign in first"
            }
        })
        return <Navigate to="/" replace />
    }

    // if(token) {
    //     return <Navigate to="/login" replace />
    // }

    return children;
}

export default ProtectedRoute
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Routes, useLocation } from "react-router-dom";

type Props = {
    children: JSX.Element
}

const CustomRoute = ({ children }: Props) => {
    const [, setProgress] = useState(false);
    const [prevLocation, setPrevLocation] = useState("");
    const location = useLocation();

    useEffect(() => {
        setPrevLocation(location.pathname);

        if(prevLocation === location.pathname){
            setPrevLocation("")
        }
    }, [location])

    useEffect(() => {
        setProgress(true)
    }, [prevLocation])

    return(
        <div className="custom-route" style={{ minHeight: '80vh'}}>
            <Routes location={location} key={location.pathname}>{children}</Routes>
        </div>
    );
}

export default CustomRoute;
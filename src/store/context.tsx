import React, { createContext, useEffect, useState } from "react";
import { getData } from "../api";
import { Spinner } from "../components/spinner/Spinner";
import { IInitialState } from "../constants/interfaces";

const initialState: IInitialState = { regions: [], loading: true };

export const RegionContext = createContext(initialState);

export const RegionProvider = (props: {
    children:
        | boolean
        | React.ReactChild
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined;
}) => {
    const [data, setData] = useState<IInitialState>(initialState);
    useEffect(() => {
        if (data.loading) {
            getData()
                .then((res) => {
                    setData({ regions: [...res], loading: false });
                })
                .catch((er) => {
                    console.error(er);
                });
        }
    }, [data.loading]);

    return (
        <RegionContext.Provider value={data}>
            {data.loading ? <Spinner /> : props.children}
        </RegionContext.Provider>
    );
};

import { IconContext } from "react-icons";

export function SortIconColour({ children }) {

    return (
        <>
            <IconContext.Provider value={{ color: "#343951" }}>
                {children}
            </IconContext.Provider>
        </>
    );
}

export function IconColour({ children }) {

    return (
        <>
            <IconContext.Provider value={{ color: "#34B96F", size: '0.8em' }}>
                {children}
            </IconContext.Provider>
        </>
    );
}

export function SearchIconColour({ children }) {

    return (
        <>
            <IconContext.Provider value={{ color: "#DAE0E4" }}>
                {children}
            </IconContext.Provider>
        </>
    );
}
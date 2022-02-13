import { IconContext } from "react-icons";

export function IconColour({ children }) {

    return (
        <>
            <IconContext.Provider value={{ color: "#34B96F" }}>
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
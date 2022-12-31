import React, { useState } from "react";

export const MyContext = React.createContext();

const MyContextProvider = ({children})=> {
    const [searchText, setSearchText] = useState();

    return (
        <MyContext.Provider value={{searchText, setSearchText}}>
            {children}
        </MyContext.Provider>
    );
}

export default MyContextProvider;
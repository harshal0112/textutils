import React, { useState } from "react";

export const MyContext = React.createContext();

const MyContextProvider = ({ children }) => {
  const [searchText, setSearchText] = useState();
  const [mainText, setMainText] = useState();
  const [textFoundCount, setTextFoundCount] = useState();

  return (
    <MyContext.Provider
      value={{
        searchText,
        setSearchText,
        mainText,
        setMainText,
        textFoundCount,
        setTextFoundCount,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;

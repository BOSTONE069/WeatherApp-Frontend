import React from "react";
import { useCookies } from "react-cookie";

const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  //Used to set UserData(username and token) to cookies
  const setSession = (userData) => {
    setCookie("userData", userData, {
      path: "/",
      maxAge: 900, //15 minutes
    });
  };

  const getSession = () => {
    const userData = cookies.userData || null;
    return userData;
  };

  const logout = () => {
    removeCookie("userData", { path: "/" });
  };

  return (
    <AppContext.Provider
      value={{
        setSession,
        getSession,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export {AppContext};

export default AppContextProvider;

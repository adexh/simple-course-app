import { createContext, useContext, useState} from "react";

export const SessionContext = createContext();
export const useSessionContext = ()=> useContext(SessionContext);

export const SessionContextProvider = ({children})=>{
  const [isAuthenticated, setAuthenticated] = useState(false);
  return <SessionContext.Provider value={{isAuthenticated,setAuthenticated}}>
      {children}
    </SessionContext.Provider>
}
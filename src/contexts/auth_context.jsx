import { createContext, useContext, useState} from "react";

const SessionContext = createContext();
const useSessionContext = ()=> useContext(SessionContext);

const SessionContextProvider = ({children})=>{
  const [isAuthenticated, setAuthenticated] = useState({});
  return <SessionContext.Provider value={{isAuthenticated,setAuthenticated}}>
      {children}
    </SessionContext.Provider>
}
export {  SessionContext, useSessionContext, SessionContextProvider}
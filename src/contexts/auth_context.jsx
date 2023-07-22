import { createContext, useContext, useState} from "react";

const SessionContext = createContext(false);
const useSessionContext = () => useContext(SessionContext);

const SessionContextProvider = ({children})=>{
  const [isAuthenticated, setAuthenticated] = useState(false);

  return <SessionContext.Provider value={{isAuthenticated,setAuthenticated}}>
          {children}
        </SessionContext.Provider>
}

export {  SessionContext, useSessionContext, SessionContextProvider}
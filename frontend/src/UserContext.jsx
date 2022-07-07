import React, {createContext, useState, useEffect} from 'react';
import useLocalStorage from './useLocalStorage';


const UserContext = createContext();

const ContextProvider = ({children}) => {

    const [uname, setUname] = useLocalStorage('null');
    const [accesstok, setAccesstok] = useLocalStorage('Logged Out');

    useEffect(() => {
        
    }, []);
    
   
    return(
        <UserContext.Provider value={{ uname,accesstok,setUname,setAccesstok }}>
            {children}
        </UserContext.Provider>
    )
}

export {ContextProvider,UserContext};
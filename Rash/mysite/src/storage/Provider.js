import React from 'react';
import Context from './Context';
import useStorage from '../utils/useStorage'

const StoreProvider = ({ children }) => {
  const [token, setToken] = useStorage('token');
  const [ID, setID] = useStorage('ID');


  return (
    <Context.Provider
      value={{
        token,
        setToken,
        ID,
        setID,
      }}
    >
      {children}
    </Context.Provider>
  )
}


export default StoreProvider;
import { createContext } from 'react';

const StoreContext = createContext({
  token: null,
  setToken: () => {},
  ID: null,
  setID: () => {}
});

export default StoreContext;
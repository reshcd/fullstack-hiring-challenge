import React, { useContext } from 'react'
import {Route, Redirect} from 'react-router-dom'
import StoreContext from '../storage/Context'

const RoutesPrivate = ({ component: Component, ...rest}) => {
    const { token,id } = useContext(StoreContext);
  
    return (
      <Route
        {...rest}
        render={() => token=="123"
          ? <Component {...rest} />
          : <Redirect to="/" />
        }
      />
    )
  }
  
  export default RoutesPrivate;
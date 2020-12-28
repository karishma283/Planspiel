//Taleh Muzaffarov 
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import lscache from 'lscache'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            lscache.get("usertoken")
                ? <Component {...props} />
                : <Redirect to="/login" />
        )}
    />
);

export default PrivateRoute;
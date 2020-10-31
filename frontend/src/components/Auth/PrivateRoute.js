import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, my, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated === true ? my === true ? <Component key="my" {...props} /> :
                <Component key={Math.random()} {...props} />
                : (
                    <Redirect to="/login" />
                )
        }
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(mapStateToProps)(PrivateRoute);

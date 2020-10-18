import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "antd";

class Landing extends Component {

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/home");
        }
    }
    render() {
        return (
            <div style={{ height: "100vh" }}>

                <div style={{ marginTop: "40vh", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>

                    <p>WELCOME</p>
                    <div style={{ display: "flex" }}>
                        <Button type="primary">LOGIN</Button>
                        <Button>REGISTER</Button>
                    </div>

                </div>


            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(mapStateToProps)(Landing)

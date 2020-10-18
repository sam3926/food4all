import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "./action";
import { bindActionCreators } from "redux";
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/home");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onSubmit = values => {

        this.props.registerUser(values, this.props.history);
    };

    render() {
        const { errors } = this.state;

        // return (
        //     <div className="container">
        //         <div className="row">
        //             <div className="col s8 offset-s2">
        //                 <Link to="/" className="btn-flat waves-effect">
        //                     <i className="material-icons left">keyboard_backspace</i> Back to
        //       home
        //     </Link>
        //                 <div className="col s12" style={{ paddingLeft: "11.250px" }}>
        //                     <h4>
        //                         <b>Register</b> below
        //       </h4>
        //                     <p className="grey-text text-darken-1">
        //                         Already have an account? <Link to="/login">Log in</Link>
        //                     </p>
        //                 </div>
        //                 <form noValidate onSubmit={this.onSubmit}>
        //                     <div className="input-field col s12">
        //                         <input
        //                             onChange={this.onChange}
        //                             value={this.state.name}
        //                             error={errors.name}
        //                             id="name"
        //                             type="text"
        //                             className={classnames("", {
        //                                 invalid: errors.name
        //                             })}
        //                         />
        //                         <label htmlFor="name">Name</label>
        //                         <span className="red-text">{errors.name}</span>
        //                     </div>

        //                     <div className="input-field col s12">
        //                         <input
        //                             onChange={this.onChange}
        //                             value={this.state.contact}
        //                             error={errors.contact}
        //                             id="contact"
        //                             type="text"
        //                             className={classnames("", {
        //                                 invalid: errors.name
        //                             })}
        //                         />
        //                         <label htmlFor="contact">Contact Number</label>
        //                         <span className="red-text">{errors.contact}</span>
        //                     </div>

        //                     <div className="input-field col s12">
        //                         <input
        //                             onChange={this.onChange}
        //                             value={this.state.email}
        //                             error={errors.email}
        //                             id="email"
        //                             type="email"
        //                             className={classnames("", {
        //                                 invalid: errors.email
        //                             })}
        //                         />
        //                         <label htmlFor="email">Email</label>
        //                         <span className="red-text">{errors.email}</span>
        //                     </div>
        //                     <div className="input-field col s12">
        //                         <input
        //                             onChange={this.onChange}
        //                             value={this.state.password}
        //                             error={errors.password}
        //                             id="password"
        //                             type="password"
        //                             className={classnames("", {
        //                                 invalid: errors.password
        //                             })}
        //                         />
        //                         <label htmlFor="password">Password</label>
        //                         <span className="red-text">{errors.password}</span>
        //                     </div>
        //                     <div className="input-field col s12">
        //                         <input
        //                             onChange={this.onChange}
        //                             value={this.state.password2}
        //                             error={errors.password2}
        //                             id="password2"
        //                             type="password"
        //                             className={classnames("", {
        //                                 invalid: errors.password2
        //                             })}
        //                         />
        //                         <label htmlFor="password2">Confirm Password</label>
        //                         <span className="red-text">{errors.password2}</span>
        //                     </div>
        //                     <div className="col s12" style={{ paddingLeft: "11.250px" }}>
        //                         <button
        //                             style={{
        //                                 width: "150px",
        //                                 borderRadius: "3px",
        //                                 letterSpacing: "1.5px",
        //                                 marginTop: "1rem"
        //                             }}
        //                             type="submit"
        //                             className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        //                         >
        //                             Sign up
        //         </button>
        //                     </div>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // );


        return (
            <div style={{ paddingTop: "150px", height: "100vh", display: "flex", justifyContent: "center" }}>
                <Form
                    layout="vertical"
                    style={{
                        width: "500px"
                    }}
                    onFinish={this.onSubmit}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} />

                    </Form.Item>

                    <Form.Item
                        label="Contact"
                        name="contact"
                        rules={[{ required: true, message: 'Please input your contact!' }]}
                    >
                        <Input prefix={<PhoneOutlined className="site-form-item-icon" />} />

                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        }, { required: true, message: 'Please input your email!' }]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} />

                    </Form.Item>


                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password"
                        name="password2"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                        {" "}Or <Link to="/login">Login now!</Link>
                    </Form.Item>
                </Form>
            </div>
        )

    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.authReducer,
    errors: state.authReducer.errors
});

const mapDispatchToProps = dispatch => ({
    registerUser: bindActionCreators(registerUser, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Register));

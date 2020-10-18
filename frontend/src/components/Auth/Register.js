import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "./action";
import { bindActionCreators } from "redux";
import { Form, Input, Button, notification } from 'antd';
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

    openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: message
        });
    };
    onSubmit = values => {
        console.log(values)
        if (values.password != values.password2)
            this.openNotificationWithIcon('warning', 'Passwords are not matching')
        else
            this.props.registerUser(values, this.props.history);
    };

    render() {
        const { errors } = this.state;

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

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "./action";
import { bindActionCreators } from "redux";
import { Form, Input, Button, notification, Upload, message, Radio } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined, UploadOutlined, CompassOutlined } from '@ant-design/icons';
import MapComp from "../MapComp";
import axios from "axios"
import Modal from "antd/lib/modal/Modal";

// import 

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};


class Register extends Component {
    constructor() {
        super();
        this.state = {
            errors: {},
            value: 1,
            mapOpen: false,
            latlng: null,
            certificates: [],
            loading: false
        };
    }

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

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
    onSubmit = async values => {
        console.log(values)
        if (values.password != values.password2)
            this.openNotificationWithIcon('warning', 'Passwords are not matching')
        else if (!this.state.latlng)
            this.openNotificationWithIcon('warning', 'Please enter your location')
        else if (values.userType == "organisation" && this.state.certificates.length == 0) {
            this.openNotificationWithIcon('warning', 'Please upload the certificates')
        }
        else {
            console.log("everythhing okay", { ...values, location: this.state.latlng })
            console.log(this.state.certificates, values.userType)
            this.setState({
                loading: true
            })
            await this.props.registerUser({ ...values, certificates: this.state.certificates, location: { type: "Point", coordinates: [this.state.latlng.lng, this.state.latlng.lat] } }, this.props.history);
            this.setState({
                loading: false
            })
        }

    };

    saveLatLng = (latlng) => {
        this.setState({
            latlng: latlng
        })
    }

    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        const { errors, value } = this.state;

        return (
            <div style={{ paddingTop: "20px", height: "100vh", display: "flex", justifyContent: "center" }}>
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
                    <Input placeholder="Location" disabled value={this.state.latlng ? this.state.latlng.lat + " , " + this.state.latlng.lng : ""} style={{ width: 300, marginBottom: "10px" }} />

                    <Button onClick={() => this.setState({ mapOpen: true })} icon={<CompassOutlined />} /> <br />
                    <Form.Item
                        label="Contact"
                        name="contact"

                        rules={[{ required: true, message: 'Please input your contact!' }]}
                    >
                        <Input prefix={<PhoneOutlined className="site-form-item-icon" />} />

                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"

                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input.TextArea />

                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"

                        rules={[{ required: true, message: 'Please input a brief description!' }]}
                    >
                        <Input.TextArea />

                    </Form.Item>

                    <Form.Item
                        label="Choose User type"
                        name="userType"

                        rules={[{ required: true, message: 'Please Choose user type' }]}
                    >
                        <Radio.Group onChange={this.onChange} value={value}>
                            <Radio style={radioStyle} value={"donor"}>
                                Donor
                            </Radio>
                            <Radio style={radioStyle} value={"organisation"}>
                                Organisation
                            <br />
                                {value === "organisation"
                                    ? <div style={{ marginLeft: 25 }}>

                                        <Upload multiple={false} name="file" accept="application/pdf"
                                            customRequest={async ({ file, onSuccess, onError }) => {
                                                let formData = new FormData()
                                                formData.append('file', file)
                                                await axios.post('/upload/certificates', formData).then(res => {
                                                    this.setState({ certificates: [...this.state.certificates, res.data.location] })
                                                    onSuccess(res.data)
                                                }).catch(err => {
                                                    console.log("error in uploading");
                                                    onError("Error in uploading. Try again")
                                                }
                                                )
                                            }}

                                            onRemove={(file) => {
                                                let removedLocation = file.response.location;
                                                let newCertificates = this.state.certificates.filter(certificate => certificate != removedLocation)
                                                this.setState({ certificates: newCertificates })
                                            }}

                                        >
                                            <p>Please upload Government issued certificate for your Organisation(in pdf format)</p>
                                            <Button icon={<UploadOutlined />}>Upload certificates</Button>
                                        </Upload>
                                    </div>
                                    : null}
                            </Radio>
                        </Radio.Group>

                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                        {" "}Or <Link to="/login">Login now!</Link>
                    </Form.Item>
                </Form>
                <Modal footer={[
                    <Button onClick={() => this.setState({ mapOpen: false })}>
                        Return
            </Button>
                ]} centered closable={false} width={"90vw"} visible={this.state.mapOpen}>
                    <MapComp saveLatLng={this.saveLatLng} />
                </Modal>


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

import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import 'antd/dist/antd.css';
import { Button, Modal, Form, Input, Radio } from 'antd';
import { UserOutlined , PhoneOutlined , MailOutlined , LockOutlined } from '@ant-design/icons';

class EditProfile extends React.Component {
  render() {
    const {data} = this.props
    //const Uname = data.name;
    return (
      <>
            <Modal
                visible={this.props.visible}
                title="Edit Profile"
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel}
                footer={[
                  <Button key="back" onClick={this.props.handleCancel}>
                    Return
                  </Button>,
                  <Button key="submit" type="primary" loading={this.props.loading} onClick={this.props.handleOk}>
                    Submit
                  </Button>,
                ]}
                >
                <Form
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                ['name']: data.name,
                ['contact']: "1234567890",
                ['address']: "xyz",
                ['email']: "x@x.xom",
                ['description']: "brief description",
                }}
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
                </Form>
            </Modal>
      </>
    );
  }
}

const mapStatetoProps = state => {
    return {
        data:state.EditReducer.user
    };
  
  };
  export default connect(mapStatetoProps)(EditProfile);

//export default EditProfile;
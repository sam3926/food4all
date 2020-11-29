import React from 'react';
import { connect } from 'react-redux'

import { Button, Modal, Form, Input } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';

class EditProfile extends React.Component {
    render() {
        const { data } = this.props
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
                        <Button form="edit-profile-form" key="submit" type="primary" htmlType="submit" loading={this.props.loading}>
                            Submit
                  </Button>,
                    ]}
                >
                    <Form
                        id="edit-profile-form"
                        layout="vertical"
                        name="form_in_modal"
                        initialValues={{
                            ['name']: data.name,
                            ['contact']: data.contact,
                            ['address']: data.address,
                            ['description']: data.description,
                        }}
                        onFinish={this.props.handleOk}
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
                    </Form>
                </Modal>
            </>
        );
    }
}

const mapStatetoProps = state => {
    return {
        data: state.profileReducer.profileDetails
    };

};
export default connect(mapStatetoProps)(EditProfile);

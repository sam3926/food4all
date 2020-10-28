import React from 'react';
import { Button, Modal, Form, Input, Upload } from 'antd';
import { UploadOutlined, PhoneOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uploadProfilePic } from '../action';

class ProfilePic extends React.Component {
    render() {
        return (
            <>
                <Modal
                    visible={this.props.visible}
                    title="Change Profile Picture"
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.props.handleCancel}>
                            Return
                  </Button>
                    ]}
                >

                    <Upload multiple={false} name="file" accept="image/*"
                        customRequest={async ({ file, onSuccess, onError }) => {
                            let formData = new FormData()
                            formData.append('file', file)
                            await axios.post('/upload/profile-pic', formData).then(res => {
                                onSuccess(res.data)
                                this.props.uploadProfilePic(res.data.profilePic, res.data.avatar)

                            }).catch(err => {
                                console.log("error in uploading");
                                onError("Error in uploading. Try again")
                            }
                            )
                        }}
                        listType="picture"
                    >
                        <Button icon={<UploadOutlined />}>Upload Profile Pic</Button>
                    </Upload>


                </Modal>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    uploadProfilePic: bindActionCreators(uploadProfilePic, dispatch)
})

export default connect(null, mapDispatchToProps)(ProfilePic); 
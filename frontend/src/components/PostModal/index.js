import React, { Component } from "react";
import "antd/dist/antd.css";
import { Card, Form, Upload, Row, Col, Input, Modal, DatePicker, Button } from "antd";
import { UploadOutlined, InboxOutlined, AimOutlined } from "@ant-design/icons";
import "./styles.css";
import { addPost } from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import moment from 'moment';
import axios from "axios"
import {addHistory} from '../Profile/action';

const normFile = e => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

class PostModal extends Component {
  state = {
    user: this.props.name,
    description: '',
    files: []
  }
  addpost = (e) => {
    this.props.handleOk()
    const { dragger } = e;
    const imageUrl = dragger?.map(image => image.response.location);

    const post = {
      author:this.state.user,
      description: e.description,
      likes: [],
      liked: false,
      noOfLikes: 0,
      DateTime: moment().format("HH:mm ll"),
      imageUrl
    };

    this.props.addPost(post);
    const history = {
      color: 'blue',
      icon: 'dot',
      text: post.description + ' ( Posted on ' + post.DateTime + ' )'
    };
    this.props.addHistory(history);
  }

  render() {

    return (
      <Modal
        visible={this.props.visible}
        maskClosable={false}
        destroyOnClose
        title="Share your Thoughts"
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        footer={[
          <Button key="back" onClick={this.props.handleCancel}>
            Return
              </Button>,
          <Button form="post-form" key="submit" type="primary" htmlType="submit" loading={this.props.loading}
          //  onClick={this.addpost} 
          >
            Post
              </Button>,
        ]}
      >
        <Form id="post-form" name="validate_other" layout={"Vertical"} onFinish={this.addpost} >
          <Form.Item
            name='description'
            width={500}
            rules={
              [{
                required: true, message: "Please Enter Items details"
              }]
            }
          >
            <Input.TextArea placeholder="Express your thoughts"
              autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>
          <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Upload.Dragger multiple={false} name="file"
              customRequest={async ({ file, onSuccess, onError }) => {
                let formData = new FormData()
                formData.append('file', file)
                await axios.post('/upload/posts', formData).then(res => {
                  onSuccess(res.data)
                  console.log(res.data)
                }).catch(err => { console.log("error in uploading"); onError("Error in uploading.Try again") })
              }} >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
                  </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
                  </p>
            </Upload.Dragger>
          </Form.Item>
        </Form>

      </Modal>
    )
  }
}
const mapStatetoProps = state => {
  return {
      name: state.LeftSidePanelReducer.profileDetails.name,
  };
  
};
const mapDispatchToProps = dispatch => ({
  addHistory: bindActionCreators(addHistory,dispatch),
  addPost: bindActionCreators(addPost, dispatch)
})
export default connect(mapStatetoProps, mapDispatchToProps)(PostModal);

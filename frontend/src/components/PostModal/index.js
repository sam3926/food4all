import React, {Component} from "react";
import "antd/dist/antd.css";
import { Card, Form, Upload, Row, Col, Input, Modal, DatePicker, Button } from "antd";
import { UploadOutlined, InboxOutlined, AimOutlined } from "@ant-design/icons";
import "./styles.css";
import { addPost } from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

  const normFile = e => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
    return e;
    }

    return e && e.fileList;
  };
  
  class PostModal extends Component {
    state = {
      user:'Arpit',
      description:'',
      files:[]
    }
    addpost = (e) =>{
      this.props.handleOk()

      const post = {user_name:this.state.user,
              description: this.state.description,
              id:Math.random(),
              likes:0,
              shares:0};

      this.props.addPost(post);
    }
    
    render() {
      
      const onFieldsChange = (changedFields, allFields) => { 
        this.setState({
            description:allFields[0].value,
            files:allFields[1].value
          })
      }
      return (
          <Modal
            visible={this.props.visible}
            title="Share your Thoughts"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.props.handleCancel}>
                Return
              </Button>,
              <Button key="submit" type="primary" loading={this.props.loading} onClick={this.addpost} >
                Post
              </Button>,
            ]}
          > 
            <Form name="validate_other" layout={"Vertical"} onFieldsChange={onFieldsChange} >
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
                <Upload.Dragger name="files" >
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

const mapDispatchToProps = dispatch =>({
  addPost: bindActionCreators(addPost,dispatch)
})
export default connect(null,mapDispatchToProps)(PostModal);

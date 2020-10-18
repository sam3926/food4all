import React, {Component} from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Card, Form, Upload, Row, Col, Input, Modal, DatePicker, Button } from "antd";
import { UploadOutlined, InboxOutlined, AimOutlined } from "@ant-design/icons";
import "./styles.css";

  const normFile = e => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
    return e;
    }

    return e && e.fileList;
  };

  class PostModal extends Component {
    render() {
      return (
          <Modal
            visible={this.props.visible}
            title="Share your Thoughts"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            onOk={this.props.handleOk}
            onCancel={this.props.handleCancel}
            footer={[
              <Button key="back" onClick={this.props.handleCancel}>
                Return
              </Button>,
              <Button key="submit" type="primary" loading={this.props.loading} onClick={this.props.handleOk}>
                Post
              </Button>,
            ]}
          > 
            <Form name="validate_other" layout={"Vertical"}>
              <Form.Item
                name={["user", "ItemDetails"]}
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

              <Form.Item>
                <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                  <Upload.Dragger name="files" action="/upload.do">
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
              </Form.Item>
            </Form>
          </Modal>
        )
      }
  }

export default PostModal;

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Upload, Row , Col , Input , Modal,DatePicker, Button } from 'antd';
import { UploadOutlined, InboxOutlined , AimOutlined } from '@ant-design/icons';

  const formItemLayout = {
      labelCol: {
      span: 6,
    },
      wrapperCol: {
      span: 14,
    },
  };

  const config = {
      rules: [
      {
      type: 'object',
      required: true,
      message: 'Please select time!',
      },
    ],
  };

  const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
    return e;
    }

    return e && e.fileList;
  };

  class DonateModal extends Component {
  
    render() {
      return(
        <Modal
          visible={this.props.visible}
          title="Donation Details"
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
            name="validate_other"
            {...formItemLayout}
          >
            <Form.Item
              {...formItemLayout}
              name="username"
              label="Title"
              rules={
                [{
                required: true, message: 'Please input your Title',
                },]
              }
            >
              <Input placeholder="Please input your Title" />
             </Form.Item>

            <Form.Item name={['user', 'ItemDetails']} label="ItemDetails"
              rules={
                [{
                required: true, message: 'Please Enter Items details',
                },]
              }
            >
              <Input.TextArea placeholder="Please Enter Items details here" />
            </Form.Item>

            <Form.Item name="date-picker" label="Enter expiry date" {...config}>
              <DatePicker />
            </Form.Item>

            <Form.Item label="Address" 
              rules={
                [{
                required: true, message: 'Please input your address',
                },]
              }
            >
              <Row gutter={8}>
                <Col span={20}>
                  <Form.Item name="Address" noStyle
                    rules={
                      [{
                      required: true, message: 'Please input the Address',
                      },]
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Button icon={<AimOutlined />}></Button>
                </Col>
              </Row>
            </Form.Item>
            
            <Form.Item label="Dragger">
              <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                <Upload.Dragger name="files" action="/upload.do">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
          </Form> 
        </Modal>
      )
    }
  }

export default DonateModal;
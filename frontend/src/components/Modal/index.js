import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
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

class Modal1 extends React.Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 500);
    Modal.success({
    content: 'Donations posted',
  });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Open Modal with customized footer
        </Button>
        <Modal
          visible={visible}
          title="Donation Details"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
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
        rules={[
          {
            required: true,
            message: 'Please input your Title',
          },
        ]}
      >
        <Input placeholder="Please input your Title" />
      </Form.Item>

      <Form.Item name={['user', 'ItemDetails']} label="ItemDetails"
      rules={[
          {
            required: true,
            message: 'Please Enter Items details',
          },
        ]}
        >
        <Input.TextArea placeholder="Please Enter Items details here" />
      </Form.Item>

      <Form.Item name="date-picker" label="Enter expiry date" {...config}>
        <DatePicker />
      </Form.Item>

      <Form.Item label="Address" 
      rules={[
          {
            required: true,
            message: 'Please input your address',
          },
        ]}>
        <Row gutter={8}>
          <Col span={20}>
            <Form.Item
              name="Address"
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Please input the Address',
                },
              ]}
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
      </>
    );
  }
}

export default Modal1;
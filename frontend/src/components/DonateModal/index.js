import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Upload, Row , Col , Input , Modal,DatePicker, Button } from 'antd';
import { UploadOutlined, InboxOutlined , CompassOutlined , AimOutlined } from '@ant-design/icons';
import MapComp from "../MapComp";
import { addDonation } from './action';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import axios from "axios"
import moment from 'moment';
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
    state = {
      user:'Name',
    }
    constructor() {
      super();
      this.state = {
          title:'',
          description:'',
          Date:'',
          files:[],
          mapOpen: false,
          latlng: null
      };
    }

    saveLatLng = (latlng) => {
      this.setState({
          latlng: latlng
      })
      //console.log(this.state.latlng.lat + " , " + this.state.latlng.lng);
    }
    onChange = (value,dateString) => {
        this.setState({
          Date: dateString
        })
    }
    disabledDate = (current) => {
      // Can not select days before today and today
      return current && current < moment().endOf('day');
    }
    
    render() {
      const onFieldsChange = (changedFields,allFields) =>{
        console.log(allFields)
        this.setState({
          title: allFields[0].value,
          description:allFields[1].value,
          //Date:allFields[2].value==undefined? (null):(allFields[2].value.getDate),
          //files: allFields[3].value ==undefined? ([]):([allFields[3].value])
        })
      }
      const createPost = (e) =>{
        console.log(this.state)
        this.props.handleOk()
        const { dragger } = e;
        const imageUrl = dragger?.map(image => image.response.location);
        console.log('this is to create the post',imageUrl);
        const donation = {
          donorId: this.props.profileDetails._id,
          title: this.state.title,
          postTime:this.state.Date,
          peopleFed: 0,
          status: 'NotAccepted',
          description:this.state.description,
          location: {type: "Point", coordinates :[this.state.latlng.lng,this.state.latlng.lat]},
          images:this.state.files,
          donorName:this.props.profileDetails.name
        }
        this.props.addDonation(donation,this.props.profileDetails.contact)
      }
      const { latlng } = this.state;
      const addpost = (imagelist) =>{
        this.setState({
          files: [...this.state.files,imagelist.location]
        })
        console.log('When the form is finished',this.state.files);
      }
      return(
        <>
        <Modal
          visible={this.props.visible}
          title="Donation Details"
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          footer={[
            <Button key="back" onClick={this.props.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={this.props.loading} onClick={createPost}>
              Submit
            </Button>,
          ]}
        >
          <Form
            name="validate_other"
            onFieldsChange = {onFieldsChange}
            onFinish={addpost}
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
              <DatePicker onChange={this.onChange} disabledDate={this.disabledDate} format="HH:mm ll" />
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
                    <Input placeholder="Location" disabled value={latlng ? latlng.lat + " , " + latlng.lng : ""} />
                </Col>
                <Col span={2}>
                  <Button onClick={() => this.setState({ mapOpen: true })} icon={<CompassOutlined />}></Button>
                </Col>
              </Row>
            </Form.Item>
            
            <Form.Item label="Dragger">
              <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger multiple={false} name="file"
              customRequest={async ({ file, onSuccess, onError }) => {
                let formData = new FormData()
                formData.append('file', file)
                await axios.post('/upload/donations', formData).then(res => {
                  onSuccess(res.data)
                  console.log(res.data)
                  addpost(res.data)
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
            </Form.Item>
          </Form> 
        </Modal>

        <Modal footer={[
          <Button onClick={() => this.setState({ mapOpen: false })}>
            Return
          </Button>
          ]} centered closable={false} width={"90vw"} visible={this.state.mapOpen}>
        <MapComp saveLatLng={this.saveLatLng} />
        </Modal>
</>
      )
    }
  }

const mapDispatchToProps = dispatch => ({
  addDonation : bindActionCreators(addDonation,dispatch)
})
const mapStatetoProps = state => {
  return {
      profileDetails: state.LeftSidePanelReducer.profileDetails,
  };
  
}
export default connect(mapStatetoProps ,mapDispatchToProps)(DonateModal);
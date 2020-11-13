import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import axios from "axios"
import moment from 'moment';

import 'antd/dist/antd.css';
import { Form, Upload, Row , Col , Input , Modal,DatePicker, Button } from 'antd';
import { InboxOutlined , CompassOutlined } from '@ant-design/icons';

import MapComp from "../MapComp";
import { addDonation } from './action';
import {addHistory} from '../Profile/action';

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
    if (Array.isArray(e)) {
    return e;
    }

    return e && e.fileList;
  };
  
  class EventModal extends Component {
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
    }
    onChange = (value,dateString) => {
        this.setState({
          Date: dateString
        })
    }
    disabledDate = (current) => {
      return current && current < moment().endOf('day');
    }
    
    render() {
      const onFieldsChange = (changedFields,allFields) =>{
        this.setState({
          title: allFields[0].value,
          description:allFields[1].value,
        })
      }
      const createPost = (e) =>{
        if(this.state.latlng !== undefined){
          this.props.handleOk()
          const { dragger } = e;
          const imageUrl = dragger?.map(image => image.response.location);
          console.log('this is to create the post',imageUrl);
          const donation = {
            donorId: this.props.profileDetails._id,
            title: this.state.title,
            expiryTime:this.state.Date,
            peopleFed: 0,
            status: 'NotAccepted',
            description:this.state.description,
            location: {type: "Point", coordinates :[this.state.latlng.lng,this.state.latlng.lat]},
            images:this.state.files,
            donorName:this.props.profileDetails.name
          }
          this.props.addDonation(donation,this.props.profileDetails.contact)
          this.props.addHistory({
            color: 'blue',
            icon: 'clock',
            text: donation.title + ' ( Donation expires on ' + donation.expiryTime + ' )'
          });
          
          this.setState({
            latlng:null,
            files:[]
          })
        } 
        
      }
      const { latlng } = this.state;
      const addpost = (imagelist) =>{
        this.setState({
          files: [...this.state.files,imagelist.location]
        })
      }
      return(
        <>
        <Modal
          destroyOnClose
          visible={this.props.visible}
          title="Event Details"
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          footer={[
            <Button key="back" onClick={this.props.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={this.props.loading} form = 'donateform' htmlType = 'submit'>
              Submit
            </Button>,
          ]}
        >
          <Form
            id = 'donateform'
            name="validate_other"
            onFieldsChange = {onFieldsChange}
            onFinish={createPost}
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

            <Form.Item name={['user', 'ItemDetails']} label="Event Details"
              rules={
                [{
                required: true, message: 'Please Enter Event details',
                },]
              }
            >
              <Input.TextArea placeholder="Please Enter Event details here" />
            </Form.Item>

            <Form.Item name="date-picker" label="Enter Event date" {...config}>
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
  addHistory: bindActionCreators(addHistory,dispatch),
  addDonation : bindActionCreators(addDonation,dispatch)
})
const mapStatetoProps = state => {
  return {
      profileDetails: state.LeftSidePanelReducer.profileDetails,
  };
  
}
export default connect(mapStatetoProps ,mapDispatchToProps)(EventModal);
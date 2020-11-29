import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import moment from 'moment';
import axios from "axios"

import "antd/dist/antd.css";
import { Form, Upload, Input, Radio, Modal, Button, Result, Avatar } from "antd";
import { InboxOutlined, } from "@ant-design/icons";

// const normFile = e => {
//   console.log("Upload event:", e);

//   if (Array.isArray(e)) {
//     return e;
//   }

//   return e && e.fileList;
// };

class Awards extends Component {
  state = {
    value: "diamond",
  }

  //   showModalP = () => {
  //     this.setState({
  //         visiblepay: true
  //     });
  //   };

  //   hideModalP = () => {
  //     this.setState({
  //         visiblepay: false
  //     });
  //   };

  //   hideModalB = () => {
  //     this.setState({
  //         visiblepay: false,
  //         visible: true
  //     });
  //   };


  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { value } = this.state;

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    return (
      <>
        <Modal
          title={<b>Awards</b>}
          visible={this.props.visible}
          onOk={async () => {
            console.log("post", this.props.currentPostid, "value", this.state.value)
            await axios.post('/api/users/giveAward', {
              postId: this.props.currentPostid,
              awardType: this.state.value
            })
            this.props.hideModalS()
          }}
          onCancel={this.props.hideModal}
          okText="Payment"
          cancelText="cancel"
        >
          <div>
            <b> Please select the award you want to Buy ?</b>
            <br />
            <Radio.Group onChange={this.onChange} value={value}>
              <Radio style={radioStyle} value={"diamond"}>
                <Avatar size="small" src="/images/awards/diamond.jpg" /> Diamond, Cost : 150, Will help us to feed 3 childern.
        </Radio>
              <Radio style={radioStyle} value="gold">
                <Avatar size="small" src="/images/awards/gold.jpg" />Gold, Cost : 100, Will help us to feed 2 childern.
        </Radio>
              <Radio style={radioStyle} value="silver">
                <Avatar size="small" src="/images/awards/silver.jpg" />Silver, Cost : 50, Will help us to feed 1 childern.
        </Radio>
            </Radio.Group>
          </div>
        </Modal>

        <Modal
          title="Payment"
          visible={this.props.visiblepay}
          onOk={this.props.hideModalB}
          onCancel={this.props.hideModalP}
          okText="Buy Again"
          cancelText="Close"
        >
          <Result
            status="success"
            title="Successfully Purchased Award"
            subTitle="You can veiw awards on User's Profile"
          />
        </Modal>
      </>
    )
  }
}

export default Awards; 
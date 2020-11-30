import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import moment from 'moment';
import sortBy from 'lodash/sortBy';

import './styles.css'
import MapDiscover from "../MapDiscover";

import { Modal, Menu, DatePicker, TimePicker, Checkbox, Layout, Card, Button, Input, Space, Image, Form, Avatar, InputNumber } from 'antd';
import { HomeOutlined, PhoneOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

import { pendingDonation, changeFilters, getDonation, getOrganisation } from './action';
import { addFed, addHistory, rejectDonation, acceptdonation } from '../Profile/action';
import { setCurrentRoute } from '../Navbar/actions';
import LoadingScreen from '../LoadingScreen';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

function success(contact) {
  Modal.success({
    title: 'Donor Notified',
    content: 'You can contact Donor on ' + contact
  });
}

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
class Discover extends Component {
  state = {
    Organisations: [],
    selectedMenuItem: '1',
    loading: false,
    visible: false,
    filters: [],
    mapOpen: false,
    lngp: 77.2090,
    latp: 28.6139,
    pickupDate: null
  }
  async componentDidMount() {
    this.setState({
      profilePageLoading: true
    })

    await this.props.getOrganisation();
    this.props.getDonation();

    this.setState({
      profilePageLoading: false
    })

  }
  disabledDate = (current) => {
    return current && current < moment().endOf('day');
  }

  showModal = (data) => {
    this.props.acceptdonation(data)
    this.props.addHistory({
      color: 'green',
      icon: 'dot',
      text: data.title + ' ( Donation accepted on ' + moment().format("HH:mm ll") + ' )'
    });

    this.setState({
      visible: true,
      acceptdonation: data
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 1000);
    Modal.success({
      content: "Donation Shared on profile"
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  disabledDate = (current) => {
    return current && current < moment().endOf('day');
  }

  render() {
    const { selectedMenuItem, visible, loading, latp, lngp } = this.state;
    const { Organisations, Donations, pendingDonations, pendingDonorDonation } = this.props

    const plainOptions = [
      { label: 'Location', value: 'Location' },
      { label: 'Expiry Date', value: 'Expiry Date' },
      { label: 'Time', value: 'Time' },
    ];
    const onChange = (checkedValues) => {
      this.setState({
        filters: [...checkedValues]
      })
    }

    const addpending = (Donation) => {
      console.log(this.state.pickupDate?.format("HH:mm DD-MM-YYYY"));
      const date = this.state.pickupDate;
      console.log(Donation);
      this.props.pendingDonation(Donation, date);
      this.setState({ mapOpen: false })
    }
    const imagelist = (images) => {
      return images.length ? (
        images.map(image => {
          return (
            <Image
              width={100}
              height={100}
              alt="example"
              src={image}
            />
          )
        })
      ) : (<div> No images!</div>)
    }

    const filteredDonation = (Donations) => {
      const filters = this.state.filters;
      if (filters.find((value => value.localeCompare("Time") === 0))) {
        const filterDonations = sortBy(Donations, (donation) => {
          return new moment(donation.createdAt);
        });
        console.log(filterDonations)
        return filterDonations;
      }
      if (filters.find((value => value.localeCompare("Expiry Date") === 0))) {
        const filterDonations = sortBy(Donations, (donation) => {
          return new moment(donation.expiryTime);
        });
        console.log(filterDonations)
        return filterDonations;
      }
      return Donations
    }
    const action = (Donation) => {
      if (this.props.userType.localeCompare('donor') === 0)
        return [];
      if (this.props.userId == Donation.donorId)
        return [];

      const value = [
        <Link to={{
          pathname: "/messages",
          state: {
            //PUT DONOR_ID
            user: Donation.donorId
          }
        }}>
          <p className="text" onClick={() => { this.props.setCurrentRoute('messages') }} ><b> Contact Donor </b></p>
        </Link>,
        <p className="text" onClick={async () => { console.log(Donation); await this.setState({ currentDonation: Donation, }); this.setState({ mapOpen: true }); }} ><b> Interested </b></p>,
      ]

      return value;
    }
    const filterDonations = filteredDonation(Donations);
    const DonationList = (Donations).length ? (
      filterDonations.map(Donation => {
        return (
          <Card title={<Link onClick={() => this.props.setCurrentRoute('profile')} to={`/profile/${Donation.donorId}`}>{Donation.donorName}</Link>} extra={<div>{moment(Donation.createdAt).format("HH:mm ll")}</div>} style={{ width: 700, margin: '8px' }}

            actions={action(Donation)}
          >
            <p>{Donation.description}</p>
            <Space>
              {imagelist(Donation.images)}
            </Space>

          </Card>
        )
      })
    ) : (
        <div>No Donations are currently there!</div>
      )
    console.log('this is inside the donations', Donations);
    const pendingDonationList = pendingDonations.length ? (
      pendingDonations.map(Donation => {
        return (
          <Card title={Donation.donorName} extra={moment(Donation.createdAt).format("ll")} size="small" style={{ width: 250 }}

            actions={[
              <p classname="cardtext1" onClick={() => this.showModal(Donation)} ><CheckOutlined hoverable={true} key="Accept" /> Accept </p>,
              <p onClick={() => this.props.rejectDonation(Donation._id)}><CloseOutlined hoverable={true} key="Reject" /> Reject </p>,
            ]}
          >
            <p><p><b>Time Given: </b>{Donation.pickupDate}</p>{Donation.description}</p>
          </Card>
        )
      })
    ) : (
        <div>No Pending donations are currently there!</div>
      )
    const pendingDonorDonationList = pendingDonorDonation.length ? (
      pendingDonorDonation.map(Donation => {

        return (
          <Card title={Donation.donorName} extra={moment(Donation.postTime).format("HH:mm ll")} size="small" style={{ width: 250 }}

          >
            <p>{Donation.description}</p>
          </Card>
        )
      })
    ) : (
        <div>No Donations are currently there!</div>
      )

    const OrganisationList = Organisations.length ? (
      Organisations.map(Organisation => {
        return (
          <Link onClick={() => this.props.setCurrentRoute('profile')} to={`/profile/${Organisation._id}`}>

            <Card title={<div> {
              <Avatar
                src={Organisation.avatar}
                alt="Han Solo"
              />
            } <a>{Organisation.name}</a> </div>} extra={<p>People fed {Organisation?.noFed} </p>} style={{ width: 700, margin: '8px' }}>
              <p><PhoneOutlined /> : {Organisation.contact} <HomeOutlined /> : {Organisation.address} </p>

              <p>{Organisation.description}</p>
            </Card>
          </Link>

        )
      })
    ) : (
        <div>No Organisation are currently there!</div>
      )

    const componentsSwitch = (key) => {
      switch (key) {
        case '1':
          return (DonationList);
        case '2':
          return (OrganisationList);
        default:
          return (DonationList);
      }
    }

    const onclick = (key) => {
      this.setState(
        {
          selectedMenuItem: key,
        }
      )
    }

    const onFinish = async (values) => {
      await this.props.addFed(values.peoplefed, values.rating, this.state.acceptdonation?.donorId);
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    return (
      this.state.profilePageLoading ? <LoadingScreen /> :
        <Layout>
          <Sider width={280}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              marginTop: '64px',

            }} >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['1']}
              style={{ height: '100%', borderRight: 0 }}
              onClick={(e) => onclick(e.key)}
              activeKey={selectedMenuItem}
              style={{ position: "relative" }}
            >
              <SubMenu key="1" title="" onTitleClick={(e) => onclick(e.key)} style={{ fontSize: '16px', height: "100% " }}>
                <div style={{ "padding": "auto" }}>
                  <Checkbox.Group options={plainOptions} onChange={onChange} />
                </div>
              </SubMenu>
              <Menu.Item key="1" style={{ position: "absolute", zIndex: "10", top: 0, left: 0, height: "40px", paddingLeft: "20px" }}>Donations</Menu.Item>
              <Menu.Item key="2">Nearby Organisations</Menu.Item>
            </Menu>
          </Sider>

          <Layout style={{ marginLeft: '280px', marginTop: '64px' }}>
            <Content className="site-layout-background"
              style={{
                paddingLeft: 125,
                minHeight: 280,
              }}>
              {componentsSwitch(selectedMenuItem)}
            </Content>
            <Sider width={300} style={{ padding: "25px" }}>
              <div style={{ fontWeight: "bolder", paddingBottom: "15px", fontSize: "medium" }}>Pending Donations</div>
              <div>
                {this.props.userType.localeCompare('donor') === 0 ? pendingDonorDonationList : pendingDonationList}
              </div>
            </Sider>

          </Layout >

          <Modal
            destroyOnClose
            visible={visible}
            title="Accept Donation"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Say Thanks
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={this.handleOk}
                form='acceptform'
                htmlType='submit'
              >
                Submit
              </Button>
            ]}
          >
            <Form
              id='acceptform'
              {...layout}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="No of people fed ?"
                name="peoplefed"
                rules={[
                  {
                    required: true,
                    message: 'Please input peoplefed',
                  },
                ]}
              >
                <InputNumber min="1" placeholder="No. fed" />
              </Form.Item>

              <Form.Item
                label="Rate the User"
                name="rating"
                rules={[
                  {
                    required: true,
                    message: 'Please rate the user',
                  },
                ]}
              >
                <InputNumber min="1" max="5" placeholder="1 to 5" />
              </Form.Item>

            </Form>
          </Modal>
          <Modal footer={[
            <Button onClick={() => addpending(this.state.currentDonation)}>
              Done
            </Button>
          ]} centered closable={false} width={"90vw"} visible={this.state.mapOpen}>
            <MapDiscover latitudeP={this.state.currentDonation?.location.coordinates[1]} longitudeP={this.state.currentDonation?.location.coordinates[0]} message='Pickup Point' />
            <div style={{ marginLeft: "25vw" }}>
              <p>
                <br />
                <Space>
                  Enter Pickup Date :
            <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                    disabledDate={this.disabledDate} 
                    onChange={value => { console.log(value); this.setState({ pickupDate: value }) }}
                  />
                </Space>
              </p>
            </div>
          </Modal>
        </Layout >
    )
  }
}


const mapStatetoProps = state => {
  const checkvisibilty = (donation) => {
    return donation.status.localeCompare("NotAccepted") === 0
  }
  const pendingdonations = (donation) => {
    const userId = state.authReducer.user.userId
    return (donation.status.localeCompare("pending") == 0 && donation.receiverId == userId)
  }
  const pendingdonordonations = (donation) => {
    const userId = state.authReducer.user.userId
    return (donation.status.localeCompare("pending") == 0 && donation.donorId == userId)
  }

  return {
    pendingDonorDonation: state.DiscoverReducer.Donations.filter(pendingdonordonations),
    userType: state.authReducer.user.userType,
    userId: state.authReducer.user.userId,
    currentfilter: state.DiscoverReducer.currentfilter,
    Donations: state.DiscoverReducer.Donations.filter(checkvisibilty),
    pendingDonations: state.DiscoverReducer.Donations.filter(pendingdonations),
    Organisations: state.DiscoverReducer.Organisations,
  };

};
const mapDispatchToProps = (dispatch, getState) => ({
  addFed: bindActionCreators(addFed, dispatch),
  addHistory: bindActionCreators(addHistory, dispatch),
  getOrganisation: bindActionCreators(getOrganisation, dispatch),
  acceptdonation: bindActionCreators(acceptdonation, dispatch),
  changeFilters: bindActionCreators(changeFilters, dispatch),
  pendingDonation: bindActionCreators(pendingDonation, dispatch),
  rejectDonation: bindActionCreators(rejectDonation, dispatch),
  getDonation: bindActionCreators(getDonation, dispatch),
  setCurrentRoute: bindActionCreators(setCurrentRoute, dispatch)
})

export default connect(mapStatetoProps, mapDispatchToProps)(Discover);
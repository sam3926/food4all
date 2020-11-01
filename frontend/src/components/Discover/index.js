import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import './styles.css'
import { connect } from 'react-redux'
import { changeFilters, getDonation } from './action'
import { bindActionCreators } from 'redux';
import { Modal, Menu, Checkbox, Layout, Card, Button, Input, Space, Image } from 'antd';
import moment from 'moment';
import { HomeOutlined, PhoneOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { pendingDonation } from './action';
import { acceptdonation } from '../Profile/action';
import { rejectDonation } from '../Profile/action';
import sortBy from 'lodash/sortBy';
import { setCurrentRoute } from '../Navbar/actions';
import { Link } from "react-router-dom"
const { Content, Sider } = Layout;
const { SubMenu } = Menu;


function success(contact) {
  Modal.success({
    title: 'Donor Notified',
    content: 'You can contact Donor on ' + contact
  });
}

class Discover extends Component {
  state = {
    Organisations: [
      { organisationName: 'Arpit1', address: 'Address', contact: 'contact no', peoplefed: '0', description: 'Brief description' },
      { organisationName: 'Arpit1', address: 'Address', contact: 'contact no', peoplefed: '0', description: 'Brief description' },
      { organisationName: 'Arpit1', address: 'Address', contact: 'contact no', peoplefed: '0', description: 'Brief description' },
      { organisationName: 'Arpit1', address: 'Address', contact: 'contact no', peoplefed: '0', description: 'Brief description' },
      { organisationName: 'Arpit1', address: 'Address', contact: 'contact no', peoplefed: '0', description: 'Brief description' }
    ],
    Events: [],
    selectedMenuItem: '1',
    loading: false,
    visible: false,
    filters: []
  }
  componentDidMount() {
    this.props.getDonation();
  }
  showModal = (data) => {
    this.props.acceptdonation(data)
    this.setState({
      visible: true
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




  render() {
    const { Events, selectedMenuItem, visible, loading } = this.state;
    const { Organisations, Donations, pendingDonations, pendingDonorDonation } = this.props
    //console.log('this is  the dicover ',pendingDonations);

    const plainOptions = [
      { label: 'Location', value: 'Location' },
      { label: 'Expiry Date', value: 'Expiry Date' },
      { label: 'Time', value: 'Time' },
    ];
    const onChange = (checkedValues) => {
      // this.props.changeFilters(checkedValues)
      console.log(checkedValues)
      this.setState({
        filters: [...checkedValues]
      })
      //console.log(this.state.filters)
      //return checkedValues;
      //console.log('checked = ', checkedValues);
    }

    const addpending = (Donation) => {
      const { _id, donorName, postTime, description } = Donation;
      const Pending = {
        donorName: donorName,
        postTime: postTime,
        description: description
      };

      this.props.pendingDonation(Donation);
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
      console.log(filters);
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
        <p className="text" onClick={() => addpending(Donation)} ><b> Interested </b></p>,
      ]

      return value;
    }
    const filterDonations = filteredDonation(Donations);
    const DonationList = (Donations).length ? (
      filterDonations.map(Donation => {
        return (
          <Card title={<Link onClick={() => this.props.setCurrentRoute('profile')} to={`/profile/${Donation.donorId}`}>{Donation.donorName}</Link>} extra={<div>{moment(Donation.postTime).format("HH:mm ll")}</div>} style={{ width: 700, margin: '8px' }}

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

    const pendingDonationList = pendingDonations.length ? (
      pendingDonations.map(Donation => {

        return (
          <Card title={Donation.donorName} extra={moment(Donation.postTime).format("HH:mm ll")} size="small" style={{ width: 250 }}
            actions={[
              <p classname="cardtext1" onClick={() => this.showModal(Donation)} ><CheckOutlined hoverable={true} key="Accept" /> Accept </p>,
              <p onClick={() => this.props.rejectDonation(Donation._id)}><CloseOutlined hoverable={true} key="Reject" /> Reject </p>,
            ]}
          >
            <p>{Donation.description}</p>
          </Card>
        )
      })
    ) : (
        <div>No Donations are currently there!</div>
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

          <Card title={<a>{Organisation.organisationName}</a>} extra={<p>People fed {Organisation.peoplefed}</p>} style={{ width: 700, margin: '8px' }}>
            <p><PhoneOutlined /> : {Organisation.contact} <HomeOutlined /> : {Organisation.address} </p>

            <p>{Organisation.description}</p>
          </Card>
        )
      })
    ) : (
        <div>No Organisation are currently there!</div>
      )

    const EventList = Events.length ? (
      Events.map(Event => {
        return (
          <Card title={Event.title} style={{ width: 700, margin: '8px' }}>
            <p>{Event.description}</p>
          </Card>
        )
      })
    ) : (
        <div>No Events are currently there!</div>
      )

    const componentsSwitch = (key) => {
      switch (key) {
        case '1':
          return (DonationList);
        case '2':
          return (OrganisationList);
        case '3':
          return (EventList);
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

    return (
      <Layout>
        <Sider width={280} className="site-layout-background"
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
            onClick={(e) => onclick(e.key)} >
            <SubMenu key="1" title="Donations" onTitleClick={(e) => onclick(e.key)} style={{ fontSize: '16px' }}>
              <div style={{ "padding": "auto" }}>
                <Checkbox.Group options={plainOptions} onChange={onChange} />
              </div>
            </SubMenu>
            <Menu.Item key="2">Nearby Organisations</Menu.Item>
            <Menu.Item key="3">Nearby Events/Activities</Menu.Item>
          </Menu>
        </Sider>

        <Layout style={{ marginLeft: '280px', marginTop: '64px' }}>
          <Content className="site-layout-background"
            style={{
              paddingLeft: 120,
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

        </Layout>

        <Modal
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
            >
              Share Donation
              </Button>
          ]}
        >
          <b> Enter No of people will be fed from this donation ?</b>
          <Input placeholder="Input Number Here" />
          <b> Rate the User</b>
          <Input placeholder="Rate Between 1 to 5" />
        </Modal>


      </Layout>
    )
  }
}


const mapStatetoProps = state => {
  const checkvisibilty = (donation) => {
    //console.log(donation.status.localeCompare("NotAccepted") === 0 )
    return donation.status.localeCompare("NotAccepted") === 0
  }
  const pendingdonations = (donation) => {
    const userId = state.authReducer.user.userId
    //console.log(userId)
    //console.log(donation.status.localeCompare("pending") === 0 )
    return (donation.status.localeCompare("pending") == 0 && donation.receiverId == userId)
  }
  const pendingdonordonations = (donation) => {
    const userId = state.authReducer.user.userId
    //console.log(userId)
    //console.log(donation.status.localeCompare("pending") === 0 )
    return (donation.status.localeCompare("pending") == 0 && donation.donorId == userId)
  }

  return {
    pendingDonorDonation: state.DiscoverReducer.Donations.filter(pendingdonordonations),
    userType: state.authReducer.user.userType,
    currentfilter: state.DiscoverReducer.currentfilter,
    Donations: state.DiscoverReducer.Donations.filter(checkvisibilty),
    pendingDonations: state.DiscoverReducer.Donations.filter(pendingdonations),
    Organisations: state.DiscoverReducer.Organisations,
    Events: state.DiscoverReducer.Events
  };

};
const mapDispatchToProps = (dispatch, getState) => ({
  acceptdonation: bindActionCreators(acceptdonation,dispatch),
  changeFilters: bindActionCreators(changeFilters, dispatch),
  pendingDonation: bindActionCreators(pendingDonation, dispatch),
  rejectDonation: bindActionCreators(rejectDonation, dispatch),
  getDonation: bindActionCreators(getDonation, dispatch),
  setCurrentRoute: bindActionCreators(setCurrentRoute, dispatch)
})

export default connect(mapStatetoProps, mapDispatchToProps)(Discover);
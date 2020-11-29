import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';
import moment from 'moment';
import sortBy from 'lodash/sortBy';

import MapDiscover from "../MapDiscover";

import { Menu, Checkbox, Layout, Modal, Button, Card, Space, Image } from 'antd';
import { InboxOutlined, CompassOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { changeFilters, getEvent } from './actions';
import LoadingScreen from '../LoadingScreen';
import { setCurrentRoute } from '../Navbar/actions';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

class Community extends Component {

  state = {
    selectedMenuItem: '1',
    mapOpen: false,
    filters: [],
    lngp: 77.2090,
    latp: 28.6139
  }

  async componentDidMount() {

    this.setState({
      profilePageLoading: true
    })

    await this.props.getEvent();

    this.setState({
      profilePageLoading: false
    })
  }

  render() {
    const { selectedMenuItem, latp, lngp } = this.state;
    const { Events } = this.props;
    const plainOptions = [
      { label: 'Location', value: 'Location' },
      { label: 'Date', value: 'Expiry Date' },
      { label: 'Time', value: 'Time' },
    ];
    const onChange = (checkedValues) => {
      this.setState({
        filters: [...checkedValues]
      })
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
    const filteredEvent = (Events) => {
      const filters = this.state.filters;
      if (filters.find((value => value.localeCompare("Time") === 0))) {
        const filterDonations = sortBy(Events, (event) => {
          return new moment(event.createdAt);
        });
        console.log(filterDonations)
        return filterDonations;
      }
      if (filters.find((value => value.localeCompare("Expiry Date") === 0))) {
        const filterDonations = sortBy(Events, (event) => {
          return new moment(event.expiryTime);
        });
        console.log(filterDonations)
        return filterDonations;
      }
      return Events
    }

    const filterEvents = filteredEvent(Events.filter((event) => { return moment(event.expiryTime).isAfter(moment.now()) }));
    const action = (Event) => {
      console.log("this is the action center", this.props.user.userId, 'the event donor id is', Event.donorId);
      if (Event.donorId === this.props.user?.userId)
        return []

      return ([
        <Link to={{
          pathname: "/messages",
          state: {
            //PUT DONOR_ID
            user: Event.donorId
          }
        }}>
          <p className="text" onClick={() => { this.props.setCurrentRoute('messages') }} ><b> Contact Organisor </b></p>
        </Link>
      ])
    }
    const EventList = Events.length ? (
      filterEvents.map(Event => {
        return (
          <Card
            title={<Link onClick={() => this.props.setCurrentRoute('profile')} to={`/profile/${Event.donorId}`}>{Event.title}</Link>}
            extra={<div><p>Event Date : {moment(Event.expiryTime).format(" HH:mm ll")}</p></div>}
            style={{ width: 700, margin: '8px' }}
            actions={action(Event)}>
            <a onClick={() => this.setState({ mapOpen: true, currentEvent: Event })} ><EnvironmentOutlined /> Event Location </a>
            <p> Event Details : {Event.description}</p>
            <Space>
              {imagelist(Event.images)}
            </Space>

          </Card>
        )
      })
    ) : (
        <div>No Events are currently there!</div>
      )

    return (
      this.state.profilePageLoading ? <LoadingScreen /> :
        <Layout>
          <Sider width={280}
            style={{
              overflow: 'auto', height: '100vh',
              position: 'fixed', left: 0,
              marginTop: '64px',
            }} >
            <Menu
              mode="inline" defaultSelectedKeys={['1']}
              defaultOpenKeys={['1']} style={{ height: '100%', borderRight: 0 }}
              activeKey={selectedMenuItem} style={{ position: "relative" }}
            >
              <SubMenu key="1" title="Events" style={{ fontSize: '16px', height: "100% " }}>
                <div style={{ "padding": "auto" }}>
                  <Checkbox.Group options={plainOptions} onChange={onChange} />
                </div>
              </SubMenu>
            </Menu>
          </Sider>

          <Layout style={{ marginLeft: '280px', marginTop: '64px' }}>
            <Content className="site-layout-background"
              style={{ paddingLeft: 125, minHeight: 280 }}>
              {EventList}
            </Content>
            <Sider width={300} style={{ padding: "25px" }}> </Sider>

          </Layout >
          <Modal footer={[
            <Button onClick={() => this.setState({ mapOpen: false })}>
              Return
            </Button>
          ]} centered closable={false} width={"90vw"} visible={this.state.mapOpen}>
            <MapDiscover latitudeP={this.state.currentEvent?.location.coordinates[1]} longitudeP={this.state.currentEvent?.location.coordinates[0]} message='Event Location' />
          </Modal>


        </Layout >
    )
  }
}

const mapStatetoProps = state => {
  return {
    currentfilter: state.CommunityReducer.currentfilter,
    Events: state.CommunityReducer.Events,
    user: state.authReducer.user,
  };

};
const mapDispatchToProps = (dispatch, getState) => ({
  getEvent: bindActionCreators(getEvent, dispatch),
  changeFilters: bindActionCreators(changeFilters, dispatch),
  setCurrentRoute: bindActionCreators(setCurrentRoute, dispatch)
})

export default connect(mapStatetoProps, mapDispatchToProps)(Community);
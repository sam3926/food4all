import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import moment from 'moment';
import sortBy from 'lodash/sortBy';

import 'antd/dist/antd.css';
import '../../index.css';
import { Modal, Menu, Checkbox, Layout, Card, Button, Input, Space, Image, Form, Avatar } from 'antd';
import { HomeOutlined, PhoneOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

import { pendingDonation, changeFilters, getDonation, getOrganisation } from './actions';
import { addFed, addHistory, rejectDonation, acceptdonation } from '../Profile/action';
import { setCurrentRoute } from '../Navbar/actions';
import LoadingScreen from '../LoadingScreen';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

class Community extends Component {
  state = {
    Events: [
        {title:'Arpit', description:'Card Content'},
    ],
    selectedMenuItem: '1',
    filters: []
  }

  render() {
    const { Events , selectedMenuItem } = this.state;
    const { } = this.props

    const plainOptions = [
      { label: 'Location', value: 'Location' },
      { label: 'Date', value: 'Date' },
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

    const EventList = Events.length ? (
      Events.map(Event => {
        return (
          <Card title={Event.title} style={{ width: 700, margin: '8px' }}>
            <p>{Event.description}</p>
            <Space>
            <Image
              width={100}
              height={100}
              alt="example"
              src={"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}
            />
            </Space>
          </Card>
        )
      })
    ) : (
        <div>No Events are currently there!</div>
      )

    return (
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
              activeKey={selectedMenuItem}
              style={{ position: "relative" }}
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
              style={{
                paddingLeft: 125,
                minHeight: 280,
              }}>
              {EventList}
            </Content>
            <Sider width={300} style={{ padding: "25px" }}>
              

            </Sider>

          </Layout >
        </Layout >
    )
  }
}

const mapStatetoProps = state => {
  return {
    currentfilter: state.CommunityReducer.currentfilter,
    Events: state.CommunityReducer.Events
  };

};
const mapDispatchToProps = (dispatch, getState) => ({
  changeFilters: bindActionCreators(changeFilters, dispatch),
})

export default connect(mapStatetoProps, mapDispatchToProps)(Community);
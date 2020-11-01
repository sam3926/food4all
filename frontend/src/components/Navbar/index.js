import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";

import { Layout, Menu, Button, Input, Modal } from 'antd';
import {
  HeartFilled, LogoutOutlined, HomeOutlined, BellOutlined, TrophyOutlined,
  UsergroupDeleteOutlined, BulbOutlined, UserOutlined,
  MessageOutlined
} from '@ant-design/icons';
import "./styles.css"

import { setCurrentRoute } from './actions';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../Auth/action';
import DonateModal from '../DonateModal';

const { Header } = Layout;
const { Search } = Input;


class Navbar extends Component {
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
    const { currentRoute, setCurrentRoute, logoutUser, auth } = this.props;
    if (auth.isAuthenticated)
      return (
        <div>
          <Header style={{ position: 'fixed', zIndex: 100, width: '100%' }}>
            <Menu theme="dark" mode="horizontal" selectedKeys={[currentRoute, "logo"]} onSelect={(item) => { item.key == "logout" ? logoutUser() : setCurrentRoute(item.key) }}>
              <Menu.Item key="logo" className="customclasslogo" icon={<HeartFilled />} ><Link to="/home">NofoodWasted</Link></Menu.Item>
              <Button type="dashed" size={"large"} style={{ "marginRight": "8px", "marginLeft": "8px" }} onClick={this.showModal}>
                Donate Now!
                  </Button>
              <DonateModal handleCancel={this.handleCancel} handleOk={this.handleOk} showModal={this.showModal} visible={visible} loading={loading} />
              <Menu.Item key="home" icon={<HomeOutlined />} ><Link to="/home">Home</Link></Menu.Item>
              <Menu.Item key="discover" icon={<BulbOutlined />}><Link to='/discover'>Discover</Link></Menu.Item>
              <Menu.Item key="community" icon={<TrophyOutlined />} ><Link to="/community">Community</Link></Menu.Item>
              <Menu.Item key="leaderboard" icon={<UsergroupDeleteOutlined />} ><Link to="/leaderboard">Leaderboard</Link></Menu.Item>
              <Menu.Item key="notifications" icon={<BellOutlined />}><Link to="/notifications">Notifications</Link></Menu.Item>
              <Menu.Item key="messages" icon={<MessageOutlined />} ><Link to="/messages">Messages</Link></Menu.Item>
              <Menu.Item key="profile" icon={<UserOutlined />} ><Link to={`/i/profile/${auth.user.userId}`}>Profile</Link></Menu.Item>
              <Menu.Item key="search">
                <Search
                  placeholder="Search"
                  onSearch={value => console.log(value)}
                  style={{ width: 200 }} />
              </Menu.Item>
              <Menu.Item key="logout" icon={<LogoutOutlined />} >Logout</Menu.Item>
            </Menu>
          </Header>

        </div>
      );
    else
      return null;
  }
}

const mapStateToProps = state => ({
  currentRoute: state.navReducer.currentRoute,
  auth: state.authReducer
})

const mapDispatchToProps = dispatch => ({
  setCurrentRoute: bindActionCreators(setCurrentRoute, dispatch),
  logoutUser: bindActionCreators(logoutUser, dispatch)
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));

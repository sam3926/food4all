import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import moment from 'moment';

import { Layout, Menu, Button, Input, Modal, Badge, Popover, Card, Avatar } from 'antd';
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
    let { currentRoute, setCurrentRoute, logoutUser, auth, notifications, unreadNotifications, unreadMessages } = this.props;
    const content = (
      notifications.length ? notifications.map(({ user, notificationType, createdAt }) => (
        <Card style={{ width: 320, margin: '10px 5px' }}>
          <p><Link to={`/profile/${user._id}`}><Avatar src={user.avatar}></Avatar> {user.name}</Link>
            {notificationType == 'follow' ? ' followed you!' : notificationType == 'post' ? ' added a post' : notificationType == 'donation' ? ' made a donation' : notificationType == 'like' ? ' liked your post' : notificationType == 'comment' ? ' commented on your post' : ''}
          </p>
          <span style={{ marginLeft: '5px' }}>{moment(createdAt).fromNow()}</span>
        </Card>
      )) : <div>
          Notifications are Empty
      </div>
    );



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
              <Menu.Item key="notifications"><Badge dot={unreadNotifications ? true : false} ><Popover placement="bottom" content={content} title="Notifications" trigger="click">
                <p>{<BellOutlined />}Notifications</p>
              </Popover></Badge ></Menu.Item>
              <Menu.Item key="messages" ><Badge dot={unreadMessages ? true : false} >
                <Link to="/messages"><p>{<MessageOutlined />}Messages</p></Link>
              </Badge ></Menu.Item>
              <Menu.Item key="profile" icon={<UserOutlined />} ><Link to={`/i/profile/${auth.user.userId}`}>Profile</Link></Menu.Item>
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
  auth: state.authReducer,
  notifications: state.navReducer.notifications,
  unreadNotifications: state.navReducer.unreadNotifications,
  unreadMessages: state.navReducer.unreadMessages
})

const mapDispatchToProps = dispatch => ({
  setCurrentRoute: bindActionCreators(setCurrentRoute, dispatch),
  logoutUser: bindActionCreators(logoutUser, dispatch)
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));

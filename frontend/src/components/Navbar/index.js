import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Menu, Button, Input, Space } from 'antd';
import {
  HeartFilled, LogoutOutlined, HomeOutlined, BellOutlined, TrophyOutlined,
  UsergroupDeleteOutlined, BulbOutlined, UserOutlined,
  MessageOutlined
} from '@ant-design/icons';
import "./styles.css"
import { setCurrentRoute } from './actions';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { logoutUser } from '../Auth/action';

const { Header } = Layout;
const { Search } = Input;



const Navbar = ({ currentRoute, setCurrentRoute, logoutUser, auth }) => {

  if (auth.isAuthenticated) {
    return (
      <div>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[currentRoute]} onSelect={(item) => { item.key == "logout" ? logoutUser() : setCurrentRoute(item.key) }}>
            <Menu.Item key="0" className="customclasslogo" icon={<HeartFilled />} ><Link to="/home">NofoodWasted</Link></Menu.Item>
            <Button type="dashed" size={"large"} style={{ "marginRight": "2px", "marginLeft": "2px" }}>
              Donate Now!
                  </Button>
            <Menu.Item key="home" icon={<HomeOutlined />} ><Link to="/home">Home</Link></Menu.Item>
            <Menu.Item key="discover" icon={<BulbOutlined />}><Link to='/discover'>Discover</Link></Menu.Item>
            <Menu.Item key="community" icon={<TrophyOutlined />} >Community</Menu.Item>
            <Menu.Item key="leaderboard" icon={<UsergroupDeleteOutlined />} >Leaderboard</Menu.Item>
            <Menu.Item key="notifications" icon={<BellOutlined />}>Notifications</Menu.Item>
            <Menu.Item key="messages" icon={<MessageOutlined />} >Messages</Menu.Item>
            <Menu.Item key="profile" icon={<UserOutlined />} ><Link to="/profile">Profile</Link></Menu.Item>
            <Menu.Item>
              <Search
                placeholder="Search"
                onSearch={value => console.log(value)}
                style={{ width: 250 }} />
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} >Logout</Menu.Item>
          </Menu>
        </Header>
      </div>
    )
  } else return null
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

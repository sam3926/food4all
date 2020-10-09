import React from 'react';

import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Menu , Button , Input } from 'antd';
import { LogoutOutlined , HomeOutlined , BellOutlined , TrophyOutlined, 
         UsergroupDeleteOutlined , BulbOutlined , UserOutlined ,
         MessageOutlined } from '@ant-design/icons';
import "./styles.css"

const { Header } = Layout;
const { Search } = Input;



const Navbar = () => {
    return(
            <div>
            <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                  <Button type="dashed" danger>
                    Donate Now
                  </Button>
                  <Menu.Item key="1" icon={ <HomeOutlined /> } >Home</Menu.Item>
                  <Menu.Item key="2" icon={<BulbOutlined />}>Discover</Menu.Item>
                  <Menu.Item key="3" icon={<TrophyOutlined />} >LeaderBoard</Menu.Item>
                  <Menu.Item key="4" icon={<UsergroupDeleteOutlined />} >community</Menu.Item>
                  <Menu.Item key="5" icon={<BellOutlined /> }>Notifications</Menu.Item>
                  <Menu.Item key="6" icon={<MessageOutlined /> } >Messages</Menu.Item>
                  <Menu.Item key="7" icon={<UserOutlined />} >Profile</Menu.Item>
                  <Search
                          placeholder="Search"
                          onSearch={value => console.log(value)}
                          style={{ width: 250 }}/>
                  <Menu.Item key="8" icon={<LogoutOutlined />} >Logout</Menu.Item>
                </Menu>
              </Header>
            </div>
        )
}

export default Navbar;

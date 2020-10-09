// import React, { useState } from 'react';
// import { Route, Switch as RouterSwitch } from "react-router-dom";

//IMPORT COMPONENTS
// import Home from "./components/Home";
// import Navbar from './components/Navbar';

// import { Switch } from 'antd';
// import { useThemeSwitcher } from 'react-css-theme-switcher';


// const App = () => {

//   const [isDarkMode, setIsDarkMode] = React.useState();
//   const { switcher, currentTheme, status, themes } = useThemeSwitcher();

//   const toggleTheme = (isChecked) => {
//     setIsDarkMode(isChecked);
//     switcher({ theme: isChecked ? themes.dark : themes.light });
//   };

//   // Avoid theme change flicker
//   if (status === "loading") {
//     return null;
//   }


//   return (
//     <div>
//       <Navbar />
//       <Switch checked={isDarkMode} onChange={toggleTheme} />

//       <RouterSwitch>
//         <Route path="/home">
//           <Home />
//         </Route>
//         {/*Put remaining routes here*/}
//       </RouterSwitch>

//     </div>
//   )
// }

// export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu , Checkbox , Card, Avatar , Button , Input } from 'antd';
import { AudioOutlined , LogoutOutlined , CommentOutlined , HomeOutlined , BellOutlined , TrophyOutlined , UsergroupDeleteOutlined , BulbOutlined , UserOutlined , EditOutlined, EllipsisOutlined, LikeOutlined , MessageOutlined , GiftOutlined , ShareAltOutlined } from '@ant-design/icons';
const { Header, Content , Sider } = Layout;

const { SubMenu } = Menu;

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

ReactDOM.render(
  <Layout className="layout">
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
    <Layout>
      <Sider width={300} className="site-layout-background">
        <Menu
          mode="inline"
          defaultOpenKeys={['sub5']}
          style={{ height: '100%', borderRight: 0 }}
        >
          
           <Menu.Item key="1">
             
              <Avatar
            size={36}
            style={{
            backgroundColor: '#87d068',
            //allign:
            //align: center,
            }}
            icon={<UserOutlined />}
            />
              Shreyansh Mehra
             </Menu.Item>

          <SubMenu key="sub1" title="Profile Description">
          <Menu.Item key="2">User profile</Menu.Item>
          </SubMenu>
          <Button type="primary" block danger>
          Add Donation
          </Button>
          
          <SubMenu key="sub2" title="xx Following">
          <Menu.Item key="2">xyz</Menu.Item>
          <Menu.Item key="3">xyz</Menu.Item>
          </SubMenu>

          <SubMenu key="sub3" title="Recent Donations">
          <Menu.Item key="4">xyz</Menu.Item>
          <Menu.Item key="5">xyz</Menu.Item>
          </SubMenu>

          <SubMenu key="sub4" title="Recent Acheivements">
            <Menu.Item key="6">xyz</Menu.Item>
            <Menu.Item key="7">xyz</Menu.Item>
          </SubMenu>

          <SubMenu key="sub5" title="Filters">
           <div class="check" >
            <Checkbox defaultChecked onChange={onChange}>Donations</Checkbox>
            <Checkbox onChange={onChange}>Events</Checkbox>
            <Checkbox onChange={onChange}>Posts</Checkbox>
           </div>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
      <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
        
      <Card title="User Name" style={{ width: 1000 }} 
      actions={[
      <LikeOutlined key="Like" />,
      <ShareAltOutlined key="share" />,
      <CommentOutlined key="Comment" />,
      <GiftOutlined key="Award" />,
      ]} >
      <p>Card content</p>
      </Card>
      <br />
      <Card title="User Name" style={{ width: 1000 }} 
       actions={[
      <LikeOutlined key="Like" />,
      <ShareAltOutlined key="share" />,
      <CommentOutlined key="Comment" />,
      <GiftOutlined key="Award" />,
      ]} >
      <p>Card content</p>
      </Card>
      <br /> 
      <Card title="User Name" style={{ width: 1000 }}
        actions={[
      <LikeOutlined key="Like" />,
      <ShareAltOutlined key="share" />,
      <CommentOutlined key="Comment" />,
      <GiftOutlined key="Award" />,
      ]}
      >
      <p>Card content</p>
      </Card>
          
        </Content>

  </Layout>
  </Layout>
  </Layout>
);

export default App;
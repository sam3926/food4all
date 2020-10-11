import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import {   Layout, Menu , Image , Input , Card , Tabs , Timeline , Checkbox , List , Avatar , Button  } from 'antd';
import { AudioOutlined , LogoutOutlined , CommentOutlined , HomeOutlined , BellOutlined , TrophyOutlined , UsergroupDeleteOutlined , BulbOutlined , EditOutlined, EllipsisOutlined, LikeOutlined , MessageOutlined , GiftOutlined , ShareAltOutlined ,   ClockCircleOutlined ,  UserOutlined} from '@ant-design/icons';

const { Search } = Input;
const { SubMenu } = Menu;

const { TabPane } = Tabs; 

function callback(key) {
  console.log(key);
}

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const { Header, Content , Sider } = Layout;

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

const Demo = () => (
  <Tabs defaultActiveKey="1" onChange={callback} tabPosition={"left"}>
    <TabPane tab="Donations" key="1">
      <b> List of Nearby Donations </b>
      <Card title="User Name" style={{ width: 500 }}>
      <p>Card content</p>
      </Card>
          
      <Card title="User Name" style={{ width: 500 }}>
      <p>Card content</p>
      </Card>

      <Card title="User Name" style={{ width: 500 }}>
      <p>Card content</p>
      </Card>
    </TabPane>
    <TabPane tab="Nearby Organisations" key="2">
      <b> List of nearby Organsations </b>
      <Card title="User Name" style={{ width: 500 }}>
      <p>Card content</p>
      </Card>
          
      <Card title="User Name" style={{ width: 500 }}>
      <p>Card content</p>
      </Card>

      <Card title="User Name" style={{ width: 500 }}>
      <p>Card content</p>
      </Card>
    </TabPane>
    <TabPane tab="Nearby Events/Activities" key="3">
      <b> List of nearby Events/Activities </b>
      <Card title="User Name" style={{ width: 500 }}>
      <p>Card content</p>
      </Card>
          
      <Card title="User Name" style={{ width: 500 }}>
      <p>Card content</p>
      </Card>

      <Card title="User Name" style={{ width: 500 }}>
      <p>Card content</p>
      </Card>
    </TabPane>
  </Tabs>
);

ReactDOM.render(
  <Layout className="layout">
  <Header> 
  <div className="logo" />
  <Menu theme="dark" mode="horizontal" >
        <SubMenu key="SubMenu" title="Donate Now">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="s1">Option 1</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="s2">Option 2</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="1" icon={ <HomeOutlined /> } >Home</Menu.Item>
        <Menu.Item key="2" icon={<BulbOutlined />}>Discover</Menu.Item>
        <Menu.Item key="3" icon={<TrophyOutlined />} >LeaderBoard</Menu.Item>
        <Menu.Item key="4" icon={<UsergroupDeleteOutlined />} >community</Menu.Item>
        <Menu.Item key="5" icon={<BellOutlined /> }>Notifications</Menu.Item>
        <Menu.Item key="6" icon={<MessageOutlined /> } >Messages</Menu.Item>
        <Menu.Item key="7" icon={<UserOutlined />} >Profile</Menu.Item>
        <Menu.Item key="8" icon={<LogoutOutlined />} >Logout</Menu.Item>
        <Search
                placeholder="Search"
                onSearch={value => console.log(value)}
                style={{ width: 250 }}/>
      </Menu>
    </Header>
      <Layout style={{ padding: '0 24px 24px' }}>
      <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Demo />
        </Content>
  </Layout>
  </Layout>,
  document.getElementById('container'),
);
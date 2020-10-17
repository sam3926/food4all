import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
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
class Discover extends Component{
   
  render () {
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
      return (
        <Layout className="layout">
            <Layout style={{ padding: '0 24px 24px' }}>
            <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 70,
                  minHeight: 280,
                }}
              >
                <Demo />
              </Content>
        </Layout>
        </Layout>
      )
  }
}

export default Discover;
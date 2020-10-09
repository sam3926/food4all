import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getSomeData } from './action';
import { Route, Switch as RouterSwitch } from "react-router-dom";

import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Menu , Checkbox , Card, Avatar , Button , Input } from 'antd';
import { LogoutOutlined , CommentOutlined , HomeOutlined , BellOutlined , TrophyOutlined, 
         UsergroupDeleteOutlined , BulbOutlined , UserOutlined , LikeOutlined ,
         MessageOutlined , GiftOutlined , ShareAltOutlined } from '@ant-design/icons';
import { useThemeSwitcher } from 'react-css-theme-switcher';

import "./styles.css"

const { Header, Content , Sider } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            someStateVariable: "hi"
        }
    }
    onchange = (e)=> {
        console.log(`checked = ${e.target.checked}`);
      }
      
    render() {
        const { someData } = this.props;
        const { someStateVariable } = this.state
        return (
            <div>
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
                    <Checkbox defaultChecked onChange={()=>onchange}>Donations</Checkbox>
                    <Checkbox onChange={onchange}>Events</Checkbox>
                    <Checkbox onChange={onchange}>Posts</Checkbox>
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
            </div>
        )
    }
}

const mapStateToProps = state => ({
    someData: state.homeReducer.someData
})

const mapDispatchToProps = dispatch => ({
    getSomeData: bindActionCreators(getSomeData, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
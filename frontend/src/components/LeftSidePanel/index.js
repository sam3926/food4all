import React, { Component } from 'react'

import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Menu , Checkbox , Avatar , Button, Space  } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const { Sider } = Layout;
const { SubMenu } = Menu;

class LeftSidePanel extends Component{
    render() {
        const plainOptions = ['Donations', 'Events', 'Posts'];
        return(
            
            <Sider width={300} className="site-layout-background" 
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    marginTop: '64px',
                }}
              >
                <Menu
                mode="inline"
                defaultOpenKeys={['sub5']}
                style={{ height: '100%', borderRight: 0 }}
                >
                
                <Menu.Item key="1">
                    <Space>
                    
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
                    </Space>
                    </Menu.Item>

                <SubMenu key="sub1" title="Profile Description">
                <Menu.Item key="2">User profile</Menu.Item>
                </SubMenu>
                <div style={{"margin":"8px auto","width":"80%"}}>
                    <Button type="primary"  block danger>
                    Add Donation
                    </Button>
                </div> 
                
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
                {/* <div class="check" >
                    <Checkbox defaultChecked onChange={()=>onchange}>Donations</Checkbox>
                    <Checkbox onChange={onchange}>Events</Checkbox>
                    <Checkbox onChange={onchange}>Posts</Checkbox>
                </div> */}
                <div style={{"padding":"auto"}}>
                    <Checkbox.Group options={plainOptions} defaultValue={['Donations']}  />
                </div>

                </SubMenu>
                </Menu>
            </Sider>  
            
        
        )
    }
}

export default LeftSidePanel;
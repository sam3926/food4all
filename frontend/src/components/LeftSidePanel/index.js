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
                style={{ height: '90%', borderRight: 0, marginTop: '26px', marginBottom: '20px'}}
                >
                
                <Menu.Item key="1" style={{fontSize: '20px', marginBlock: '10px'}}>
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

                {/* <SubMenu key="sub1" title="Profile Description">
                <Menu.Item key="2">User profile</Menu.Item>
                </SubMenu> */}
                
                <SubMenu key="sub2" title="Following" style={{fontSize: '16px'}}>
                    <Menu.Item key="a1">Arpit</Menu.Item>
                    <Menu.Item key="a2">Krishnendu</Menu.Item>
                    <Menu.Item key="a3">Dinkar</Menu.Item>
                    <Menu.Item key="a4">...view all</Menu.Item>
                </SubMenu>
                {/* <div style={{"margin":"8px auto","width":"80%"}}>
                    <Button type="primary"  block danger>
                    Add Donation
                    </Button>
                </div>  */}
        
                <SubMenu key="sub3" title="Recent Donations" style={{fontSize: '16px'}}>
                <Menu.Item key="b1">xyz</Menu.Item>
                <Menu.Item key="b2">xyz</Menu.Item>
                <Menu.Item key="b3">...view all</Menu.Item>
                </SubMenu>
        
                <SubMenu key="sub4" title="Recent Acheivements" style={{fontSize: '16px'}}>
                    <Menu.Item key="c1">Leaderboard Top 3!</Menu.Item>
                    <Menu.Item key="c2">Top donor, March '20</Menu.Item>
                </SubMenu>
        
                <SubMenu key="sub5" title="Filters" style={{fontSize: '16px'}}>
            
                    <div style={{"padding":"auto"}}>
                        <Checkbox.Group options={plainOptions} defaultValue={plainOptions}  />
                    </div>

                </SubMenu>
                </Menu>
            </Sider>  
            
        
        )
    }
}

export default LeftSidePanel;
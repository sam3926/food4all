import React, { Component } from 'react'
import {connect} from 'react-redux'
import {changeFilters} from './action'
import { bindActionCreators } from 'redux';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Menu , Checkbox , Avatar , Button, Space  } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const { Sider } = Layout;
const { SubMenu } = Menu;

 
class LeftSidePanel extends Component{
    render() {
        const {userDetails,following,achievements,donations} = this.props
        const plainOptions = [
            { label: 'Donations', value: 'Donations' },
            { label: 'Events', value: 'Events' },
            { label: 'Posts', value: 'Posts' },
          ];
        const onChange = (checkedValues) =>{
            this.props.changeFilters(checkedValues)
            //console.log('checked = ', checkedValues);
        }
         
        const followerList = following.length? (
            following.map(follower =>{
                return(
                    <Menu.Item key={follower.id}>{follower.name}</Menu.Item>
                )
            })
            
        ):(
            <Menu.item> No following yet! </Menu.item>
        )
        
        const achievementList = achievements.length? (
            achievements.map(achievement =>{
                return(
                    <Menu.Item key={achievement.id}>{achievement.title}</Menu.Item>
                )
            })
            
        ):(
            <Menu.item> No following yet! </Menu.item>
        ) 
        
        const donationList = donations.length? (
            donations.map(donation =>{
                return(
                    <Menu.Item key={donation.id}>{donation.name}</Menu.Item>
                )
            })
            
        ):(
            <Menu.item> No following yet! </Menu.item>
        )
        

        return(
            
            <Sider width={300} className="site-layout-background" 
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    marginTop: '40px',
                }}
              >
                <Menu
                mode="inline"
                defaultOpenKeys={['sub5']}
                style={{ height: '100%', borderRight: 0, paddingTop: '40px'}}
                >
                
                <Menu.Item key="Sub1" style={{fontSize: '20px', marginBlock: '10px'}}>
                    <Space>
                        <Avatar size={36}
                        style={{
                        backgroundColor: '#87d068',
                        }}
                        //-------------Upload profile pic here---------------
                        icon={<UserOutlined />}
                        />
                        {userDetails.name}
                    </Space>
                </Menu.Item>

                <SubMenu key="sub2" title="Following" style={{fontSize: '16px'}}>
                    {followerList}
                </SubMenu>

                <SubMenu key="sub3" title="Recent Donations" style={{fontSize: '16px'}}>
                    {donationList}
                </SubMenu>
        
                <SubMenu key="sub4" title="Recent Acheivements" style={{fontSize: '16px'}}>
                    {achievementList}
                </SubMenu>
        
                <SubMenu key="sub5" title="Filters" style={{fontSize: '16px'}}>
                    <div style={{"padding":"auto"}}>
                        <Checkbox.Group options={plainOptions} onChange={onChange} />
                    </div>
                </SubMenu>
                </Menu>
            </Sider>  
            
        
        )
    }
}
const mapStatetoProps = state => {
    return {
        userDetails:state.LeftSidePanelReducer.userDetails,
        following:state.LeftSidePanelReducer.following,
        donations:state.LeftSidePanelReducer.donations,
        achievements:state.LeftSidePanelReducer.achievements
    };
    
};
const mapDispatchToProps = dispatch => ({
    changeFilters : bindActionCreators(changeFilters, dispatch)
})

export default connect(mapStatetoProps,mapDispatchToProps)(LeftSidePanel);


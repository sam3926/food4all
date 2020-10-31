import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeFilters, getLeftDetails, initialiseState } from './action'

import { bindActionCreators } from 'redux';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Menu, Checkbox, Avatar, Button, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { setCurrentRoute } from '../Navbar/actions';


const { Sider } = Layout;
const { SubMenu } = Menu;


class LeftSidePanel extends Component {

    componentDidMount() {
        this.props.getLeftDetails();
    }
    render() {
        const { following, followers, achievements, donations, name, avatar } = this.props.profileDetails
        console.log('donations ', donations)

        const plainOptions = [
            { label: 'Donations', value: 'Donations' },
            { label: 'Events', value: 'Events' },
            { label: 'Posts', value: 'Posts' },
        ];
        const onChange = (checkedValues) => {
            this.props.changeFilters(checkedValues)
            //console.log('checked = ', checkedValues);
        }

        const followerList = followers.length ? (
            followers.map(follower => {
                return (
                    <Link onClick={() => this.props.setCurrentRoute('profile')} to={`/profile/${follower._id}`}>
                        <Menu.Item key={follower._id} style={{ paddingLeft: "36px", marginBottom: "10px" }}>
                            <Avatar size={25}
                                src={follower.avatar}
                                style={{
                                    backgroundColor: '#87d068',
                                    marginRight: "4px"
                                }}
                            //-------------Upload profile pic here---------------
                            // icon={<UserOutlined />}
                            />
                            {follower.name}</Menu.Item>
                    </Link>

                )
            })

        ) : (
                <Menu.Item key='1' > No followers yet! </Menu.Item>
            )

        const followingList = following.length ? (
            following.map(follower => {
                return (
                    <Link onClick={() => this.props.setCurrentRoute('profile')} to={`/profile/${follower._id}`}>
                        <Menu.Item key={follower._id} style={{ paddingLeft: "36px", marginBottom: "10px" }}>
                            <Avatar size={25}
                                src={follower.avatar}
                                style={{
                                    backgroundColor: '#87d068',
                                    marginRight: "4px"
                                }}
                            //-------------Upload profile pic here---------------
                            // icon={<UserOutlined />}
                            />
                            {follower.name}</Menu.Item>
                    </Link>

                )
            })

        ) : (
                <Menu.Item key='1' > You are not following anyone! </Menu.Item>
            )

        const donationList = donations?.length ? (
            donations.map(donation => {
                return (
                    <Menu.Item key={donation}>{donation}</Menu.Item>
                )
            })

        ) : (
                <Menu.Item key="1"> No donations yet! </Menu.Item>
            )


        const achievementList = achievements?.length ? (
            achievements.map(achievement => {
                return (
                    <Menu.Item key={achievement.id}>
                        {achievement.title}</Menu.Item>
                )
            }))
            : (
                <Menu.Item key="1"> No achievements yet! </Menu.Item>
            )



        return (

            <Sider width={280} className="site-layout-background"
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
                    style={{ height: '100%', borderRight: 0, paddingTop: '40px' }}
                >

                    <Menu.Item key="Sub1" style={{ fontSize: '16px', marginBlock: '10px' }}>
                        <Space>
                            <Avatar size={36}
                                src={avatar}
                                style={{
                                    backgroundColor: '#87d068',
                                }}
                                //-------------Upload profile pic here---------------
                                icon={<UserOutlined />}
                            />
                            {name}
                        </Space>
                    </Menu.Item>

                    <SubMenu key="sub2" title="Followers" style={{ fontSize: '16px' }}>
                        {followerList}
                    </SubMenu>

                    <SubMenu key="sub3" title="Following" style={{ fontSize: '16px' }}>
                        {followingList}
                    </SubMenu>

                    <SubMenu key="sub4" title="Recent Donations" style={{ fontSize: '16px' }}>
                        {donationList}
                    </SubMenu>

                    {/* <SubMenu key="sub5" title="Recent Acheivements" style={{ fontSize: '16px' }}>
                        {achievementList}
                    </SubMenu> */}

                    <SubMenu key="sub6" title="Filters" style={{ fontSize: '16px' }}>
                        <div style={{ "padding": "auto" }}>
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
        profileDetails: state.LeftSidePanelReducer.profileDetails,
    };

};
const mapDispatchToProps = dispatch => ({
    changeFilters: bindActionCreators(changeFilters, dispatch),
    getLeftDetails: bindActionCreators(getLeftDetails, dispatch),
    setCurrentRoute: bindActionCreators(setCurrentRoute, dispatch)
})

export default connect(mapStatetoProps, mapDispatchToProps)(LeftSidePanel);


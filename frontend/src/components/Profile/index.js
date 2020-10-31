import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import 'antd/dist/antd.css';
import { AudioOutlined, LogoutOutlined, CommentOutlined, HomeOutlined, BellOutlined, TrophyOutlined, UsergroupDeleteOutlined, BulbOutlined, EditOutlined, EllipsisOutlined, LikeOutlined, MessageOutlined, GiftOutlined, ShareAltOutlined, ClockCircleOutlined, UserOutlined, PhoneOutlined, MoreOutlined, TeamOutlined, SendOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import ListModal from '../ListModal';
import EditProfile from './EditProfile';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getSomeData, changeTab, getProfile, followUser, unfollowUser, getFollowers, getFollowing } from './action';

import { Layout, Menu, Modal, Image, Input, Card, Tabs, Timeline, Checkbox, List, Avatar, Button, Dropdown, Divider, Space, InputNumber } from 'antd';
import ProfilePic from './ProfilePic';
// import { CheckOutlined, CloseOutlined, AudioOutlined, LogoutOutlined, CommentOutlined, HomeOutlined, BellOutlined, TrophyOutlined, UsergroupDeleteOutlined, BulbOutlined, EditOutlined, EllipsisOutlined, LikeOutlined, MessageOutlined, GiftOutlined, ShareAltOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import "./styles.css"
import FollowersList from './FollowersList';
import { Link } from 'react-router-dom';
import { setCurrentRoute } from '../Navbar/actions';
const { Search } = Input;
const { SubMenu } = Menu;

const { TabPane } = Tabs;
const { Header, Content, Sider } = Layout;

class Profile extends Component {

  state = {
    // PendingDonations: [
    //   {donorname:'Arpit',posttime:'123',Description:'Brief description'}
    // ],
    followersVisible: false,
    followingVisible: false,
    loadingAccept: false,
    visibleAccept: false,
    visibleEdit: false,
    visibleProfilePic: false,
    loadingEdit: false,
    clicked: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  showModalAccept = () => {
    this.setState({
      visibleAccept: true
    });
    //console.log(this.state.visibleAccept);
  };

  handleOkAccept = () => {
    this.setState({ loadingAccept: true });
    setTimeout(() => {
      this.setState({ loadingAccept: false, visibleAccept: false });
    }, 1000);
    Modal.success({
      content: "Donation Shared on profile"
    });
  };

  handleCancelAccept = () => {
    this.setState({ visibleAccept: false });
  };

  handleCancelProfilePic = () => {
    this.setState({ visibleProfilePic: false })
  }

  showModalEdit = () => {
    this.setState({
      visibleEdit: true,
    });
  };

  handleOkEdit = () => {
    this.setState({ loadingEdit: true });
    setTimeout(() => {
      this.setState({ loadingEdit: false, visibleEdit: false });
    }, 1000);
  };

  handleCancelEdit = () => {
    this.setState({ visibleEdit: false });
  };

  callback = (key) => {
    console.log(key);
  }

  componentDidMount() {
    this.props.getProfile(this.props.match.params.id)
  }
  render() {

    const { followersVisible, followingVisible, loadingAccept, visibleAccept, visibleEdit, loadingEdit, visibleProfilePic } = this.state;
    const { suggestedPages, PendingDonations, currentTab, changeTab, donations, timelinePost, posts, profileDetails, user, followUser, unfollowUser, getFollowers, getFollowing, followers, following } = this.props

    const imagelist = (images) => {
      return images.length ? (
        images.map(image => {
          return (
            <Image
              width={100}
              height={100}
              alt="example"
              src={image}
            />
          )
        })
      ) : (<div> No images!</div>)
    }

    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            3rd menu item
          </a>
        </Menu.Item>
      </Menu>
    );

    const Actions = [
      <div><LikeOutlined key="Like" style={{ margin: "8px" }} />20</div>,
      <div><ShareAltOutlined key="share" style={{ margin: "8px" }} />30</div>,
      <div onClick={this.showModalComments} ><CommentOutlined hoverable={true} key="Comment" style={{ margin: "8px" }} />20</div>,
      <div><GiftOutlined key="Award" style={{ margin: "8px" }} />20</div>,
    ]

    const Demo = () => (
      <Tabs centered="true" size="large"
      // activeKey={currentTab}
      // onChange={changeTab}
      >

        <TabPane tab="Timeline" key="timelinePost">
          <Timeline mode="alternate">

            {profileDetails?.history?.map(timelinepost => (
              <Timeline.Item color={timelinepost?.color} dot={timelinepost?.dot == "clock" ? <ClockCircleOutlined /> : null}>{timelinepost.text}</Timeline.Item>
            ))}

          </Timeline>

        </TabPane>


        <TabPane tab="Donations" key="donations">
          {
            //Add donation card here : donation title, body, photos plus show whether donation active or accepted (see reducer for sample data entry)
          }
          {profileDetails?.donations?.map(donation => (
            <Card title={donation.title} extra={<div>{donation.status}</div>} style={{ marginLeft: '75px', marginRight: '75px', marginTop: '8px' }}>
              <p>{donation.description}</p>
              <Space>
                {imagelist(donation.imageurl)}
              </Space>
            </Card>
          )
          )}
        </TabPane>

        <TabPane tab="Posts" key="posts">



          {profileDetails?.posts?.map(post => (
            <Card title={post.title} extra={<div>{post.user_name}<br></br>{post.date}</div>} style={{ marginLeft: '75px', marginRight: '75px', marginTop: '8px' }} actions={Actions}>
              <p>{post.description}</p>
            </Card>
          ))}
        </TabPane>
        <TabPane tab="Acheivements" key="achievements" >
          <p style={{ fontSize: "20px", textAlign: "center" }}> Coming Soon!</p>
        </TabPane>
      </Tabs>
    );

    const PendingDonationList = PendingDonations.length ? (
      PendingDonations.map(PendingDonation => {
        return (
          <Card title={PendingDonation.donorname} extra={<p>{PendingDonation.posttime}</p>} size="small" style={{ width: 250 }}
            actions={[
              <p classname="cardtext1" onClick={this.showModalAccept} ><CheckOutlined hoverable={true} key="Accept" /> Accept </p>,
              <p><CloseOutlined hoverable={true} key="Reject" /> Reject </p>,
            ]}
          >
            <p>{PendingDonation.Description}</p>
          </Card>
        )
      })
    ) : (
        <div>No Donations are currently there!</div>
      )

    return (
      <Layout key={this.props.match.params.id} className="layout" style={{ marginTop: "56px" }}>
        <Layout>
          <Sider width={250} style={{ padding: "20px" }}>
            <List
              itemLayout="horizontal"
              //dataSource={suggestedPages}
              header={
                <div style={{ fontWeight: "bolder", padding: "5px", fontSize: "medium" }}>
                  Suggested pages
                </div>
              }
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<a href="https://www.google.com/">{item.title}</a>}
                    description="brief description"
                  />
                </List.Item>
              )}
            />
          </Sider>
          <Layout >
            <Content
              // className="site-layout-background"
              style={{
                padding: 24,
                marginTop: 24,
                minHeight: 280,
              }}
              key={this.props.match.params.id}
            >
              <div style={{ display: "flex" }}>
                <Image
                  width={250}
                  src={profileDetails?.profilePic}
                />
                <Button
                  shape="circle"
                  style={{ marginLeft: "-15px", zIndex: "10" }}
                  onClick={() => this.setState({ visibleProfilePic: true })}>
                  <EditOutlined />
                </Button>
                <div style={{ marginLeft: "20px", display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                  <p style={{ "fontSize": "24px", marginBottom: "0px", fontWeight: 500 }}>{profileDetails.name}</p>

                  <div>
                    <p>{profileDetails?.description}</p>

                    <PhoneOutlined /> <span style={{ fontWeight: 500, marginRight: "20px" }}>{profileDetails?.contact}</span>
                    <HomeOutlined /> <span style={{ fontWeight: 500 }}>{profileDetails?.address}</span>
                  </div>
                  <div style={{ marginLeft: "-16px", marginTop: "6px" }}>
                    <Button type="link" size="large" style={{ fontWeight: "bolder" }} onClick={() => {
                      getFollowers(this.props.match.params.id);
                      this.setState({ followersVisible: true })
                    }}>
                      {profileDetails?.followers?.length} Followers
          </Button>
                    <Button type="link" size="large" style={{ fontWeight: "bolder" }} onClick={() => {
                      getFollowing(this.props.match.params.id)
                      this.setState({ followingVisible: true })
                    }}>
                      {profileDetails?.following?.length} Following
          </Button>
                    <FollowersList title="Followers" data={this.props.followers} handleCancel={() => this.setState({ followersVisible: false })} showModal={() => this.setState({ followersVisible: true })} visible={followersVisible} />
                    <FollowersList title="Following" data={this.props.following} handleCancel={() => this.setState({ followingVisible: false })} showModal={() => this.setState({ followingVisible: true })} visible={followingVisible} />

                    {user.userId === this.props.match.params.id ?
                      (<span style={{ float: "right", marginTop: "6px" }}>
                        <Button onClick={this.showModalEdit} type="primary" style={{ marginRight: "8px" }}  >
                          <EditOutlined /> Edit Profile
                      </Button>
                        <EditProfile handleCancel={this.handleCancelEdit} handleOk={this.handleOkEdit} showModal={this.showModalEdit} visible={visibleEdit} loading={loadingEdit} />
                        <ProfilePic visible={visibleProfilePic} handleCancel={this.handleCancelProfilePic} />
                      </span>
                      ) : (<span style={{ float: "right", marginTop: "6px" }}>
                        <>
                          {
                            profileDetails?.followers.find(f => f == user.userId) ?
                              <Button type="primary" style={{ marginRight: "14px" }} onClick={() => unfollowUser(this.props.match.params.id)} >
                                <p> <TeamOutlined /> Following </p>
                              </Button> :
                              <Button type="primary" style={{ marginRight: "14px" }} onClick={() => followUser(this.props.match.params.id)}>
                                <p> <TeamOutlined /> Follow </p>
                              </Button>
                          }
                          <Link onClick={() => this.props.setCurrentRoute('messages')} to={{ pathname: '/messages', state: { user: this.props.match.params.id } }}>
                            <Button type="primary" style={{ marginRight: "14px" }}>
                              <SendOutlined /> Message
                        </Button>
                          </Link>

                        </>

                      </span>)}
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    <p style={{ fontWeight: 600 }}>
                      <span >{profileDetails?.name} has fed {profileDetails?.noFed} people and made {profileDetails?.noDonations} donations overall!</span>
                    </p>
                  </div>
                </div>
              </div>
              {/*
              <div>
                <p style={{ fontWeight: 600 }}>User has fed 324 No. of people since last month.</p>
              </div>
              */}
              <Divider style={{ "background": "rgba(151,3,62, 0.2)" }} />
              <Demo />

            </Content>
            {user.userId === this.props.match.params.id ?
              <Sider width={300} style={{ padding: "20px" }}>
                {
                  //add title div here 
                }
                <div style={{ fontWeight: "bolder", paddingBottom: "15px", paddingTop: "15px", fontSize: "medium" }}>Pending Donations</div>

                <div>
                  {PendingDonationList}
                </div>
              </Sider>
              : null}
          </Layout>
        </Layout >

        <Modal
          visible={visibleAccept}
          title="Accept Donation"
          onOk={this.handleOkAccept}
          onCancel={this.handleCancelAccept}
          footer={[
            <Button key="back" onClick={this.handleCancelAccept}>
              Say Thanks
                  </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loadingAccept}
              onClick={this.handleOkAccept}
            >
              Share Donation
                  </Button>
          ]}
        >
          <b> Enter No of people will be fed from this donation ?</b>
          <Input placeholder="Input Number Here" />
          <b> Rate the User</b>
          <Input placeholder="Rate Between 1 to 5" />
        </Modal>


      </Layout >
    )
  };
}

const mapStateToProps = state => ({
  suggestedPages: state.profileReducer.suggestedPages,
  currentTab: state.profileReducer.currentTab,
  donations: state.profileReducer.donations,
  timelinePost: state.profileReducer.timelinePost,
  posts: state.profileReducer.posts,
  PendingDonations: state.profileReducer.Pending,
  profileDetails: state.profileReducer.profileDetails,
  user: state.authReducer.user,
  followers: state.profileReducer.followers,
  following: state.profileReducer.following
})

const mapDispatchToProps = dispatch => ({
  getSomeData: bindActionCreators(getSomeData, dispatch),
  changeTab: bindActionCreators(changeTab, dispatch),
  getProfile: bindActionCreators(getProfile, dispatch),
  followUser: bindActionCreators(followUser, dispatch),
  unfollowUser: bindActionCreators(unfollowUser, dispatch),
  getFollowers: bindActionCreators(getFollowers, dispatch),
  getFollowing: bindActionCreators(getFollowing, dispatch),
  setCurrentRoute: bindActionCreators(setCurrentRoute, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(Profile);

import React, { Component } from 'react';
import moment from 'moment';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import { HomeOutlined, EditOutlined, ClockCircleOutlined, PhoneOutlined, TeamOutlined, SendOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Layout, Form, Modal, Image, Input, Card, Tabs, Timeline, List, Avatar, Button, Divider, Space, Badge } from 'antd';
import "./styles.css"

//import {diamondAward} from '../../awards/diamond.jpg'

import FollowersList from './FollowersList';
import { setCurrentRoute } from '../Navbar/actions';
import LoadingScreen from '../LoadingScreen';
import EditProfile from './EditProfile';
import EventModal from '../EventModal';
import ProfilePic from './ProfilePic';
import { addFed, getSomeData, changeTab, getProfile, followUser, unfollowUser, getFollowers,
   getFollowing, addHistory, getPendingDonations, rejectDonation, editProfile, acceptdonation } from './action';

const { TabPane } = Tabs;
const { Content, Sider } = Layout;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class Profile extends Component {

  state = {
    followersVisible: false,
    followingVisible: false,
    loadingAccept: false,
    visibleAccept: false,
    loadingEvent: false,
    visibleEvent: false,
    visibleEdit: false,
    visibleProfilePic: false,
    loadingEdit: false,
    clicked: false,
    followLoading: false,
    unfollowLoading: false,
    followListLoading: false,
    profilePageLoading: false,
    followingText: "Following"
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

  showModalEvent = () => {
    this.setState({
      visibleEvent: true,
    });
  };

  handleOkEvent = () => {
    this.setState({ loadingEvent: true });
    setTimeout(() => {
      this.setState({ loadingEvent: false, visibleEvent: false });
    }, 500);
    Modal.success({
      content: 'Event posted',
    });
  };

  handleCancelEvent = e => {
    console.log(e);
    this.setState({
      visibleEvent: false,
    });
  };

  showModalAccept = (data) => {
    this.props.acceptdonation(data)
    this.props.addHistory({
      color: 'green',
      icon: 'dot',
      text: data.title + ' ( Donation accepted on ' + moment().format("HH:mm ll") + ' )'
    });
    
    this.setState({
      visibleAccept: true
    });
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

  handleOkEdit = async (user) => {
    this.setState({ loadingEdit: true });
    await this.props.editProfile(user);
    this.setState({ loadingEdit: false, visibleEdit: false })
  };

  handleCancelEdit = () => {
    this.setState({ visibleEdit: false });
  };

  callback = (key) => {
    console.log(key);
  }

  async componentDidMount() {
    this.setState({
      profilePageLoading: true
    })
    await this.props.getProfile(this.props.match.params.id)
    await this.props.getPendingDonations()
    this.setState({
      profilePageLoading: false
    })
  }
  render() {

    const { followersVisible, followingVisible, loadingAccept, visibleAccept , loadingEvent, visibleEvent , visibleEdit, loadingEdit, visibleProfilePic } = this.state;
    const { PendingDonations, profileDetails, user, followUser, unfollowUser, getFollowers, getFollowing } = this.props

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
    
    const Demo = () => (
      <Tabs centered="true" size="large"
      >

        <TabPane tab="Timeline" key="timelinePost">
          <Timeline mode="alternate">

            {profileDetails?.history?.map(timelinepost => (
              <Timeline.Item color={timelinepost?.color} dot={timelinepost?.icon === 'clock' ? <ClockCircleOutlined /> : null}>{timelinepost.text}</Timeline.Item>
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
                {imagelist(donation.images)}
              </Space>
            </Card>
          )
          )}
        </TabPane>

        <TabPane tab="Posts" key="posts">
          {profileDetails?.posts?.map(post => (
            <Card title={post.author} extra={post.DateTime} style={{ marginLeft: '75px', marginRight: '75px', marginTop: '8px' }}>
              <p>{post.description}</p>
            </Card>
          ))}
        </TabPane>
        <TabPane tab="Acheivements" key="achievements" >
          <p style={{ fontSize: "20px", textAlign: "center" }}> Coming Soon!</p>
        </TabPane>
      </Tabs >
    );

    const PendingDonationList = PendingDonations.length ? (
      PendingDonations.map(PendingDonation => {
        return (
          <Card title={PendingDonation.donorName} extra={moment(PendingDonation.postTime).format("HH:mm ll")} size="small" style={{ width: 250 }}
            actions={[
              <p classname="cardtext1" onClick={() => this.showModalAccept(PendingDonation)} ><CheckOutlined hoverable={true} key="Accept" /> Accept </p>,
              <p onClick={() => this.props.rejectDonation(PendingDonation._id)}><CloseOutlined hoverable={true} key="Reject" /> Reject </p>,
            ]}
          >
            <p>{PendingDonation.description}</p>
          </Card>
        )
      })
    ) : (
        <div>No Donations are currently there!</div>
      )

      const onFinish = (values) => {
        this.props.addFed(values.peoplefed)

      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
      this.state.profilePageLoading ? <LoadingScreen /> :
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
                    width={240}
                    src={profileDetails?.profilePic}
                  />
                  <Button
                    shape="circle"
                    style={{ marginLeft: "-15px", zIndex: "10" }}
                    onClick={() => this.setState({ visibleProfilePic: true })}>
                    <EditOutlined />
                  </Button>
                  <div style={{ marginLeft: "8px", display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                    <p style={{ "fontSize": "24px", marginBottom: "0px", fontWeight: 500 }}>{profileDetails.name}</p>

                    <div style={{}}>
                      <p>{profileDetails?.description}</p>
                      <PhoneOutlined /> <span style={{ fontWeight: 500, marginRight: "20px" }}>{profileDetails?.contact}</span>
                      <HomeOutlined /> <span style={{ fontWeight: 500 }}>{profileDetails?.address}</span>
                      <span style={{float: "right", marginLeft: "40px"}}>
                      <span style={{marginRight: "6px" }}>
                        <Badge size="small" count={10} style={{backgroundColor: "#97033e"}}>
                          <Avatar size="small" src = "/images/awards/leaderboardTop.jpg" />
                        </Badge>
                      </span>
                      <span style={{marginRight: "6px" }}>
                        <Badge size="small" count={3} style={{backgroundColor: "#97033e"}}>
                          <Avatar size="small" src = "/images/awards/diamond.jpg" />
                        </Badge>
                      </span>
                      <span style={{marginRight: "6px" }}>
                        <Badge size="small" count={2} style={{backgroundColor: "#97033e"}}>
                          <Avatar size="small" src = "/images/awards/gold.jpg" />
                        </Badge>
                      </span>
                      <span style={{ }}>
                        <Badge size="small" count={2} style={{backgroundColor: "#97033e"}}>
                          <Avatar size="small" src = "/images/awards/silver.jpg" />
                        </Badge>
                      </span>
                      </span>
                    </div>
                    <div style={{ marginLeft: "-16px", marginTop: "6px" }}>
                      <Button type="link" size="large" style={{ fontWeight: "bolder" }} onClick={
                        async () => {
                          this.setState({ followersVisible: true, followListLoading: true })
                          await getFollowers(this.props.match.params.id);
                          this.setState({ followListLoading: false })
                        }}>
                        {profileDetails?.followers?.length} Followers
          </Button>
                      <Button type="link" size="large" style={{ fontWeight: "bolder" }} onClick={
                        async () => {
                          this.setState({ followingVisible: true, followListLoading: true })
                          await getFollowing(this.props.match.params.id)
                          this.setState({ followListLoading: false })
                        }}>
                        {profileDetails?.following?.length} Following
          </Button>
                      <FollowersList title="Followers" data={this.props.followers} handleCancel={() => this.setState({ followersVisible: false })} showModal={() => this.setState({ followersVisible: true })} visible={followersVisible} loading={this.state.followListLoading} />
                      <FollowersList title="Following" data={this.props.following} handleCancel={() => this.setState({ followingVisible: false })} showModal={() => this.setState({ followingVisible: true })} visible={followingVisible} loading={this.state.followListLoading} />

                      {user.userId === this.props.match.params.id ?
                        (<span style={{ float: "right", marginTop: "6px" }}>
                          <Button onClick={this.showModalEdit} type="primary" style={{ marginRight: "8px" }}  >
                            <EditOutlined /> Edit Profile
                      </Button>
                          <EditProfile handleCancel={this.handleCancelEdit} handleOk={this.handleOkEdit} showModal={this.showModalEdit} visible={visibleEdit} loading={loadingEdit} />
                          <ProfilePic visible={visibleProfilePic} handleCancel={this.handleCancelProfilePic} />
                          <Button onClick={this.showModalEvent} type="primary" style={{ marginRight: "8px" }}  >
                              Add Event
                          </Button>
                          <EventModal handleCancel={this.handleCancelEvent} handleOk={this.handleOkEvent} showModal={this.showModalEvent} visible={visibleEvent} loading={loadingEvent} />
                        </span>
                        ) : (<span style={{ float: "right", marginTop: "6px" }}>
                          <>
                            {
                              profileDetails?.followers.find(f => f == user.userId) ?
                                <Button onMouseOver={() => {
                                  this.setState({
                                    followingText: "Unfollow"
                                  })
                                }
                                } onMouseLeave={() => {
                                  this.setState({
                                    followingText: "Following"
                                  })
                                }} loading={this.state.unfollowLoading} type={this.state.followingText == "Unfollow" ? "danger" : "primary"} style={{ marginRight: "14px" }} onClick={async () => {
                                  this.setState({ unfollowLoading: true })
                                  await unfollowUser(this.props.match.params.id)
                                  this.setState({ unfollowLoading: false })
                                }} >
                                  <p> <TeamOutlined /> {this.state.followingText}</p>
                                </Button> :
                                <Button loading={this.state.followLoading} type="primary" style={{ marginRight: "14px" }} onClick={async () => {
                                  this.setState({ followLoading: true })
                                  await followUser(this.props.match.params.id)
                                  this.setState({ followLoading: false })

                                }}>
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
            destroyOnClose
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
                form = 'acceptform'
                htmlType = 'submit'
              >
                Submit
                  </Button>
            ]}
          >
          <Form
            id = 'acceptform'
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
            label="No of people fed ?"
            name="peoplefed"
            rules={[
              {
              required: true,
              message: 'Please input peoplefed',
              },
            ]}
            >
              <Input type='number' placeholder="Input Number Here" />
            </Form.Item>

            <Form.Item
            label="Rate the User"
            name="rating"
            rules={[
              {
              required: true,
              message: 'Please rate the user',
              },
            ]}
            >
              <Input type='number' placeholder="Rate Between 1 to 5" />
            </Form.Item>
          </Form>
          </Modal>


        </Layout >
    )
  };
}

const mapStateToProps = state => {
  console.log(state.profileReducer.profileDetails)
  return ({
    suggestedPages: state.profileReducer.suggestedPages,
    currentTab: state.profileReducer.currentTab,
    donations: state.profileReducer.donations,
    timelinePost: state.profileReducer.profileDetails.history,
    posts: state.profileReducer.posts,
    PendingDonations: state.profileReducer.Pending,
    profileDetails: state.profileReducer.profileDetails,
    user: state.authReducer.user,
    followers: state.profileReducer.followers,
    following: state.profileReducer.following
  })
  
}
  
  
  
const mapDispatchToProps = dispatch => ({
  addFed:bindActionCreators(addFed,dispatch),
  addHistory:bindActionCreators(addHistory,dispatch),
  acceptdonation: bindActionCreators(acceptdonation,dispatch),
  getSomeData: bindActionCreators(getSomeData, dispatch),
  changeTab: bindActionCreators(changeTab, dispatch),
  getProfile: bindActionCreators(getProfile, dispatch),
  followUser: bindActionCreators(followUser, dispatch),
  unfollowUser: bindActionCreators(unfollowUser, dispatch),
  getFollowers: bindActionCreators(getFollowers, dispatch),
  getFollowing: bindActionCreators(getFollowing, dispatch),
  setCurrentRoute: bindActionCreators(setCurrentRoute, dispatch),
  rejectDonation: bindActionCreators(rejectDonation, dispatch),
  getPendingDonations: bindActionCreators(getPendingDonations, dispatch),
  editProfile: bindActionCreators(editProfile, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(Profile);

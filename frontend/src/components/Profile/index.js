import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import 'antd/dist/antd.css';
import { AudioOutlined, LogoutOutlined, CommentOutlined, HomeOutlined, BellOutlined, TrophyOutlined, UsergroupDeleteOutlined, BulbOutlined, EditOutlined, EllipsisOutlined, LikeOutlined, MessageOutlined, GiftOutlined, ShareAltOutlined, ClockCircleOutlined, UserOutlined, PhoneOutlined, MoreOutlined, TeamOutlined, SendOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import ListModal from '../ListModal';
import EditProfile from '../EditProfile';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getSomeData, changeTab, getProfile } from './action';

import { Layout, Menu, Modal, Image, Input, Card, Tabs, Timeline, Checkbox, List, Avatar, Button, Dropdown, Divider } from 'antd';
import ProfilePic from './ProfilePic';
// import { CheckOutlined, CloseOutlined, AudioOutlined, LogoutOutlined, CommentOutlined, HomeOutlined, BellOutlined, TrophyOutlined, UsergroupDeleteOutlined, BulbOutlined, EditOutlined, EllipsisOutlined, LikeOutlined, MessageOutlined, GiftOutlined, ShareAltOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import "./styles.css"
const { Search } = Input;
const { SubMenu } = Menu;

const { TabPane } = Tabs;
const { Header, Content, Sider } = Layout;

class Profile extends Component {

  state = {
    // PendingDonations: [
    //   {donorname:'Arpit',posttime:'123',Description:'Brief description'}
    // ],
    visible: false,
    loadingAccept: false,
    visibleAccept: false,
    visibleEdit: false,
    visibleProfilePic: false,
    loadingEdit: false,
    ButtonTitle: 'Follow',
    clicked: false,
    self: false,
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
  
  changeTitle = () => {
    this.setState({ clicked: !this.state.clicked });
    this.state.clicked ? (this.setState({ ButtonTitle: 'Following'}) ) : ( this.setState({ ButtonTitle: 'Follow' }) ) 
  };

  componentDidMount() {
    this.props.getProfile()
  }
  render() {

    const { visible, loadingAccept, visibleAccept, visibleEdit, loadingEdit,  visibleProfilePic , ButtonTitle ,self } = this.state;
    const { suggestedPages, PendingDonations , currentTab, changeTab, donations, timelinePost, posts, profileDetails } = this.props
    const suffix = (
      <AudioOutlined
        style={{
          fontSize: 16,
          color: '#1890ff',
        }}
      />
    );

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
        activeKey={currentTab}
        onChange={changeTab}
      >

        <TabPane tab="Timeline" key="timelinePost">
          <Timeline mode="alternate">

            {timelinePost?.map(timelinepost => (
              <Timeline.Item color={timelinepost?.color} dot={timelinepost?.dot == "clock" ? <ClockCircleOutlined /> : null}>{timelinepost.text}</Timeline.Item>
            ))}

          </Timeline>

        </TabPane>


        <TabPane tab="Donations" key="donations">
          Add donation card here : donation title, body, photos plus show whether donation active or accepted (see reducer for sample data entry)
        </TabPane>

        <TabPane tab="Posts" key="posts">

          {posts?.map(post => (
            <Card title={post.user_name} style={{ width: 1000 }} actions={Actions}>
              <p>{post.description}</p>
            </Card>
          ))}
        </TabPane>
        <TabPane tab="Acheivements" key="achievements">
          Content of Acheivements
        </TabPane>
      </Tabs>
    );

    const PendingDonationList = PendingDonations.length? (
      PendingDonations.map(PendingDonation=>{
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
    ):(
      <div>No Donations are currently there!</div>
    )

    return (
      <Layout className="layout" style={{ marginTop: "56px" }}>

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
                    <Button type="link" size="large" style={{ fontWeight: "bolder" }} onClick={this.showModal}>
                      {profileDetails?.followers?.length} Followers
          </Button>
                    <Button type="link" size="large" style={{ fontWeight: "bolder" }} onClick={this.showModal}>
                      {profileDetails?.following?.length} Following
          </Button>
                    <ListModal handleCancel={this.handleCancel} handleOk={this.handleOk} showModal={this.showModal} visible={visible} />
                    
                    {self ? (<span style={{ float: "right", marginTop: "6px" }}>
                      <Button onClick={this.showModalEdit} type="primary" style={{ marginRight: "8px" }}  >
                        <EditOutlined /> Edit Profile
                  </Button>
                      <EditProfile handleCancel={this.handleCancelEdit} handleOk={this.handleOkEdit} showModal={this.showModalEdit} visible={visibleEdit} loading={loadingEdit} />
                      <ProfilePic visible={visibleProfilePic} handleCancel={this.handleCancelProfilePic} />
                    </span>
                    ) : (<span style={{ float: "right", marginTop: "6px" }}>
                        <Button type="primary" style={{ marginRight: "14px" }} onClick={this.changeTitle} >
                        <p> <TeamOutlined /> {ButtonTitle} </p>
                        </Button>
                        <Button type="primary" style={{ marginRight: "14px" }}>
                        <SendOutlined /> Message
                        </Button>
                        </span> ) }
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
            <Sider width={300} style={{ padding: "20px" }}>
              {
                //add title div here 
              }

              <div style={{ fontWeight: "bolder", paddingBottom: "15px", paddingTop: "15px", fontSize: "medium" }}>Pending Donations</div>
              <div>
                {PendingDonationList}
              </div>
            </Sider>
          </Layout>
        </Layout>

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


      </Layout>
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
  profileDetails: state.profileReducer.profileDetails
})

const mapDispatchToProps = dispatch => ({
  getSomeData: bindActionCreators(getSomeData, dispatch),
  changeTab: bindActionCreators(changeTab, dispatch),
  getProfile: bindActionCreators(getProfile, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(Profile);

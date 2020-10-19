import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import 'antd/dist/antd.css';
import ListModal from '../ListModal';
import { Layout, Menu, Modal , Image, Input, Card, Tabs, Timeline, Checkbox, List, Avatar, Button } from 'antd';
import { CheckOutlined , CloseOutlined ,AudioOutlined, LogoutOutlined, CommentOutlined, HomeOutlined, BellOutlined, TrophyOutlined, UsergroupDeleteOutlined, BulbOutlined, EditOutlined, EllipsisOutlined, LikeOutlined, MessageOutlined, GiftOutlined, ShareAltOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';

const { Search } = Input;
const { SubMenu } = Menu;

const { TabPane } = Tabs;
const { Header, Content, Sider } = Layout;

class Profile extends Component {
  
  state = {
    visible: false,
    loadingAccept: false,
    visibleAccept: false,
    suggestedPages: [
      {
        title: 'User 1',
      },
      {
        title: 'User 2',
      },
      {
        title: 'User 3',
      },
      {
        title: 'User 4',
      }
    ]
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
    Modal.success({
      content: "You said Thank You"
    });
  };

  callback = (key) => {
    console.log(key);
  }

  render() {
    const { suggestedPages , visible , loadingAccept , visibleAccept } = this.state;
    const suffix = (
      <AudioOutlined
        style={{
          fontSize: 16,
          color: '#1890ff',
        }}
      />
    );
    const Demo = () => (
      <Tabs defaultActiveKey="1" >
        <TabPane tab="Donations" key="1">
          <Timeline mode="alternate">
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
            <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
              beatae vitae dicta sunt explicabo.
        </Timeline.Item>
            <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
              Technical testing 2015-09-01
        </Timeline.Item>
          </Timeline>
        </TabPane>
        <TabPane tab="Posts" key="2">
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
        </TabPane>
        <TabPane tab="Acheivements" key="3">
          Content of Acheivements
        </TabPane>
      </Tabs>
    );

    return (
      <Layout className="layout" style={{ marginTop: "56px" }}>
        {/* <Header> 
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" >
            <Button type="dashed" danger>
              Donate Now
            </Button>
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
        </Header> */}
        <Layout>
          <Sider width={250} style={{ padding: "20px" }}>
            <List
              itemLayout="horizontal"
              dataSource={suggestedPages}
              header={
                <div>
                  <b>Suggested pages</b>
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
          <Layout style={{ paddingLeft: '24px' }}>
            <Content
              // className="site-layout-background"
              style={{
                // padding: 24,
                marginTop: 24,
                minHeight: 280,
              }}
            >
              <div style={{ display: "flex" }}>
                <Image
                  width={200}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
                <div style={{ marginLeft: "20px" }}>
                  <b>User Name</b>
                  <br />
                  <div>
                    <b>Brief Description about user</b>
                    <br />
          Information about his contact Number and address
          </div>
                  <div>
                    <Button type="link" onClick={this.showModal}>
                      39 Followers
          </Button>
                    <Button type="link" onClick={this.showModal}>
                      53 Following
          </Button>
          <ListModal handleCancel={this.handleCancel} handleOk={this.handleOk} showModal={this.showModal} visible={visible}/>
                  </div>
                </div>

              </div>
              <br />
              <div>
                <p>User has fed 324 No. of people since last month.</p>
              </div>

              <Demo />

            </Content>
            <Sider width={300} style={{ padding: "20px  " }}>
              <div>
              <Card title="User Name" style={{ width: 250 }}
                actions={[
                <p onClick={this.showModalAccept} ><CheckOutlined hoverable={true} key="Accept" /> Accept </p>,
                <p><CloseOutlined hoverable={true} key="Reject" /> Reject </p>,
                ]}
                >
                <p>Card content</p>
                </Card>
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
export default Profile;

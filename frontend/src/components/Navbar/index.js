import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Menu , Button , Input} from 'antd';
import { HeartFilled, LogoutOutlined , HomeOutlined , BellOutlined , TrophyOutlined, 
         UsergroupDeleteOutlined , BulbOutlined , UserOutlined ,
         MessageOutlined } from '@ant-design/icons';
import "./styles.css"
import DonateModal from '../DonateModal';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
const { Header } = Layout;
const { Search } = Input;



class Navbar extends Component{
  state = {
    loading: false,
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
 
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 500);
    Modal.success({
    content: 'Donations posted',
  });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  

  render() {
    const { visible, loading } = this.state;
    return(
            <div>
              <Header style={{ position: 'fixed', zIndex: 1, width: '100%'}}>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                  <Menu.Item key="0" className="customclasslogo" icon={ <HeartFilled /> } ><Link to="/">NofoodWasted</Link></Menu.Item>
                  <Button type="dashed" size={"large"} style={{"marginRight":"2px", "marginLeft":"2px" }} onClick={this.showModal}>
                    Donate Now!
                  </Button>
                  <DonateModal handleCancel={this.handleCancel} handleOk={this.handleOk} showModal={this.showModal} visible={visible} loading={loading}/>
                  <Menu.Item key="1" icon={ <HomeOutlined /> } ><Link to="/">Home</Link></Menu.Item>
                  <Menu.Item key="2" icon={<BulbOutlined />}><Link to='/discover'>Discover</Link></Menu.Item>
                  <Menu.Item key="3" icon={<TrophyOutlined />} >Community</Menu.Item>
                  <Menu.Item key="4" icon={<UsergroupDeleteOutlined />} >Leaderboard</Menu.Item>
                  <Menu.Item key="5" icon={<BellOutlined /> }>Notifications</Menu.Item>
                  <Menu.Item key="6" icon={<MessageOutlined /> } >Messages</Menu.Item>
                  <Menu.Item key="7" icon={<UserOutlined />} ><Link to="/profile">Profile</Link></Menu.Item>
                  <Search
                    placeholder="Search"
                    onSearch={value => console.log(value)}  
                    style={{ width: 250 }}/>
                  <Menu.Item key="8" icon={<LogoutOutlined />} >Logout</Menu.Item>
              </Menu>
              </Header>
              
            </div>
        );
  }
}
export default withRouter(Navbar);

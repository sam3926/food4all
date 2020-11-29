import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import axios from 'axios';
import 'antd/dist/antd.css';
import '../../index.css';
import { Menu, Checkbox, Layout,  Carousel , Table, Tag, Image , Radio} from 'antd';

import { changeFilters, getList } from './actions';
import { setCurrentRoute } from '../Navbar/actions';
import { Link } from 'react-router-dom';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const contentStyle = {
  height: '200px',
  color: '#fff',
  lineHeight: '30px',
  textAlign: 'center',
  background: '#364d79',
  fontSize: '20px'
};




class Leaderboard extends Component {
  state = {
    selectedMenuItem: '1',
    valueF: '1',
    filters: []
  }
  columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      render: text => <p>{text}</p>
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text,user) => <Link onClick={() => this.props.setCurrentRoute('profile')} to={`/profile/${user.id}`}>{text}</Link>
    },
    {
      title: 'Type',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "People Fed",
      dataIndex: "peoplefed",
      key: "peoplefed"
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating"
    }
  ];

  onChangeF = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      valueF: e.target.value,
    });
  };

  async componentDidMount() {
      await this.props.getList();
  }
  modified = (data) => {

    let count = 1;
    return data.map( element => {
      return ({
        rank: count,
        key: count++,
        name: element.name,
        rating: element.rating,
        peoplefed: element.noFed,
        type: element.userType,
        tags:[element.userType],
        id: element._id
      })
    });
  }
  render() {
    
    let { data } = this.props;
    const leaders = data;
    console.log(data);
    data = this.modified(data);
    const { selectedMenuItem , valueF } = this.state;
    
    console.log(leaders[0]);

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
      marginLeft: '30px',
    };

    return (
        <Layout>
          <Sider width={280}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              marginTop: '64px',
            }} >
            <Menu
              mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['1']}
              style={{ height: '100%', borderRight: 0 }} activeKey={selectedMenuItem}
              style={{ position: "relative" }} >
              <SubMenu key="2" title="Filter" style={{ fontSize: '16px', height: "100% " }}>
                <div style={{ "padding": "auto" }}> 
                <Radio.Group onChange={this.onChangeF} value={valueF}>
                  <Radio style={radioStyle} value={1}>
                  People Fed
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                  Rating
                  </Radio>
                </Radio.Group>
                </div>
              </SubMenu>
            </Menu>
          </Sider>

          <Layout style={{ marginLeft: '280px', marginTop: '64px' }}>
            <Content className="site-layout-background"
              style={{
                paddingLeft: 125,
                minHeight: 280,
              }}>
              <div style={{
                width: 700,
                marginTop: '20px'
              }}>
              <Carousel autoplay>
              <div> <div style={contentStyle}>
                <span style={{float: "right", marginTop: "25px", marginRight: "15px"}}>
                <Image
                  width={170}
                  src="images\leaderboard\leaderboard.png"
                />
                </span>
                <p style={{paddingTop: "30px", fontSize:"60px"}}>Leaderboard</p> <p> a look at our top contributors!</p></div>
              </div>
              
              <div> <div style={contentStyle}>
                <span style={{float: "right", marginTop: "25px", marginRight: "15px"}}>
                <Image
                  width={170}
                  src={leaders[0].profilePic}
                />
                </span>
                <p style={{paddingTop: "30px", fontSize:"30px"}}>1. {leaders[0].name} </p> <p> fed {leaders[0].noFed} people</p></div>
              </div>
              <div> <div style={contentStyle}>
                <span style={{float: "right", marginTop: "25px", marginRight: "15px"}}>
                <Image
                  width={170}
                  src={leaders[1].profilePic}
                />
                </span>
                <p style={{paddingTop: "30px", fontSize:"30px"}}>2. {leaders[1].name}</p> <p> fed {leaders[1].noFed}people</p></div>
              </div>
              
              <div> <div style={contentStyle}>
                <span style={{float: "right", marginTop: "25px", marginRight: "15px"}}>
                <Image
                  width={170}
                  src={leaders[2].profilePic}
                />
                </span>
                <p style={{paddingTop: "30px", fontSize:"30px"}}>3. {leaders[2].name}</p> <p> fed {leaders[2].noFed} people</p></div>
              </div>

              </Carousel>
              </div>

              <div style={{ width: 700}}>
              <Table columns={this.columns} dataSource={data} />
              </div>

            </Content>
            <Sider width={300} style={{ padding: "25px" }}>
            </Sider>

          </Layout >
        </Layout >
    )
  }
}

const mapStatetoProps = state => {
  return {
    currentfilter: state.LeaderboardReducer.currentfilter,
    data: state.LeaderboardReducer.list
  };

};
const mapDispatchToProps = (dispatch) => ({
  setCurrentRoute: bindActionCreators(setCurrentRoute,dispatch),
  getList: bindActionCreators(getList,dispatch),
  changeFilters: bindActionCreators(changeFilters, dispatch),
})

export default connect(mapStatetoProps, mapDispatchToProps)(Leaderboard);
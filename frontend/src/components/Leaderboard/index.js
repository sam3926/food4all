import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import axios from 'axios';
import 'antd/dist/antd.css';
import '../../index.css';
import { Menu, Checkbox, Layout,  Carousel , Table, Tag, Image } from 'antd';

import { changeFilters, getList } from './actions';

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

const columns = [
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
    render: text => <a>{text}</a>
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

const data = [
  {
    key: "1",
    rank: "1",
    name: "John Brown",
    rating: 32,
    peoplefed: 500,
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    rank: "2",
    name: "Jim Green",
    rating: 42,
    peoplefed: 300,
    tags: ["loser"]
  },
  {
    key: "3",
    rank: "3",
    name: "Joe Black",
    rating: 32,
    peoplefed: 100,
    tags: ["cool", "teacher"]
  }
];

class Leaderboard extends Component {
  state = {
    selectedMenuItem: '1',
    filters: []
  }
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
        rating: 23,
        peoplefed: element.noFed,
        type: element.userType,
        tags:[element.userType]
      })
    });
  }
  render() {
    let { data } = this.props;
    console.log(data);
    data = this.modified(data);
    const { selectedMenuItem } = this.state;
    const plainOptions = [
      { label: 'People Fed', value: 'Peoplefed' },
      { label: 'Rating', value: 'rating' },
    ];
    const plainOptions1 = [
      { label: 'Donor', value: 'donor' },
      { label: 'Organsation', value: 'organisation' },
    ];
    const onChange = (checkedValues) => {
      this.setState({
        filters: [...checkedValues]
      })
    }

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
                <div style={{ "padding": "auto" }}> <Checkbox.Group options={plainOptions} onChange={onChange} /> </div>
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
                  width={200}
                  src="images\leaderboard\leaderboard.png"
                />
                </span>
                <p style={{paddingTop: "40px", fontSize:"60px"}}>Leaderboard</p> <p> a look at our top contributors!</p></div>
              </div>
              
              <div> <div style={contentStyle}>
                <span style={{float: "right", marginTop: "25px", marginRight: "15px"}}>
                <Image
                  width={200}
                  src="images\leaderboard\leaderboard.png"
                />
                </span>
                <p style={{paddingTop: "40px", fontSize:"60px"}}>1. Y </p> <p> X has fed xx people</p></div>
              </div>
              <div> <div style={contentStyle}>
                <span style={{float: "right", marginTop: "25px", marginRight: "15px"}}>
                <Image
                  width={200}
                  src="images\leaderboard\leaderboard.png"
                />
                </span>
                <p style={{paddingTop: "40px", fontSize:"60px"}}>2. Y</p> <p> X has fed xx people</p></div>
              </div>
              
              <div> <div style={contentStyle}>
                <span style={{float: "right", marginTop: "25px", marginRight: "15px"}}>
                <Image
                  width={200}
                  src="images\leaderboard\leaderboard.png"
                />
                </span>
                <p style={{paddingTop: "40px", fontSize:"60px"}}>3. Y</p> <p> X has fed xx people</p></div>
              </div>

              </Carousel>
              </div>

              <div style={{ width: 700}}>
              <Table columns={columns} dataSource={data} />
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
  getList: bindActionCreators(getList,dispatch),
  changeFilters: bindActionCreators(changeFilters, dispatch),
})

export default connect(mapStatetoProps, mapDispatchToProps)(Leaderboard);
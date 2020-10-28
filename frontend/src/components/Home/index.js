import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getSomeData } from './action';
import 'antd/dist/antd.css';
import '../../index.css';
import { BulbOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Layout, List, Avatar, Card,Space, Typography, Divider, Button } from 'antd';
import "./styles.css";

import LeftSidePanel from '../LeftSidePanel';
import HomeCenter from '../HomeCenter';

const { Sider } = Layout;

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            someStateVariable: "hi"
        }
    }
     
    render() {
        return (
                <Layout>
                    <LeftSidePanel/>
                    <Layout style={{ marginTop: '64px' }}>   
                        <HomeCenter/>
                    </Layout>  
                    {
                        //right hand side pane, needs to be made a seperate component
                    } 
                    <Sider width={300} style={{ padding: "25px", marginTop: '48px', right : 0, position: 'fixed', height: '100vh' }}>
                    <List
                        itemLayout="horizontal"
                        //dataSource={savedEvents}
                        header={
                            <div style={{ fontWeight: "bolder", padding: "5px", fontSize: "medium" }}>
                            Saved events
                            </div>
                        }
                        renderItem={item => (
                            <List.Item>
                            <List.Item.Meta
                            /*
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="<add event url here">{item.title}</a>}
                                description="brief description"
                            */
                            />
                            </List.Item>
                        )}
                     />


                     <div style={{marginTop:'20px'}}>

                        <Card size="small" style={{ width: 200 , marginLeft: 25}} bodyStyle={{color: '#97033e', fontWeight:'bold'}} bordered={false}
                            actions={[
                                <p><BulbOutlined hoverable={true} key="learnMoreAwards" /> Learn more </p>,
                                <p><ShoppingCartOutlined hoverable={true} key="buyAwards" /> Buy now! </p>,
                            ]}
                            >
                            <p>
                                <Avatar.Group>
                                <Avatar size="small" src="https://www.clipartmax.com/png/small/119-1190442_shield-batch-star-safe-badge-sheriff-police-icon-badge.png" />
                                <Avatar size="large" src="https://www.clipartmax.com/png/small/216-2160288_shield-badge-star-reward-award-honor-achievement-comments-sheriff-shield.png" />
                                <Avatar size={64} src="https://www.clipartmax.com/png/small/155-1553987_all-finishers-will-receive-a-custom-medal-award-icon.png" />
                                <Avatar size="large" src="https://www.clipartmax.com/png/small/216-2160288_shield-badge-star-reward-award-honor-achievement-comments-sheriff-shield.png" />
                                <Avatar size="small" src="https://www.clipartmax.com/png/small/119-1190442_shield-batch-star-safe-badge-sheriff-police-icon-badge.png" />
                                </Avatar.Group>
                                NofoodWasted awards are the best way to show your appreciation for work of other users!</p>
                        </Card>
                     </div>

                     <div style={{marginTop:'64px', marginLeft:0}}>
                     <Space split={<Divider type="vertical" style={{color: 'black', paddingLeft: '5px'}} />}>
                        <Button type="link">About</Button>
                        <Button type="link">Help</Button>
                        <Button type="link">Contact us</Button>

                    </Space>
                    {
                        //can add logo here
                    }
                    </div>
                    </Sider>	                    
                </Layout>
        )
    }
}

const mapStateToProps = state => ({
    someData: state.homeReducer.someData
})

const mapDispatchToProps = dispatch => ({
    getSomeData: bindActionCreators(getSomeData, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './styles.css'

import { Layout, Card, } from 'antd';
import {
    CommentOutlined, LikeOutlined,
    GiftOutlined, ShareAltOutlined, EditOutlined
} from '@ant-design/icons';

import { Modal } from 'antd';
import PostModal from '../PostModal';
import Comments from '../Comments';
import { changelike } from './action';
import {bindActionCreators} from 'redux'
const { Content } = Layout;

class HomeCenter extends Component {

    state = {
        loading: false,
        visible: false,
        loadingComments: false,
        visibleComments: false,
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    showModalComments = () => {
        this.setState({
            visibleComments: true
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 500);
        Modal.success({
            content: "Post Shared"
        });
    };

    handleOkComments = () => {
        this.setState({ loadingComments: true });
        setTimeout(() => {
            this.setState({ loadingComments: false, visibleComments: false });
        }, 100);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCancelComments = () => {
        this.setState({ visibleComments: false });
    };
    incrementLike = (id) =>{
        //console.log(id)
        this.props.changelike(id)
    }
    render (){
        
        const { visible, loading , visibleComments, loadingComments} = this.state;

        const Actions = [
            <div><LikeOutlined key="Like" style={{ margin: "8px" }} />20</div>,
            <div><ShareAltOutlined key="share" style={{ margin: "8px" }} />30</div>,
            <div onClick={this.showModalComments} ><CommentOutlined hoverable={true} key="Comment" style={{ margin: "8px" }} />20</div>,
            <div><GiftOutlined key="Award" style={{ margin: "8px" }} />20</div>,
        ]

        const { posts } = this.props;

        const postList = posts.length? (
            posts.map(post =>{
                return(
                    <Card title={post.user_name} style={{ width: 1000 , margin:"8px"}} 
                      actions= {[
                        <div><LikeOutlined key="Like" style={{margin:"8px"}} onClick={(id) =>this.incrementLike(post.id)}/>{post.likes}</div>,
                        <div><ShareAltOutlined key="share" style={{margin:"8px"}}/>{post.shares}</div>,
                        <div><CommentOutlined hoverable={true} onClick={this.showModalComments} key="Comment" style={{margin:"8px"}}/>20</div>,
                        <div><GiftOutlined key="Award" style={{margin:"8px"}}/>20</div>,
                        ]} >
                        <p>{post.description}</p>
                    </Card>

                )
            })

        ) : (
                <div> No post are here! </div>
            )

        return (
            <Content style={{ "margin": "auto" }}>
                <Card style={{ width: 1000, margin: "8px" }} hoverable={true} onClick={this.showModal} >
                    <p className="cardtext"> <EditOutlined /> Share something with the community</p>
                </Card>
                <PostModal handleCancel={this.handleCancel} handleOk={this.handleOk} showModal={this.showModal} visible={visible} loading={loading}/>    
                <Comments handleCancel={this.handleCancelComments} handleOk={this.handleOkComments} showModal={this.showModalComments} visible={visibleComments} loading={loadingComments}/>
                {postList}   
            </Content>
        )
    }
}
const mapStateToProps = state => ({
    posts: state.HomeCenterReducer.posts
})
const mapDispatchToProps = dispatch => ({
    changelike: bindActionCreators(changelike, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(HomeCenter);
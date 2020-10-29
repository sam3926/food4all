import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './styles.css'

import { Layout, Card, Space ,Image } from 'antd';
import {
    CommentOutlined, LikeOutlined,
    GiftOutlined, ShareAltOutlined, EditOutlined
} from '@ant-design/icons';

import { Modal } from 'antd';
import PostModal from '../PostModal';
import Comments from '../Comments';
import { changelike, getPost } from './action';
import {bindActionCreators} from 'redux'
const { Content } = Layout;

class HomeCenter extends Component {

    state = {
        loading: false,
        visible: false,
        loadingComments: false,
        visibleComments: false,
        currentPostid: 2
    }
    componentDidMount(){
        console.log('mount called in home center');
        this.props.getPost();
    }
    showModal = () => {
        this.setState({
            visible: true
        });
    };
    startModalComments = (id) =>{
        this.setState({
            visibleComments: true,
            currentPostid:id
        });
        console.log('inside start modal comment '.id);
    }
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
    incrementLike = (id,value) =>{
        //console.log(id)
        this.props.changelike(id,value)
    }
    render (){
        
        const { visible, loading , visibleComments, loadingComments} = this.state;
        const { posts } = this.props;
        const imageList = (imagelist) =>{
            if(imagelist==undefined)
                return(
                    <div>No images!</div>
                )
            return imagelist.length? (imagelist.map(imageurl =>{
                return (
                    <Image
                        width={100}
                        height={100}
                        alt="example"
                        src={imageurl}
                        />
                )
            })
                
            ):(<div>No images!</div>)
        }
        const postList = posts.length? (
            posts.map(post =>{
                return(
                    <Card title={post.author} extra={<p>{post.DateTime}</p>} style={{ width: 700 , margin:"8px"}} 
                      actions= {[
                        <div><LikeOutlined key="Like" style={{margin:"8px"}} onClick={(id) =>this.incrementLike(post._id,post.liked)}/>{post.noOfLikes}</div>,
                        <div><ShareAltOutlined key="share" style={{margin:"8px"}}/> </div>,
                        <div><CommentOutlined hoverable={true} onClick={() =>this.startModalComments(post._id)} key="Comment" style={{margin:"8px"}}/>20</div>,
                        <div><GiftOutlined key="Award" style={{margin:"8px"}}/>20</div>,
                        ]} >
                        <p>{post.description}</p>
                        <Space>
                        {imageList(post.imageUrl)}
                        </Space>
                    </Card>

                )
            })

        ) : (
                <div> No post are here! </div>
            )

        return (
            <Content style={{ "margin": "auto" }}>
                <Card style={{ width: 700, margin: "8px" }} hoverable={true} onClick={this.showModal} >
                    <p className="cardtext"> <EditOutlined /> Share something with the community</p>
                </Card>
                <PostModal handleCancel={this.handleCancel} handleOk={this.handleOk} showModal={this.showModal} visible={visible} loading={loading}/>    
                <Comments id={this.state.currentPostid} handleCancel={this.handleCancelComments} handleOk={this.handleOkComments} showModal={this.showModalComments} visible={visibleComments} loading={loadingComments}/>
                {postList}   
            </Content>
        )
    }
}
const mapStateToProps = state => ({
    posts: state.HomeCenterReducer.posts,
    
})
const mapDispatchToProps = dispatch => ({
    changelike: bindActionCreators(changelike, dispatch),
    getPost: bindActionCreators(getPost,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(HomeCenter);
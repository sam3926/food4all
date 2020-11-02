import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import 'antd/dist/antd.css';
import './styles.css';
import { Layout, Card, Space ,Image, Avatar } from 'antd';
import { CommentOutlined, LikeFilled, LikeOutlined, GiftOutlined, ShareAltOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Modal } from 'antd';

import { changelike, getPost } from './action';
import { setCurrentRoute } from '../Navbar/actions';
import PostModal from '../PostModal';
import Comments from '../Comments';
import LoadingScreen from '../LoadingScreen';

const { Content } = Layout;

class HomeCenter extends Component {

    state = {
        loading: false,
        visible: false,
        loadingComments: false,
        visibleComments: false,
        currentPostid: null,
        profilePageLoading: false
    }
    async componentDidMount(){
        this.setState({
            profilePageLoading: true
        })
        await this.props.getPost();
        this.setState({
            profilePageLoading: false
        })
    }
    showModal = () => {
        this.setState({
            visible: true
        });
    };
    startModalComments = async (id) =>{
        await this.setState({
            currentPostid:id
        });
        this.setState({
            visibleComments:true
        })
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
        const type = (liked) =>{
            return liked? (<LikeFilled key="Like" style={{margin:"8px"}} />):(<LikeOutlined key="Like" style={{margin:"8px"}} />)
        }
        const postList = posts.length? (
            posts.map(post =>{
                return(
                    <Card title={<Link onClick={() => this.props.setCurrentRoute('profile')} to={`/profile/${post.authorId._id}`}>
                        <Avatar
                          src={post.authorId.avatar}
                          alt="Han Solo"
                          style={{margin:'8px'}}
                        />
                       {post.author}</Link>} extra={post.DateTime} style={{ width: 700 , margin:"8px"}} 
                      actions= {[
                        <div onClick={(id) =>this.incrementLike(post._id,post.liked)} >{type(post.liked)}{post.noOfLikes}</div>,
                        <div><ShareAltOutlined key="share" style={{margin:"8px"}}/> </div>,
                        <div><CommentOutlined hoverable={true} onClick={() =>this.startModalComments(post._id)} key="Comment" style={{margin:"8px"}}/> </div>,
                        <div><GiftOutlined key="Award" style={{margin:"8px"}}/> </div>,
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
            this.state.profilePageLoading ? <LoadingScreen /> :
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
    getPost: bindActionCreators(getPost,dispatch),
    setCurrentRoute: bindActionCreators(setCurrentRoute, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(HomeCenter);
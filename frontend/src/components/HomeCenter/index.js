import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './styles.css';
import { Layout, Card, Space, Image, Avatar } from 'antd';
import { CommentOutlined, LikeFilled, LikeOutlined, GiftOutlined, ShareAltOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Modal } from 'antd';

import { changelike, getPost } from './action';
import { setCurrentRoute, getNotifications } from '../Navbar/actions';
import PostModal from '../PostModal';
import Comments from '../Comments';
import Awards from '../Awards';
import LoadingScreen from '../LoadingScreen';

const { Content } = Layout;

class HomeCenter extends Component {

    state = {
        loading: false,
        visible: false,
        loadingComments: false,
        visibleComments: false,
        currentPostid: null,
        profilePageLoading: false,
        visibleawards: false,
        visiblepayment: false,
    }
    async componentDidMount() {
        this.setState({
            profilePageLoading: true
        })
        await this.props.getPost();
        this.props.getNotifications();
        this.setState({
            profilePageLoading: false
        })
    }
    showModal = () => {
        this.setState({
            visible: true
        });
    };
    startModalComments = async (id) => {
        await this.setState({
            currentPostid: id
        });
        this.setState({
            visibleComments: true
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

    showModalawards = async (postId) => {
        await this.setState({
            currentPostid: postId,
        });
        this.setState({
            visibleawards: true,
        })
    };

    hideModalawards = () => {
        this.setState({
            visibleawards: false
        });
    };

    hideModalSawards = () => {
        this.setState({
            visibleawards: false,
            visiblepayment: true
        });
    };

    hideModalP = () => {
        this.setState({
            visiblepayment: false
        });
    };

    hideModalB = () => {
        this.setState({
            visiblepayment: false,
            visibleawards: true
        });
    };
    Liked = (ids) => {
        const alreadyLiked = ids.find((likeuser) => { return likeuser == this.props.user.userId });
        // console.log(ids);
        // console.log(alreadyLiked);

        if (alreadyLiked == undefined)
            return false;
        else
            return true;
    }
    incrementLike = (id, value, ids) => {
        console.log(this.props.user.userId);
        const liked = this.Liked(ids);
        this.props.changelike(id, liked);
    }
    render() {

        const { visible, visibleawards, loading, visiblepayment, visibleComments, loadingComments } = this.state;
        const { posts } = this.props;
        const imageList = (imagelist) => {
            if (imagelist == undefined)
                return (
                    <div>No images!</div>
                )
            return imagelist.length ? (imagelist.map(imageurl => {
                return (
                    <Image
                        width={100}
                        height={100}
                        alt="example"
                        src={imageurl}
                    />
                )
            })

            ) : (<div>No images!</div>)
        }
        const type = (liked) => {
            return liked ? (<LikeFilled key="Like" style={{ margin: "8px" }} />) : (<LikeOutlined key="Like" style={{ margin: "8px" }} />)
        }
        const postList = posts.length ? (
            posts.map(post => {
                return (
                    <Card title={<Link onClick={() => this.props.setCurrentRoute('profile')} to={`/profile/${post.authorId._id}`}>
                        <Avatar
                            src={post.authorId.avatar}
                            alt="Han Solo"
                            style={{ margin: '8px' }}
                        />
                        {post.author}</Link>} extra={post.DateTime} style={{ width: 700, margin: "8px" }}
                        actions={[
                            <div onClick={(id) => this.incrementLike(post._id, post.liked, post.likes)} >{type(this.Liked(post.likes))}{post.noOfLikes}</div>,
                            //<div><ShareAltOutlined key="share" style={{margin:"8px"}}/> </div>,
                            <div><CommentOutlined hoverable={true} onClick={() => this.startModalComments(post._id)} key="Comment" style={{ margin: "8px" }} /> </div>,
                            <div><GiftOutlined key="Award" onClick={() => this.showModalawards(post._id)} style={{ margin: "8px" }} /> </div>,
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
                    <PostModal handleCancel={this.handleCancel} handleOk={this.handleOk} showModal={this.showModal} visible={visible} loading={loading} />
                    <Comments id={this.state.currentPostid} handleCancel={this.handleCancelComments} handleOk={this.handleOkComments} showModal={this.showModalComments} visible={visibleComments} loading={loadingComments} />
                    <Awards currentPostid={this.state.currentPostid} hideModal={this.hideModalawards} hideModalB={this.hideModalB} hideModalP={this.hideModalP} hideModalS={this.hideModalSawards} visible={visibleawards} visiblepay={visiblepayment} />
                    {postList}
                </Content>
        )
    }
}
const mapStateToProps = state => ({
    posts: state.HomeCenterReducer.posts,
    user: state.authReducer.user,

})
const mapDispatchToProps = dispatch => ({
    changelike: bindActionCreators(changelike, dispatch),
    getPost: bindActionCreators(getPost, dispatch),
    setCurrentRoute: bindActionCreators(setCurrentRoute, dispatch),
    getNotifications: bindActionCreators(getNotifications, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeCenter);
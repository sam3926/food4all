import React, {Component} from 'react';

import 'antd/dist/antd.css';
import './styles.css'

import { Layout, Card,  } from 'antd';
import { CommentOutlined , LikeOutlined ,
         GiftOutlined , ShareAltOutlined } from '@ant-design/icons';

import { Modal } from 'antd';
import PostModal from '../PostModal';

const { Content } = Layout;

class HomeCenter extends Component{

    state = {
        posts: [
            {user_name:'Arpit', description:'Card Content'},
            {user_name:'Dinkar', description:'Card Content'},
            {user_name:'Sudheesh', description:'Card Content'},
            {user_name:'Shreyansh', description:'Card Content'}
        ],
        loading: false,
        visible: false
    }


    showModal = () => {
        this.setState({
            visible: true
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

    handleCancel = () => {
        this.setState({ visible: false });
    };
    
    render (){
        const { visible, loading } = this.state;

        const Actions = [
            <LikeOutlined key="Like" />,
            <ShareAltOutlined key="share" />,
            <CommentOutlined key="Comment" />,
            <GiftOutlined key="Award" />,
            ]
   
        const { posts } = this.state;
        
        const postList = posts.length? (
            posts.map(post =>{
                return(
                    <Card title={post.user_name} style={{ width: 1000 , margin:"8px"}} 
                      actions={Actions} >
                        <p>{post.description}</p>
                    </Card>

                )
            })
            
        ):(
            <div> No post are here! </div>
        )
        
        return (
            <Content style={{"margin":"auto"}}>
                <Card style={{ width: 1000 , margin:"8px"}} hoverable={true} onClick={this.showModal} >
                    <p class="cardtext"><b>Share something with the community</b></p>
                </Card>
                <PostModal handleCancel={this.handleCancel} handleOk={this.handleOk} showModal={this.showModal} visible={visible} loading={loading}/>    
                {postList}   
            </Content>
        )
    }
}

export default HomeCenter;
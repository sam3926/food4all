import React, {Component} from 'react';

import 'antd/dist/antd.css';
import './styles.css'
import { Layout, Card,  } from 'antd';
import { CommentOutlined , LikeOutlined ,
         GiftOutlined , ShareAltOutlined } from '@ant-design/icons';


const { Content } = Layout;

class HomeCenter extends Component{

    state = {
        posts: [
            {user_name:'Arpit', description:'Card Content'},
            {user_name:'Dinkar', description:'Card Content'},
            {user_name:'Sudheesh', description:'Card Content'},
            {user_name:'Shreyansh', description:'Card Content'}
        ]
    }
    
    render (){
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
                    <Card title={post.user_name} style={{ width: 1000 }} 
                      actions={Actions} >
                        <p>{post.description}</p>
                    </Card>

                )
            })
            
        ):(
            <div> No post are here! </div>
        )
        
        return (
            <Content className="site-layout-background">
                {postList}   
            </Content>
        )
    }
}

export default HomeCenter;
import React from 'react';

import { Modal, Button } from 'antd';
import { List, Avatar } from 'antd';

import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getFollowers } from '../action';

class FollowersList extends React.Component {



    render() {
        const { data, title } = this.props
        return (
            <>

                <Modal
                    title={title}
                    visible={this.props.visible}
                    onCancel={this.props.handleCancel}
                    destroyOnClose
                    footer={[
                        <Button type="primary" onClick={this.props.handleCancel}>
                            Close
                        </Button>
                    ]}
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Link onClick={this.props.handleCancel} to={`/profile/${item._id}`}><Avatar src={item.avatar} /></Link>}
                                    title={<a>{item.name}</a>}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />,
        </Modal>
            </>
        );
    }
}


export default (FollowersList);
import React from 'react';
import { Link } from 'react-router-dom';

import { Modal, Button } from 'antd';
import { List, Avatar } from 'antd';

class FollowersList extends React.Component {



    render() {
        const { data, title, loading } = this.props
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
                        loading={loading}
                        renderItem={item => (
                            <Link onClick={this.props.handleCancel} to={`/profile/${item._id}`}>
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<a>{item.name}</a>}
                                        description={item.description}
                                    />
                                </List.Item>
                            </Link>

                        )}
                    />,
        </Modal>
            </>
        );
    }
}


export default (FollowersList);
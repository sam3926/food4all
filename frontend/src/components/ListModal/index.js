import React from 'react';
import { connect } from 'react-redux'

import { List, Avatar, Modal } from 'antd';

class ListModal extends React.Component {
  render() {
    const { data } = this.props
    return (
      <>

        <Modal
          title="List"
          visible={this.props.visible}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
        >
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a>{item.user_name}</a>}
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

const mapStatetoProps = state => {
  return {
    data: state.ListReducer.users
  };
};
export default connect(mapStatetoProps)(ListModal);

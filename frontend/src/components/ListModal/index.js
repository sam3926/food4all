import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import { List, Avatar } from 'antd';

// const data = [
//   {
//     title: 'Ant Design Title 1',
//   },
//   {
//     title: 'Ant Design Title 2',
//   },
//   {
//     title: 'Ant Design Title 3',
//   },
//   {
//     title: 'Ant Design Title 4',
//   },
//   {
//     title: 'Ant Design Title 5',
//   },
//   {
//     title: 'Ant Design Title 6',
//   },
// ];

class ListModal extends React.Component {
  render() {
    const {data} = this.props
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
      data:state.ListReducer.users
  };

};
export default connect(mapStatetoProps)(ListModal);


//export default ListModal;
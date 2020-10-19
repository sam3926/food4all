import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import { List, Avatar } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 5',
  },
  {
    title: 'Ant Design Title 6',
  },
];

class ListModal extends React.Component {
  render() {
    return (
      <>
        <Modal
          title="Basic List"
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
            title={<a>{item.title}</a>}
            description="Ant Design"
            />
            </List.Item>
            )}
            />,
        </Modal>
      </>
    );
  }
}

export default ListModal;
import React from 'react';
import moment from 'moment';
import { Modal, Button } from 'antd';
import { Comment, Avatar, Form, List, Input } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addComment } from './action'

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

class Comments extends React.Component {
  state = {
    submitting: false,
    value: '',
  };

  handleSubmit = (e) => {
    if (!this.state.value) {
      return;
    }
    const value = this.state.value
    this.setState({
      submitting: true,
    });

    setTimeout(() => {

      var comments = {
        author: 'Arpit Bandejiya',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: value,
        datetime: moment().fromNow(),
      }
      this.props.addComment(this.props.id, comments)
    }, 1000);

    this.setState({
      submitting: false,
      value: '',

    });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {

    if (this.props.id) {
      const { submitting, value } = this.state;
      const { comments } = this.props.postComments[0];
      return (
        <>
          <Modal
            visible={this.props.visible}
            title="Comments"
            onOk={this.props.handleOk}
            onCancel={this.props.handleCancel}
            footer={[
              <Button key="back" onClick={this.props.handleCancel}>
                Return
              </Button>,
              <Button key="submit" type="primary" loading={this.props.loading} onClick={this.props.handleOk}>
                DOne
              </Button>,
            ]}
          >
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
              }
              content={
                <Editor
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  submitting={submitting}
                  value={value}
                />
              }
            />
          </Modal>
        </>
      );
    }
    else
      return null;
  }
}
const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps
  const allcomments = state.HomeCenterReducer.postComments;
  return {
    postComments: allcomments.filter((comment) => comment.postId === id)
  }
}
const mapDispatchToProps = dispatch => ({
  addComment: bindActionCreators(addComment, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
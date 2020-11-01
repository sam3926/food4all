import React, { Component } from 'react'
import { Form, Input, Button, Row, Col, Layout, List, Avatar, notification } from 'antd';
import { connect } from "react-redux";
import { getThreads, startThread, sendMessage, updateThread } from "./actions"
import MessageCard from "./MessageCard"
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { MessageOutlined, UploadOutlined, SendOutlined } from '@ant-design/icons';
import './styles.css'
import { bindActionCreators } from 'redux';
import LoadingScreen from '../LoadingScreen';
const { Content, Sider } = Layout;

export class Messagepage extends Component {
    state = {
        chatMessage: "",
        currentThread: {},
        currentUser: {},
        you: {},
        requiredUser: null,
        loading: false
    }

    async componentDidMount() {
        this.setState({
            loading: true
        })

        if (this.props.location.state) {
            console.log("from user", this.props.location.state.user)
            this.setState({ requiredUser: this.props.location.state.user })
        }

        await this.props.getThreads();
        this.setState({
            loading: false
        })
    }

    componentDidUpdate() {
        if (this.messagesEnd)
            this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }

    openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: message
        });
    };

    hanleSearchChange = (e) => {
        this.setState({
            chatMessage: e.target.value
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps)
        const currentThreadId = this.state.currentThread?._id;
        if (currentThreadId) {
            const req = nextProps.threads.find(x => x._id == currentThreadId);
            if (req)
                this.setState({ currentThread: req })
        }
        else if (this.state.requiredUser) {


            const req = nextProps.threads.find(thread => {
                if (thread?.members.find(m => m._id == this.state.requiredUser)) {
                    return true;
                }

                return false
            })
            if (req) {
                const member = req.members.find(x => x._id != this.props.user.userId)
                const you = req.members.find(x => x._id == this.props.user.userId)
                console.log("okayy the required user", req)
                this.setState({ currentThread: req, requiredUser: null, currentUser: member, you: you })
            } else {
                console.log("not there, maybe new user")
                this.props.startThread(this.state.requiredUser)
            }
        }

    }

    renderCards = () => {
        return (
            this.state.currentThread.messages
            && this.state.currentThread.messages.map((message) => (
                <MessageCard
                    key={message._id}
                    message={message}
                    currentUser={this.state.currentUser}
                    you={this.state.you}
                />
            )))
    }

    onDrop = (files) => {
        console.log(files)


        let formData = new FormData;

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        formData.append("file", files[0])

        axios.post('upload/messages', formData, config)
            .then(res => {
                if (res.data.success) {
                    let chatMessage = res.data.location;
                    let receiverID = this.state.currentThread?._id;
                    if (receiverID) {
                        this.props.sendMessage(receiverID, chatMessage, "image")
                    } else {
                        this.openNotificationWithIcon("warning", "Please select a user to send the message")
                    }
                }
            })
    }


    submitChatMessage = (e) => {
        e.preventDefault();
        let chatMessage = this.state.chatMessage
        let receiverID = this.state.currentThread?._id;
        if (receiverID) {
            this.props.sendMessage(receiverID, chatMessage, "text")
            this.setState({ chatMessage: "" })
        } else {
            this.openNotificationWithIcon("warning", "Please select a user to send the message")
        }

    }

    render() {
        return (
            <React.Fragment >
                {this.state.loading ? <LoadingScreen /> :
                    <Layout style={{ paddingTop: "64px" }}>
                        <Layout>

                            <Sider width={300} className="site-layout-background">
                                <List
                                    itemLayout="horizontal"
                                    dataSource={this.props.threads}
                                    renderItem={item => {
                                        const member = item.members.find(x => x._id != this.props.user.userId)
                                        const you = item.members.find(x => x._id == this.props.user.userId)
                                        return (
                                            <List.Item key={item._id} onClick={() => this.setState({ currentThread: item, currentUser: member, you: you })}>
                                                <List.Item.Meta
                                                    avatar={<Avatar src={member.avatar} />}
                                                    title={member.name}
                                                    description={item.messages.length ? item.messages[item.messages.length - 1].type == "text" ? item.messages[item.messages.length - 1].body : "Image" : ""}
                                                //OR LAST MESSAGE
                                                />
                                            </List.Item>
                                        )
                                    }}
                                />
                            </Sider>
                            <Layout style={{ padding: "0 24px 24px" }}>
                                <Content
                                    style={{
                                        padding: 24,
                                        margin: 0,
                                    }}
                                >
                                    <div class="site-layout-background" style={{ marginLeft: '150px', maxWidth: '800px' }}>
                                        <div className="infinite-container" style={{ height: '500px', overflowY: 'scroll' }}>
                                            {this.state.currentThread && (
                                                this.renderCards()
                                            )}
                                            <div
                                                ref={el => {
                                                    this.messagesEnd = el;
                                                }}
                                                style={{ float: "left", clear: "both" }}
                                            />
                                        </div>

                                        <Row >
                                            <Form style={{ width: "100%" }} layout="inline" onSubmit={this.submitChatMessage}>
                                                <Col span={16}>
                                                    <Input
                                                        id="message"
                                                        prefix={<MessageOutlined />
                                                            // <Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />
                                                        }
                                                        placeholder="Let's start talking"
                                                        type="text"
                                                        value={this.state.chatMessage}
                                                        onChange={this.hanleSearchChange}
                                                    />
                                                </Col>
                                                <Col span={2}>
                                                    <Dropzone onDrop={this.onDrop}>
                                                        {({ getRootProps, getInputProps }) => (
                                                            <section>
                                                                <div {...getRootProps()}>
                                                                    <input {...getInputProps()} />
                                                                    <Button>
                                                                        <UploadOutlined />
                                                                    </Button>
                                                                </div>
                                                            </section>
                                                        )}
                                                    </Dropzone>
                                                </Col>

                                                <Col span={2}>
                                                    <Button type="primary" style={{ width: '100%' }} onClick={this.submitChatMessage} htmlType="submit">
                                                        {/* <Icon type="enter" /> */}
                                                        <SendOutlined />
                                                    </Button>
                                                </Col>
                                            </Form>
                                        </Row>
                                    </div>
                                </Content>
                            </Layout>
                        </Layout>
                    </Layout>
                }



            </React.Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        threads: state.messageReducer.threads,
        user: state.authReducer.user
    }
}

const mapDispatchToProps = dispatch => ({
    getThreads: bindActionCreators(getThreads, dispatch),
    startThread: bindActionCreators(startThread, dispatch),
    sendMessage: bindActionCreators(sendMessage, dispatch),
    updateThread: bindActionCreators(updateThread, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Messagepage);

import React from "react";
import moment from 'moment';
import { Comment, Tooltip, Avatar, Image } from 'antd';

function MessageCard({ message, currentUser, you }) {
    const { sender, time, body, type } = message
    return (
        <div style={{ width: '100%' }}>
            <Comment
                author={sender === you?._id ? you.name : currentUser.name}
                avatar={
                    <Avatar
                        src={sender === you?._id ? you.avatar : currentUser.avatar}
                        alt={sender === you?._id ? you.name : currentUser.name}
                    />
                }
                content={
                    type === "image" ?
                        <Image
                            width={200}
                            src={body}
                            alt="image"
                        />
                        :
                        <p>
                            {body}
                        </p>
                }
                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(time).fromNow()}</span>
                    </Tooltip>
                }
            />
        </div>
    )
}

export default MessageCard;


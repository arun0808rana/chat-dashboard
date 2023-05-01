import React, { useEffect, useRef, useState } from "react";
import Wrapper from "./ChatArea.style";
import TypingIndicator from "../../../../assets/typing_indiacator.gif";
import SendIcon from "../../../../assets/send.svg";
import EmojiIcon from "../../../../assets/emoji.svg";
import AttachmentIcon from "../../../../assets/attachment.svg";
import DPIcon from "../../../../assets/photo-1517841905240-472988babdf9.avif";
import VideoIcon from "../../../../assets/bi_camera-video (1).svg";
import CallIcon from "../../../../assets/fluent_call-16-regular.svg";
import SearchIcon from "../../../../assets/akar-icons_search (1).svg";
import { getChatHistory } from "./chatAreaSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, toTitleCase } from '../../../../utils';
import { socket } from "../../../../socket";

function ChatArea() {
  const dispatch = useDispatch();
  const msgRef = useRef();
  const { id: user_id, name: user_name } = useSelector(state => state.authorization.data);
  const { id: friend_id, username: friend_username } = useSelector(state => state.messageList.currentFriend);
  const { data: messagesList, status, error } = useSelector(state => state.chatArea);

  useEffect(() => {
    if (!friend_id && !user_id) {
      return;
    }
    dispatch(getChatHistory(friend_id));
  }, [friend_id]);

  const sendMessage = () => {
    console.log('msgRef', msgRef.current.value);
    socket.emit('private message', {
      from: user_name,
      to: friend_username,
      message: msgRef.current.value,
    })
    msgRef.current.value = '';
  }

  return (
    <Wrapper>
      <div className="chat-area-heading">
        <div className="chat-area-heading-lhs">{toTitleCase(friend_username)}</div>
        <div className="chat-area-heading-rhs">
          {/* <button className="chat-area-heading-btn active">Messages</button>
          <button className="chat-area-heading-btn">Participants</button> */}
          <img
            src={CallIcon}
            alt="audio call icon"
            className="chat-area-heading-rhs-icon"
          />
          <img
            src={VideoIcon}
            alt="video call icon"
            className="chat-area-heading-rhs-icon"
          />
          <img
            src={SearchIcon}
            alt="search icon"
            className="chat-area-heading-rhs-icon"
          />
        </div>
      </div>
      {
        (status === 'successful' && !error) ? <div className="chat-area-body">
          <div className="chat-area-body-messages">
            {messagesList.map((msg, index) => {
              return (
                <div className="chat-strip" key={`chat-strip-${msg.id}`}>
                  {msg.sender_id !== Number(user_id) ? (
                    <div className="chat-strip-dp">
                      <img src={DPIcon} alt="" />
                    </div>
                  ) : null}

                  <div className={"chat-msg " + (msg.sender_id === Number(user_id) ? "right" : "left")}>
                    <div className="chat-msg-time">
                      {msg.sender_id === Number(user_id) ? "You, " : null}
                      {formatDate(msg.created_at)}
                    </div>
                    <div
                      className={"main-msg " + (msg.sender_id === Number(user_id) ? "right" : "left")}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="typing-indication">
              <img src={TypingIndicator} alt="" />
              {friend_username} is typing...
            </div>
          </div>
          <div className="chat-area-body-typing-box">
            <input
              ref={msgRef}
              type="text"
              placeholder="Write your message..."
              className="chat-area-body-typing-box-input"
            />
            <div className="chat-area-body-typing-box-input-icons" onClick={sendMessage}>
              <img src={EmojiIcon} alt="emoji icon" />
              <img src={AttachmentIcon} alt="attachement icon" />
              <img
                src={SendIcon}
                alt="send icon"
                className="chat-area-body-typing-box-input-icons-send-btn"
              />
            </div>
          </div>
        </div> : 'Loading...'
      }
    </Wrapper>
  );
}

export default ChatArea;

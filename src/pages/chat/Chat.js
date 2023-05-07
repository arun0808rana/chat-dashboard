import React from "react";
import Wrapper from "./Chat.style";
import ChatArea from "./components/chatArea/ChatArea";
import FriendList from './components/friendList/FriendList';
import ChatMisc from './components/chatMisc/ChatMisc';

function Chat() {
  return <Wrapper>
      <FriendList/>
      <ChatArea/>
      <ChatMisc/>
  </Wrapper>;
}

export default Chat;

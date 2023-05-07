import React, { useEffect, useState } from "react";
import Wrapper from "./FriendList.style";
import DPIcon from "../../../../assets/photo-1517841905240-472988babdf9.avif";
import ProfilePic from "../../../../assets/dp.png";
import CameraIcon from "../../../../assets/bi_camera.svg";
import SearchIcon from "../../../../assets/akar-icons_search.svg";
import { useDispatch, useSelector } from "react-redux";
import { getUserList, setCurrentFriend } from "./friendListSlice";
import { formatDate, toTitleCase } from "../../../../utils";

function FriendList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserList());
  }, []);

  const userList = useSelector((state) => state.friendList.userList);

  const [isOnline, setIsOnline] = useState("Online");

  const onStatusChange = (e) => {
    setIsOnline(e.target.value);
    console.log("e.target.value", e.target.value);
  };

  const getChatForFriend = async (event) => {
    const target = event.target.closest('.friend_entity');
    if (!target) {
      return;
    }

    const friend_id = target.getAttribute('data-id');
    const friend_username = userList.find(elm => elm.user_id === Number(friend_id)).username;
    dispatch(setCurrentFriend({ id: friend_id, username: friend_username }));
  }

  return (
    <Wrapper>
      <div className="message-list">
        <div className="message-list-upper-part">
          <div className="upper-msg-container">
            <div className="msg-up-part-dp">
              <img src={ProfilePic} alt="dp" />
              <div
                className={
                  "msg-up-part-dp-status " +
                  (isOnline === "Online" ? "online" : "")
                }
              ></div>
              <div className="msg-up-part-dp-edit-profile-pic">
                <img src={CameraIcon} alt="edit" />
              </div>
            </div>
            <div className="upper-msg-container-user-name">Jane Doe</div>
            <div className="message-list-status-changer">
              <select onChange={onStatusChange} value={isOnline}>
                <option value="Online">Online</option>
                <option value="Away">Away</option>
              </select>
            </div>
            <div className="search-chat">
              <input
                type="text"
                className="search-chat-input"
                placeholder="Search"
              />
              <div className="search-chat-icon">
                <img src={SearchIcon} alt="search" />
              </div>
            </div>
            <div className="add-new-chat-user">
              <div className="add-new-chat-user-text">Start New Chat</div>
              <button className="add-new-chat-user-btn">+</button>
            </div>
          </div>
        </div>
        <div className="message-list-lower-part">
          <div className="message-list-lower-part-list-item-container" onClick={getChatForFriend}>
            {userList.map((user, index) => {
              return (
                <div
                  key={`msg-list-item-${user.user_id}`}
                  data-id={user.user_id}
                  className={
                    "message-list-lower-part-list-item-container-item friend_entity " +
                    (index === 0 ? "active_friend" : null)
                  }
                >
                  <div className="msg-item-dp">
                    <img src={user.dp || DPIcon} alt="dp" />
                  </div>
                  <div className="name-msg-info-container">
                    <div className="message-list-lower-part-list-item-container-item-name">
                      {toTitleCase(user.username)}
                    </div>
                    <div className="msg-list-info">
                      {user.last_message.substring(0, 30)}
                    </div>
                  </div>
                  <div className="msg-list-time">{formatDate(user.created_at)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default FriendList;

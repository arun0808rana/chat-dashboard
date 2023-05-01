import { Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Chat from "./pages/chat/Chat";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import styled from "styled-components/macro";
import Sidebar from "./components/sidebar/Sidebar";
import Authorization from "./pages/authorization/Authorization";
import { socket } from './socket';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const {isUserAuthenticated} = useSelector(state=>state.authorization)
  useEffect(() => {
    function onConnect() {
      console.log('User connected');
    }

    function onDisconnect() {
      console.log('User dis-connected');
    }

    function onFooEvent(value) {
      console.log('User emitted: ', value);
    }

    const handlePrivateMessage = (value)=>{
      console.log('msg from backend', value)
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);
    socket.on('private message', handlePrivateMessage)

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
      socket.off('private message', handlePrivateMessage);
    };
  }, []);

  return (
    <Wrapper>
      {isUserAuthenticated ? (
        <>
          <Sidebar />
          <RouterOutlet>
            <Routes>
              <Route exact path="/" element={<Chat />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </RouterOutlet>
        </>
      ) : (
        <Authorization />
      )}
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 720px;
  width: 1200px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 20px;
  background-color: white;
`;

const RouterOutlet = styled.div`
  width: 100%;
  border-left: 1px solid var(--border-color);
  border-radius: 20px 0 0 20px;
  padding: 8px;
`;

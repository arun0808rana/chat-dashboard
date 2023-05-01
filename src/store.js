import { configureStore } from '@reduxjs/toolkit';
import messageListSlice from './pages/chat/components/messageList/messageListSlice';
import chatAreaSlice from './pages/chat/components/chatArea/chatAreaSlice';
import authorizationSlice from './pages/authorization/authorizationSlice';


export default configureStore({
    reducer: {
        [messageListSlice.name]: messageListSlice.reducer,
        [chatAreaSlice.name]: chatAreaSlice.reducer,
        [authorizationSlice.name]: authorizationSlice.reducer,
    },
})
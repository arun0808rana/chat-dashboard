import { configureStore } from '@reduxjs/toolkit';
import friendListSlice from './pages/chat/components/friendList/friendListSlice';
import chatAreaSlice from './pages/chat/components/chatArea/chatAreaSlice';
import authorizationSlice from './pages/authorization/authorizationSlice';


export default configureStore({
    reducer: {
        [friendListSlice.name]: friendListSlice.reducer,
        [chatAreaSlice.name]: chatAreaSlice.reducer,
        [authorizationSlice.name]: authorizationSlice.reducer,
    },
})
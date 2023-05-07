import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserList = createAsyncThunk(
    // name of action
    'friendList/getUserList',
    async (thunkAPI) => {
        try {
            const res = await axios.post('http://localhost:5000/getUserChatsList', {
                id: 1
            });
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message })
        }
    })

export const friendListSlice = createSlice({
    name: 'friendList',
    initialState: {
        userList: [],
        status: 'idle',
        error: "",
        currentFriend: {
            id:'',
            username:'',
        },
    },
    reducers: {
        setCurrentFriend: (state, action) => {
            state.currentFriend.id = action.payload.id;
            state.currentFriend.username = action.payload.username;
          },
    },
    extraReducers: {
        [getUserList.pending]: (state, action) => {
            state.status = 'loading';
        },
        [getUserList.fulfilled]: (state, action) => {
            state.status = 'successful';
            // console.log('action.payload', action.payload);
            state.userList = action.payload;
        },
        [getUserList.rejected]: (state, action) => {
            state.status = 'failed';
        },
    }
})

export default friendListSlice;

export const { setCurrentFriend } = friendListSlice.actions;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getChatHistory = createAsyncThunk(
    // name of action
    'chatArea/getChatHistory',
    async (friend_id, thunkAPI) => {
        try {
            const res = await axios.post('http://localhost:5000/getChatHistory', {
                user_id: 1,
                friend_id,
            });
            console.log('getChatHistory response...', res.data);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message })
        }
    })

export const chatAreaSlice = createSlice({
    name: 'chatArea',
    initialState: {
        data: [],
        status: 'idle',
        error: ""
    },
    reducers: {},
    extraReducers: {
        [getChatHistory.pending]: (state, action) => {
            state.status = 'loading';
        },
        [getChatHistory.fulfilled]: (state, action) => {
            state.status = 'successful';
            console.log('chatArea.action.payload', action.payload);
            state.data = action.payload || [];
        },
        [getChatHistory.rejected]: (state, action) => {
            state.status = 'failed';
        },
    }
})

export default chatAreaSlice;




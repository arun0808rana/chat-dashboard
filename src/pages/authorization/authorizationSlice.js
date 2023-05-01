import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { socket } from '../../socket';

export const login = createAsyncThunk(
    // name of action
    'authorization/login',
    async (credentials, thunkAPI) => {
        try {
            const res = await axios.post('http://localhost:5000/login', credentials);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message })
        }
    })

export const authorizationSlice = createSlice({
    name: 'authorization',
    initialState: {
        data: {
            id: '',
            name: '',
            token:'',
            isUserAuthenticated: false,
        },
        status: 'idle',
        error: "",
    },
    reducers: {},
    extraReducers: {
        [login.pending]: (state, action) => {
            state.status = 'loading';
        },
        [login.fulfilled]: (state, action) => {
            state.status = 'successful';
            state.data = action.payload;
            state.isUserAuthenticated = true;
            const token = action.payload.token;
            if (token) {
                localStorage.setItem('token', token);
            }
            console.log('state.authorization', {...state});
            // Send the token to the server
            socket.auth = { token };
            socket.connect();
            socket.emit('join',{
                from: action.payload.name,
            });
        },
        [login.rejected]: (state, action) => {
            state.status = 'failed';
        },
    }
})

export default authorizationSlice;




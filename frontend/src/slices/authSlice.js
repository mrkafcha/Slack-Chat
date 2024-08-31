import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: '',
    user: '',
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.token = payload.token;
            state.user = payload.user;
        },
    },
});


export const { actions } = authSlice;
export default authSlice.reducer;


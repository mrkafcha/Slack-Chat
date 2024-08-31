import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import {channelsApi} from "../services/channelsApi";
import {messagesApi} from "../services/messageApi";

export default configureStore({
    reducer: {
        user: authSlice,
        [channelsApi.reducerPath]: channelsApi.reducer,
        [messagesApi.reducerPath]: messagesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(channelsApi.middleware, messagesApi.middleware),
});
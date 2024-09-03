import { configureStore } from '@reduxjs/toolkit';

import appReducer from './slices/appSlice';
import { authApi } from '../api/auth';
import { channelsApi } from '../api/channels';
import { messagesApi } from '../api/messages';

export default configureStore({
  reducer: {
    app: appReducer,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware, messagesApi.middleware, authApi.middleware),
});

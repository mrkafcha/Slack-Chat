import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import routes from "../routes";

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    }

    return {};
};


export const messagesApi = createApi({
    reducerPath: 'messages',
    baseQuery: fetchBaseQuery({
        baseUrl: routes.messagePath(),
        headers: getAuthHeader(),
    }),
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: () => '',
        }),
    }),

});

export const { useGetMessagesQuery } = messagesApi;
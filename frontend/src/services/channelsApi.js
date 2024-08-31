import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import routes from "../routes";

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    }

    return {};
};


export const channelsApi = createApi({
    reducerPath: 'channels',
    baseQuery: fetchBaseQuery({
        baseUrl: routes.channelPath(),
        headers: getAuthHeader(),
    }),
    endpoints: (builder) => ({
        getChannels: builder.query({
            query: () => '',
        }),
    }),

});

export const { useGetChannelsQuery } = channelsApi;
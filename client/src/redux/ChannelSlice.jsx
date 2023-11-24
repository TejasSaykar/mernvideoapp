// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     channel: null,
//     loading: false,
//     error: false
// }

// export const channelSlice = createSlice({
//     name: "channel",
//     initialState,
//     reducers: {
//         fetchChannel: (state, action) => {
//             state.loading = true;
//         },
//         fetchChannelSuccess: (state, action) => {
//             state.loading = false;
//             state.channel = action.payload;
//             state.error = false;
//         },
//         fetchChannelFail: (state) => {
//             return initialState
//         }
//     }
// })

// export const { fetchChannel, fetchChannelSuccess, fetchChannelFail } = channelSlice.actions;

// export default channelSlice.reducer
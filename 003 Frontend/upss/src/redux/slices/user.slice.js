import { createSlice } from "@reduxjs/toolkit";
import * as status from "../constants/status"
import { fetchAllUsers } from "../../services/userService";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: status.IDLE,
        data: [],
        error: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        // Wait loading data state
        builder.addCase(fetchAllUsers.pending, (state, action) => {
            state.loading = status.PENDING;
        });

        // Get data successed state
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.loading = status.SUCCESSED;
            state.data = action.payload;
        });

        // Get data failed state
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
            state.loading = status.FAILED;
            state.error = action.error.message;
        });
    },
});

export default userSlice.reducer;
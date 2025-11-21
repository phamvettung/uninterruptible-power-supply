import { createSlice } from "@reduxjs/toolkit";
import * as status from "../constants/status";
import Cookies from "js-cookie";
import { loadUserFromCookie, login } from "../../services/authService";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: status.IDLE,
        data: null,
        error: null,
    },
    reducers: {
        logout: (state) => {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.status = status.PENDING;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = status.SUCCESSFULLY;
                state.data = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = status.FAILED;
                state.error = action.error.message;
            })
            .addCase(loadUserFromCookie.fulfilled, (state, action) => {
                state.data = action.payload;
            })
    },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
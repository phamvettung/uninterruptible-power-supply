import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { GET, POST } from "../constants/httpMethod";
import * as codeReturn from "../constants/codeReturn";
import * as httpStatusCode from "../constants/httpStatusCode";
import Cookies from "js-cookie";



export const signup = createAsyncThunk("/auth/signup", async (user, { rejectWithValue }) => {
    try {
        const response = await api[POST]("/auth/signup", user);
        switch (response.status) {
            case httpStatusCode.SUCCESS:
                return response.data;
            case httpStatusCode.CREATE:
                return response.data;
            default:
                break;
        }

    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({
            code: codeReturn.REGISTER_ERROR,
            msg: error.message,
            data: null
        });
    }
});

/**
 * Login API
 * @param {*} user User for login
 * @returns Return data of response
 * @author Tungpv (2025-11-18)
 */
export const login = createAsyncThunk("/auth/login", async (user, { rejectWithValue }) => {
    try {
        const response = await api[POST]("/auth/login", user);
        // Store both tokens in cookie
        Cookies.set("access_token", JSON.stringify(response.data.data.accessToken));
        Cookies.set("refresh_token", JSON.stringify(response.data.data.refreshToken));

        return response.data;
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data)
        }
        return rejectWithValue({
            code: codeReturn.LOGIN_ERROR,
            msg: error.message,
            data: null
        });
    }
});

/**
 * Decode the token after login
 * @param {*} token token to decode
 * @returns Return details info of user
 * @author Tungpv (2025-11-18)
 */
export const verifyToken = async (token) => {
    const response = await api[GET]("/user/info");
    return response.data
}

/**
 * Get user from cookie and store token in redux
 * @author Tungpv (2025-11-18)
 */
export const loadUserFromCookie = createAsyncThunk("auth/loadUserFromCookie", async (token) => {
    return token;
});
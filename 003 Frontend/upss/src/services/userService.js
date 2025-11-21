import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { GET } from "../constants/httpMethod";

export const fetchAllUsers = createAsyncThunk("user/all", async () => {
    const response = await api[GET]("user/all");
    return response.data
});
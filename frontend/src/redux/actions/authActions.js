import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export const login = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/auth/login", credentials);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async (userInfo, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/auth/register", userInfo);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
);
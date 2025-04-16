import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {configureSlice} from "@/lib/helpers";
import {API} from "@/config/api.config";

interface IState {
    claims: any[];
    claim: any;
    claimDetails: any;
    loading: boolean;
    error: any;
    success: string;
    message: string;
}

const initialState: IState = {
    claims: [],
    claim: null,
    claimDetails: null,
    loading: false,
    error: null,
    success: "",
    message: "",
};

export const getAllClaims = createAsyncThunk(
    "claim/get-all",
    async (data: any, {rejectWithValue}) => {
        try {
            const response = await API().post("/claim/get-all", data);

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

const claimSlice = createSlice({
    name: "claim",
    initialState: initialState,
    reducers: {
        clearClaimState(state) {
            state.claim = null;
            state.claimDetails = null;
            state.loading = false;
            state.error = null;
            state.success = "";
            state.message = "";
        },
        clearClaimListState(state) {
            state.claims = [];
            state.loading = false;
            state.error = null;
            state.success = "";
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllClaims.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllClaims.fulfilled, (state, {payload}) => {
            state.claims = payload.data;
            state.loading = false;
            state.error = null;
            state.success = payload.status;
            state.message = payload.message;
        });
        builder.addCase(getAllClaims.rejected, (state, {payload}: any) => {
            state.claims = [];
            state.loading = false;
            state.success = "Failed";
            state.error = payload.response?.data;
            state.message = payload.response?.data.message || "An error occurred.";
        });
    },
});

export const {clearClaimState, clearClaimListState} = claimSlice.actions;

export const claimSliceConfig = configureSlice(claimSlice, true);

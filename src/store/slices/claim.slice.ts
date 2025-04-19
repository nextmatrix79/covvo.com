import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {configureSlice} from "@/lib/helpers";
import {API} from "@/config/api.config";

interface IState {
    claims: any[];
    claim: any;
    claimDetails: any;
    claimStatusChanging: boolean;
    claimStatusChanged: boolean;
    claimICompleting: boolean;
    claimICompleted: boolean;
    claimFileUploading: boolean;
    claimFileUploaded: boolean;
    loading: boolean;
    error: any;
    success: string;
    message: string;
}

const initialState: IState = {
    claims: [],
    claim: null,
    claimDetails: null,
    claimStatusChanging: false,
    claimStatusChanged: false,
    claimICompleting: false,
    claimICompleted: false,
    claimFileUploading: false,
    claimFileUploaded: false,
    loading: false,
    error: null,
    success: "",
    message: "",
};

export const getAllClaims = createAsyncThunk(
    "claim/get-all",
    async (_, {rejectWithValue}) => {
        try {
            const response = await API().get("/claim/get-all");

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const getUnassignedClaims = createAsyncThunk(
    "claim/get-unassigned",
    async (_, {rejectWithValue}) => {
        try {
            const response = await API().get("/claim/get-unassigned");

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const changeClaimStatus = createAsyncThunk(
    "claim/change-status",
    async (data:any, {rejectWithValue}) => {
        try {
            const response = await API().post("/claim/change-status", data);

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const completeClaimByAdjuster = createAsyncThunk(
    "claim/complete-by-adjuster",
    async (data:any, {rejectWithValue}) => {
        try {
            const response = await API().post("/claim/complete-by-adjuster", data);

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const uploadDocumentsToClaim = createAsyncThunk(
    "claim/upload_documents",
    async (data:any, {rejectWithValue}) => {
        try {
            const response = await API().post("/claim/upload_documents", data);

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
            state.claimStatusChanging = false;
            state.claimStatusChanged = false;
            state.claimICompleting = false;
            state.claimICompleted = false;
            state.claimFileUploading = false;
            state.claimFileUploaded = false;
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
        },
        clearClaimStatusState(state) {
            state.claimStatusChanging = false;
            state.claimStatusChanged = false;
            state.loading = false;
            state.error = null;
            state.success = "";
            state.message = "";
        },
        clearClaimCompletionState(state) {
            state.claimICompleting = false;
            state.claimICompleted = false;
            state.loading = false;
            state.error = null;
            state.success = "";
            state.message = "";
        },
        clearClaimFileUploadState(state) {
            state.claimFileUploading = false;
            state.claimFileUploaded = false;
            state.loading = false;
            state.error = null;
            state.success = "";
            state.message = "";
        },
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
        builder.addCase(getUnassignedClaims.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUnassignedClaims.fulfilled, (state, {payload}) => {
            state.claims = payload.data;
            state.loading = false;
            state.error = null;
            state.success = payload.status;
            state.message = payload.message;
        });
        builder.addCase(getUnassignedClaims.rejected, (state, {payload}: any) => {
            state.claims = [];
            state.loading = false;
            state.success = "Failed";
            state.error = payload.response?.data;
            state.message = payload.response?.data.message || "An error occurred.";
        });
        builder.addCase(changeClaimStatus.pending, (state) => {
            state.claimStatusChanging = true;
        });
        builder.addCase(changeClaimStatus.fulfilled, (state, {payload}) => {
            state.claimStatusChanged = true;
            state.claimStatusChanging = false;
            state.error = null;
            state.success = payload.status;
            state.message = payload.message;
        });
        builder.addCase(changeClaimStatus.rejected, (state, {payload}: any) => {
            state.claimStatusChanged = false;
            state.claimStatusChanging = false;
            state.success = "Failed";
            state.error = payload.response?.data;
            state.message = payload.response?.data.message || "An error occurred.";
        });
        builder.addCase(completeClaimByAdjuster.pending, (state) => {
            state.claimICompleting = true;
        });
        builder.addCase(completeClaimByAdjuster.fulfilled, (state, {payload}) => {
            state.claimICompleted = true;
            state.claimICompleting = false;
            state.error = null;
            state.success = payload.status;
            state.message = payload.message;
        });
        builder.addCase(completeClaimByAdjuster.rejected, (state, {payload}: any) => {
            state.claimICompleted = false;
            state.claimICompleting = false;
            state.success = "Failed";
            state.error = payload.response?.data;
            state.message = payload.response?.data.message || "An error occurred.";
        });
    },
});

export const {
    clearClaimState,
    clearClaimListState,
    clearClaimStatusState,
    clearClaimCompletionState,
    clearClaimFileUploadState
} = claimSlice.actions;

export const claimSliceConfig = configureSlice(claimSlice, true);

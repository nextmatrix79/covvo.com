import {authSliceConfig} from "@/store/slices/auth.slice";
import {claimSliceConfig} from "@/store/slices/claim.slice";

export const slices = {
    auth: authSliceConfig,
    claim: claimSliceConfig
};

export const reducers = {
    auth: authSliceConfig.reducer,
    claim: claimSliceConfig.reducer
};

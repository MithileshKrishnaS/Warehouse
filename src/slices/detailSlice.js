import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
    name: 'details',
    initialState: {
        details : {}
    },
    reducers: {
        setDetail: (state,action) => {
            state.details = action.payload;
        }
    }
})

export const { setDetail } = detailSlice.actions;
export default detailSlice.reducer;
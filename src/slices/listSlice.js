import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../config";

const api = config.API;
const header = config.headers;

export const getAll = createAsyncThunk('list/getAll', async ()=>{
    const response = await fetch(api + 'all', header);
    const data = await response.json();
    return data; 
})

const listSlice = createSlice({
    name: 'list',
    initialState : {
        data:[],
        loading: false
    },
    extraReducers: {
        [getAll.pending] : (state, action) => {
            state.loading = true;
        },
        [getAll.fulfilled] : (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        [getAll.rejected] : (state, action) => {
            state.loading = false;
        },
    },
    reducers: {
        updateDet : (state, action) => {
            state.data = action.payload;
        }
    }
});

export const { updateDet } = listSlice.actions; 
export default listSlice.reducer;
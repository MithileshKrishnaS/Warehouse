import { configureStore } from '@reduxjs/toolkit';
import listData from './slices/listSlice';
import detailData from './slices/detailSlice';
import { useDispatch } from 'react-redux';

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

const store = configureStore({
    reducer: {
        list: listData,
        details: detailData
    },
});


export default store;
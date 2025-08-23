import {configureStore} from '@reduxjs/toolkit';
import jobSlice from '../slice/JobSlice';

export const store = configureStore({
    reducer:{
        jobs:jobSlice,
    }
})
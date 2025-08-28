import {configureStore} from '@reduxjs/toolkit';
import jobSlice from '../slice/JobSlice';
import registerSlice from '../slice/RegisterSlice';


export const store = configureStore({
    reducer:{
        jobs:jobSlice,
        users:registerSlice,
        
    }
})
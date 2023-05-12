import { configureStore } from "@reduxjs/toolkit";
import repoReducer from '../slices/GitSlices';

const store=configureStore({
    reducer:{

        repos:repoReducer
    }
})

export default store;
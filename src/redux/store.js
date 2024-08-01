import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import postsReducer from './postSlice'
const store = configureStore({
    reducer: {
        user: userReducer,
        posts: postsReducer
    }
})

export default store;
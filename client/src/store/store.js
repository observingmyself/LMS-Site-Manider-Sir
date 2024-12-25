import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice/index'
import storage from 'redux-persist/lib/storage'
// import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const reducer = combineReducers({
    auth: authReducer,
});

// const persistReducers = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: {
        auth: authReducer
    },
    // reducer: persistReducers

})

export default store
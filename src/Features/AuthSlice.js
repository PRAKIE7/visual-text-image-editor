import {createSlice} from "@reduxjs/toolkit";

const initialState={
    Status: false,
    userData: null,
}

const AuthSlice= createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state, action)=>{
            state.Status= true;
            state.userData= action.payload;
        },
        logout: (state)=>{
            state.Status= false;
            state.userData= null;
        },
    }
})

export const {login, logout} = AuthSlice.actions;
export default AuthSlice.reducer;
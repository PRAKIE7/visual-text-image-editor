import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../Features/AuthSlice";

const Store= configureStore({
    reducer:{
        auth: AuthSlice
    }
})

export default Store
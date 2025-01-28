import { createSlice } from "@reduxjs/toolkit";
const AuthSlice=createSlice({
    name: 'auth',
    initialState: {
        currentUser:null
       
    },
    reducers: {
        setCurrentUser:(state, {payload})=>{
            const user= payload.name;
            state.currentUser=user;
        },
        removeCurrentUser:(state)=>{
            state.currentUser=null;
        }
    }

})

export const {setCurrentUser, removeCurrentUser}=AuthSlice.actions;
export default AuthSlice.reducer
import { createSlice } from "@reduxjs/toolkit";
const AuthSlice=createSlice({
    name: 'auth',
    initialState: {
        currentUser:null,
        role:null
      
       
    },
    reducers: {
        setCurrentUser:(state, {payload})=>{
            const user= payload.name;
            const role= payload.role;
            state.currentUser=user;
            state.role=role;
            
        },
        removeCurrentUser:(state)=>{
            state.currentUser=null;
            state.role=null;
        }
    }

})

export const {setCurrentUser, removeCurrentUser}=AuthSlice.actions;
export default AuthSlice.reducer
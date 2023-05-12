import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



//action for user profle:
export const fetchRepoAction=createAsyncThunk('repo/list',
async(user,{rejectWithValue,getstate,dispatch})=>{
    try {
        // http call

        const {data}= await axios.get(`https://api.github.com/users/${user}/repos?per_page=30&sort=asc`);
        return data;
    } catch (error) {
        if(!error?.responce){
            throw error;
        }
        return rejectWithValue(error)
        
    }
}

)

//actn for repo

export const fetchprofileAction=createAsyncThunk('profile/list',
async(user,{rejectWithValue,getstate,dispatch})=>{
    try {
        // http call

        const {data}= await axios.get(`https://api.github.com/users/${user}`);
        return data;
    } catch (error) {
        if(!error?.responce){
            throw error;
        }
        return rejectWithValue(error)
        
    }
}

)

//slices;

const repoSlices=createSlice({

    //repos slices
    name:'repos',
    initialState:{users:'emma'},
    extraReducers :builder =>{
        builder.addCase(fetchRepoAction.pending,(state,action)=>{
            state.loading=true;

        });
        builder.addCase(fetchRepoAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.repoList=action?.payload;
            state.error=undefined;

        });

        builder.addCase(fetchRepoAction.rejected,(state,action)=>{
            state.loading=false;
            state.repoList=undefined;
            state.error=undefined
        });

        //profile slices
        builder.addCase(fetchprofileAction.pending,(state,action)=>{
            state.loading=true;
        });
        builder.addCase(fetchprofileAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.profile=action?.payload;
            state.error=undefined;
        });
        builder.addCase(fetchprofileAction.rejected,(state,action)=>{
            state.loading=false;
            state.repoList=undefined;
            state.error=action?.payload;
        });
        
        
        
    }

})
export default repoSlices.reducer;
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { router } from "../../app/router/Router";
import { toast } from "react-toastify";

interface AccountState {
    user: User | null;
    error: string | null;
}

const initialState: AccountState = {
    user: null,
    error: null
}

export const signInUser = createAsyncThunk<User, FieldValues>(
    'auth/login',
    async (data, thunkAPI) => {
        try{
            const user = await agent.Account.login(data);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
        catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

// Função para buscar o usuário atual do localStorage
export const fetchCurrentUser = createAsyncThunk<User | null>(
  'auth/fetchCurrentUser',
  async(_, thunkAPI) =>{
      try{
          //Retrieve user data from local storage
          const userString = localStorage.getItem('user');
          if(userString){
              const user = JSON.parse(userString) as User;
              return user;
          }
          return null;
      }
      catch(error){
          console.error("Erro ao buscar usuário atual:", error);
          return null;
      }
  }
)

// Função para efetuar logout removendo o usuário do localStorage
export const logoutUser = createAsyncThunk<void>(
  'auth/logout',
  async(_, thunkAPI) =>{
      try{
          //Remove user from local storage
          localStorage.removeItem('user');
      }
      catch(error){
          console.error("Erro ao efetuar logout do usuário");
      }
  }
)

export const accountSlice = createSlice({
    name:'account',
    initialState,
    reducers:{
        logOut:(state)=>{
            state.user = null;
            state.error = null;
            localStorage.removeItem('user');
            router.navigate('/');
        }, clearError:(state)=>{
            state.error = null;
        }
    },
    extraReducers:(builder=>{
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action)=>{
            state.user = action.payload;
            state.error = null;
            toast.success('Login efetuado com sucesso');
        });
        builder.addMatcher(isAnyOf(signInUser.rejected, fetchCurrentUser.rejected, logoutUser.fulfilled), (state, action)=>{
            const payload = action.payload as string | null;
            state.error = payload;
            toast.success('Falha ao entrar. Tente novamente');
        });
    })
})
export const {logOut, clearError} = accountSlice.actions;
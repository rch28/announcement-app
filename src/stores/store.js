import { create } from "zustand";

export const useStore = create((set)=>({
    userAuthenticated: false,
    setUserLoggedIn: (value)=>set({userAuthenticated: value}),

    userData:{},
    setUserData:(data)=>set({userData:data}),

    isGrupAdmin:false,
    setIsGroupAdmin:(value)=>set({isGrupAdmin:value}),
    groupAdmin:{},
    setGroupAdmin:(data)=>set({groupAdmin:data}),
}))
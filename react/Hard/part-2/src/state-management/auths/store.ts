import { create } from "zustand";

interface AuthStore{
    user:string,
    logIn:(inputUser:string)=>void,
    logOut:()=>void
}

const useAuthStore= create<AuthStore>(set=>({
    user:'',
    logIn:inputUser => set(() =>({user:inputUser})),
    logOut:()=>set(()=> ({user:''}) )
}))

export default useAuthStore;
import { useState } from "react";
import { User } from "../../services/userService";

const useUsers=()=>{
    const [users, setUser] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(true);

    return {users,error,isLoading,setUser,setError,setLoading}
}

export default useUsers;
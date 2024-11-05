import axios, { AxiosError, CanceledError } from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUser] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading,setLoading]=useState(true);

  useEffect(() => {
    const controller= new AbortController();

    axios.get('https://jsonplaceholder.typicode.com/users',{signal:controller.signal})
    .then((resp)=>{
      setUser(resp.data);
      setLoading(false);
    })
    .catch((err)=>{
      if(err instanceof CanceledError) return ;
      setError(err);
      setLoading(false);
    }  )

    return ()=>controller.abort();

  },[]);

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div> }
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;

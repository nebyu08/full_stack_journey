import apiClient,{CanceledError} from "./services/api-client";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUser] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get("/users", {
        signal: controller.signal,
      })
      .then((resp) => {
        setUser(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const deleteUSer=(user:User)=>{
    const originalUsers=[...users];
    setUser(users.filter((u)=> u.id!==user.id ));
    // update the server
    apiClient.delete("/users/"+user.id)
    .catch(e=>{
      setError(e.message);
      setUser(originalUsers);
    })
  }

  const insertUser=()=>{
    const originalUsers=[...users];
    const user={id:0,name:'nebiti'}
    setUser([user,...users]);
    apiClient.post("/users",user)
    .then(({data:savedUser})=> setUser([savedUser,...users]))
    .catch(err=>{
      setError(err.message);
      setUser(originalUsers);
    })
  }

  const updateUser=(user:User)=>{
    const updatedUser={...user,name:user.name+'!'};
    const originalUsers=[...users];

    setUser(
      users.map(u => u.id === user.id ? updatedUser :u)
    );

    //update the server
    apiClient.patch("/users/"+user.id,updateUser)
    .catch(e=>{
      setError(e.message);
      setUser(originalUsers);
    })
  }

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary" onClick={insertUser} >Add</button>
      <ul className="list-group" >
        {users.map((user) => (
          <li key={user.id} className="list-group-item d-flex justify-content-between " >
            {user.name}{" "}
            <div>
            <button onClick={()=> updateUser(user)} className="btn btn-outline-secondary mx-4">Update</button>
            <button onClick={()=> deleteUSer(user) } className="btn btn-outline-danger">Delete</button>{" "}
            </div>
            
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;

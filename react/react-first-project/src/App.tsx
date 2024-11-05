import { useEffect, useState } from "react";
import userService,{ User } from './services/userService';
import { CanceledError } from "./services/apiClient";

function App() {
  const [users, setUser] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
      const {request,cancel}=userService.getAll<User>();
      request
      .then((resp) => {
        setUser(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  // deleting user
  const deleteUser=(user:User)=>{
    const originalUsers=[...users];
    setUser(users.filter((u)=> u.id!==user.id ));
    // update the server
    userService.delete(user.id)
    .catch(e=>{
      setError(e.message);
      setUser(originalUsers);
    })
  }

  // adding users

  const insertUser=()=>{
    const originalUsers=[...users];
    const user={id:0,name:'nebiti'}
    setUser([user,...users]);
    userService.create(user)
    .then(({data:savedUser})=> setUser([savedUser,...users]))
    .catch(err=>{
      setError(err.message);
      setUser(originalUsers);
    })
  }

  // update values
  const updateUser=(user:User)=>{
    const updatedUser={...user,name:user.name+'!'};
    const originalUsers=[...users];

    setUser(
      users.map(u => u.id === user.id ? updatedUser :u)
    );

    //update the server
    userService.update(updatedUser)
    .catch(e =>{
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
            <button onClick={()=> deleteUser(user) } className="btn btn-outline-danger">Delete</button>{" "}
            </div>
            
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;

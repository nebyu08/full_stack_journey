import axios, { AxiosError, CanceledError } from "axios";
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

    axios
      .get("https://jsonplaceholder.typicode.com/users", {
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
    const originalData=[...users];
    setUser(users.filter((u)=> u.id!==user.id ));
    // update the server
    axios.delete("https://jsonplaceholder.typicode.com/xusers/"+user.id)
    .catch(e=>{
      setError(e.message);
      setUser(originalData);
    })
  }

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <ul className="list-group" >
        {users.map((user) => (
          <li key={user.id} className="list-group-item d-flex justify-content-between " >
            {user.name}{" "}
            <button onClick={()=> deleteUSer(user) } className="btn btn-outline-danger">Delete</button>{" "}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;

import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUser] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const respond = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUser(respond.data);
      } catch (error) {
        setError((error as AxiosError).message);
      }
    };
    fetchUsers();
  },[]);


  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;

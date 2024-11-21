import LoginStatus from "./auths/loginStatus";
import useCounterStore from "./counter/store";

const NavBar = () => {
  const counter =useCounterStore(s=>s.counter );

  console.log('Render NavBar');

  return (
    <nav className="navbar d-flex justify-content-between">
      <span className="badge text-bg-secondary"> {counter} </span>
      <LoginStatus />
    </nav>
  );
};

export default NavBar;

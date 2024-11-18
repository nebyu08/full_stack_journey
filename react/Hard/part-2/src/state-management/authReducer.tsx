import { useReducer } from "react";
import loginReducer from "./reducers/loginReducer";

const LoginStatus = () => {
  const [state,dispatch] = useReducer(loginReducer,'')

  if (state)
    return (
      <>
        <div>
          <span className="mx-2">{state}</span>
          <a onClick={() => dispatch({type:'LOGOUT'}) } href="#">
            Logout
          </a>
        </div>
      </>
    );
  return (
    <div>
      <a onClick={() => dispatch({type:'LOGIN',username:'mosh.hamedani'}) } href="#">
        Login
      </a>
    </div>
  );
};

export default LoginStatus;

import { useState } from "react";
import Button from "./components/Button";
import Alert from "./components/alert";



function App() {
  let [visibility,setVisibility]=useState(false);

  return (
    <div>
      {visibility && <Alert onClose={()=> setVisibility(false)} >This is alert</Alert>}
      <Button onClick={()=> setVisibility(true)}>dragon </Button>
    </div>
  );
}

export default App;

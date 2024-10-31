import { useState } from "react";
import { produce } from "immer";

function App() {
  const [bugs,setBugs]=useState([
    {id:1,title:'Bug 1',fixed:false},
    {id:2,title:'Bug 2',fixed:false}
  ]);

  const handleClick = () => {
    setBugs(produce(draft =>{
        const bug =  draft.find(bug=> bug.id === 1 );
        if(bug) bug.fixed=true;
    } ) )
    
  };
  return (
    //    {console.log(drink);}
    <div>
      {bugs.map(bug => <p key={bug.id}> {bug.title} {bug.fixed?'fixed':'New'} </p> ) }
      <button onClick={handleClick}>click </button>
    </div>
  );
}

export default App;

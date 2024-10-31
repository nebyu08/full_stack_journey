import { useState } from "react";

function App() {
  const [tags,setTags]=useState(['happy','cheerful']);

  const handleClick = () => {
   
    //add tags
    setTags([...tags,'exciting']);

    //remove tags
    setTags(tags.filter(tag=>tag !== 'happy'))

    //update
    setTags(tags.map(tag=>tag==='happy'?'happieness':tag))

  };
  return (
    //    {console.log(drink);}
    <div>
      <button onClick={handleClick}>click </button>
    </div>
  );
}

export default App;

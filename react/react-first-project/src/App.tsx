import { useState } from "react";

function App() {
  const [customer, setCustomer] = useState({
    name: "ksi",
    adress: {
      city: "new york",
      zipCode: 909090,
    },
  });

  const handleClick = () => {
    setCustomer({
      ...customer,
      adress: { ...customer.adress, zipCode: 3333333 },
    });
  };
  return (
    //    {console.log(drink);}
    <div>
      <button onClick={handleClick}>click </button>
    </div>
  );
}

export default App;

import { useState } from "react";
import Cart from "./components/cart";
import NavBar from "./components/navbar";

function App() {
  const [cartItems, setCartItems] = useState(['product 1', 'product 2']);

  return (
    <div>
      <>
        <div>
          <NavBar cartItemCount={cartItems.length} />
        </div>

        <div>
          <Cart cartItems={cartItems} onClear={()=>setCartItems([]) } />
        </div>
      </>
    </div>
  );
}

export default App;

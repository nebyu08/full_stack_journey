interface Prop {
  cartItems: string[];
  onClear:()=>void;

}

function NavBar({ cartItems,onClear }: Prop) {
  return (
    <>
    <div>
        Cart:
    </div>
      <div>
        <ul>
          {cartItems.map((item) => (
            <li key={item}> {item} </li>
          ))}
        </ul>
        
        <div>
          <button onClick={onClear} >Clear</button>

        </div>

      </div>
    </>
  );
}

export default NavBar;

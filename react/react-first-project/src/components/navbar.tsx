interface Prop {
  cartItemCount: number;
}

function Cart({ cartItemCount }: Prop) {
  return <div>NavBar:{cartItemCount}</div>;
}

export default Cart;

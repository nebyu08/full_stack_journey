import ListGroup from "./components/ListComponents"

function App(){
  let items = ["New York", "London", "New Jearsy", "Tokyo", "Cape town"];
  const handleSelectItem=(item:string)=>{
    console.log(item);
  }
  return <div> <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem} /> </div>
}

export default App

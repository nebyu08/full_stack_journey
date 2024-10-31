import ListGroup from "./components/ListGroup/ListComponents";

function App() {

  return (
   <ListGroup items={['new york','london','borklyn']} heading='Lists' onSelectItem={(item) => { console.log(item)} } />
  );
}

export default App;

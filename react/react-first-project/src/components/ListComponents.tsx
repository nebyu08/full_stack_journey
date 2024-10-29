import { MouseEvent } from "react";

function ListGroup() {
  let items = ["New York", "London", "New Jearsy", "Tokyo","Cape town" ];

  //Event handler
  const handleClick= (event:MouseEvent) => console.log(event);

  return (
    <>
      <h1>List</h1>
      {items.length === 0 && <p>No Element</p>}
      <ul className="list-group">
        {items.map((item) => (
          <li
            className="list-group-item"
            onClick={handleClick} 
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;

import { useState } from "react";

function ListGroup() {
  let items = ["New York", "London", "New Jearsy", "Tokyo", "Cape town"];
  const [selectedIndex,setSelectedIndex ] = useState(-1);

  return (
    <>
      <h1>List</h1>
      {items.length === 0 && <p>No Element</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              index === selectedIndex
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={()=> {setSelectedIndex(index);}}
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

import { FormEvent, useRef, useState } from "react";

function Form() {
    const [person,setPerson]=useState({
        name:'',
        age:''
    });

    const handleEvent=(event:FormEvent)=>{
        event.preventDefault()
        console.log(person);
    }

    return (
        <>
        <form onSubmit={handleEvent}>
        <div className="mb-3">
            <label htmlFor="name" className="form-Label">
            Name
            </label>
            <input value={person.name} onChange={(event)=> { setPerson({...person,name:event.target.value}) } }  id="name" type="text" className="form-control" />
        </div>

        <div className="mb-3">
            <label htmlFor="age" className="form-label">
            age
            </label>
            <input value={person.age} onChange={(event)=> { setPerson({...person,age:parseInt(event.target.value)}) } } id="age" type="number" className="form-control" />
        </div>

        <button className="btn btn-primary" type="submit">
            Submit
        </button>
        </form>
        </>
    );
}

export default Form;

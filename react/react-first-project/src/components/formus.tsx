import { FormEvent, useRef } from "react";

function Form() {
    const refName=useRef<HTMLInputElement>(null);
    const refAge=useRef<HTMLInputElement>(null);
    const Person={name:'',age:0};


    const handleEvent = (event: FormEvent) => {
        event.preventDefault();
        if(refName.current!==null)
            Person.name=refName.current.value
        if(refAge.current!==null)
            Person.age=parseInt(refAge.current.value);

        console.log(Person);
    };
    return (
        <form onSubmit={handleEvent}>
        <div className="mb-3">
            <label htmlFor="name" className="form-Label">
            Name
            </label>
            <input ref={refName} id="name" type="text" className="form-control" />
        </div>

        <div className="mb-3">
            <label htmlFor="age" className="form-label">
            age
            </label>
            <input ref={refAge} id="age" type="number" className="form-control" />
        </div>

        <button className="btn btn-primary" type="submit">
            Submit
        </button>
        </form>
    );
}

export default Form;

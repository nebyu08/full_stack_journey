function Form() {
  return (
    <form>
      <div className="mb-3" >
        <label htmlFor="name" className="form-Label">
          Name
        </label>
        <input id="name" type="text" className="form-control" />
      </div>
      
      <div className="mb-3" >
        <label htmlFor="age" className="form-label" >age</label>
        <input id='age' type="number" className="form-control" />
      </div>

      <button className="btn btn-primary" type="submit">Submit</button>

    </form>
  );
}

export default Form;

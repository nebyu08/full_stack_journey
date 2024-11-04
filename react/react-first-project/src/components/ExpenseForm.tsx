import { categories } from "../App";

function ExpenseForm() {
  return (
    <form>

      <div className="mb-3"> 
        <label htmlFor="Description" className="form-label" >Description</label>
        <input type="text" id="Description" className="form-control" />
      </div>

      <div className="mb-3">
        <label htmlFor="Amount" className="form-label" >Amount</label>
        <input type="number" id="Amount" className="form-control" />
      </div>

      <div className="mb-3">
        <label htmlFor="Category" className="form-label" >Category</label>
        <select className='form-select' onChange={(event)=> onSelectCategory(event.target.value)} >
            <option value="" ></option>
            {categories.map(category=><option key={category} value={category} > {category} </option> )}
        </select>
      </div>

      <button className="btn btn-primary" >
        Submit
      </button>

    </form>
  );
}

export default ExpenseForm;

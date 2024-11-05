import categories from "./data";

interface Props{
    onSelectCategory:(category:string)=> void;
}

const ExpenseFilter = ({onSelectCategory}:Props) => {

  return (
        <select className='form-select' onChange={(event)=> onSelectCategory(event.target.value)} >
            <option value="" >All Categories</option>
            {categories.map(c=><option key={c} value={c} > {c} </option> )}
        </select>
  )
}

export default ExpenseFilter;
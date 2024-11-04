import categories from "./data";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from 'zod';
import {useForm} from "react-hook-form";

const schema=z.object({
  description:z.string().min(3,{message:'Description should be at least 3 charachters'} ).max(50),
  amount:z.number({invalid_type_error:'Amount is required'}).min(0.001).max(100_000),
  categories:z.enum(categories,
    {
      errorMap:()=>({message:'Category is required'})
    }
  )
});4

type ExpenseDataForm=z.infer<typeof schema>

function ExpenseForm() { 
  const {register,handleSubmit,formState:{errors}} = useForm<ExpenseDataForm>({ resolver:zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit(data =>console.log(data))} >
      <div className="mb-3">
        <label htmlFor="Description" className="form-label">
          Description
        </label>
        <input {...register('description')} type="text" id="Description" className="form-control" />
        {errors.description && <p className='text-danger'>{errors.description.message} </p> }
      </div>

      <div className="mb-3">
        <label htmlFor="Amount" className="form-label">
          Amount
        </label>
        <input {...register('amount',{valueAsNumber:true})} type="number" id="Amount" className="form-control" />
        {errors.amount && <p className='text-danger'>{errors.amount.message} </p> }
      </div>

      <div className="mb-3">
        <label htmlFor="Category" className="form-label">
          Category
        </label>
        <select
          className="form-select"
         // onChange={(event) => onSelectCategory(event.target.value)}
          id="category"
          {...register('categories')}
        >
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {" "}
              {category}{" "}
            </option>
          ))}
        </select>
        {errors.categories && <p className='text-danger'>{errors.categories.message} </p> }
      </div>

      <button className="btn btn-primary">Submit</button>
    </form>
  );
}

export default ExpenseForm;

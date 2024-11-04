import { FieldValues, useForm} from "react-hook-form";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const schema=z.object({
    name:z.string().min(3,{message:'Name must be at least 3 charachters long'}),
    age:z.number({ invalid_type_error:'Age is required. ' } ).min(18,{message:"Age must be greater than 18"})
});

type formData=z.infer<typeof schema >;


function Form() {
  const { register, handleSubmit,formState: {errors,isValid} } = useForm<formData>({resolver:zodResolver(schema)});

  const onSubmit = (data: FieldValues ) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-Label">
            Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            className="form-control"
          />
         
         {errors.name && <p className="text-danger" > {errors.name.message} </p> }

        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            age
          </label>
          <input
            {...register("age",{valueAsNumber:true })}
            id="age"
            type="number"
            className="form-control"
          />
          {errors.age && <p className="text-danger" > {errors.age.message} </p> }
        </div>

        <button disabled={!isValid} className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default Form;
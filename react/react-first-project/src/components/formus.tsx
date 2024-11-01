import { FieldValues, useForm } from "react-hook-form";

function Form() {
  const { register, handleSubmit } = useForm();

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
            {...register("name",{required:true,minLength:3 } )}
            id="name"
            type="text"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            age
          </label>
          <input
            {...register("age")}
            id="age"
            type="number"
            className="form-control"
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default Form;

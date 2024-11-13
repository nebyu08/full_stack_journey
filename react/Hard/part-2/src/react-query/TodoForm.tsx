import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "./hooks/useTodos";
import axios from "axios";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const addTodo = useMutation<Todo,Error,Todo> ({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),

    onSuccess: (savedTodo) => {
      //second argument newTodo
      // console.log(savedTodo)
      // queryClient.invalidateQueries({
      //     queryKey:['todos']
      // })

      // updating the cache
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        savedTodo,
        ...(todos || []),
      ]);

     if(ref.current) ref.current.value='';
    },
  });

  return (
    <>
    {addTodo.error && <div className="alert alert-danger">
        {addTodo.error.message}
     </div> }
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current && ref.current.value)
            addTodo.mutate({
              id: 0,
              title: ref.current?.value,
              completed: false,
              userId: 1,
            });
        }}
        className="row mb-3"
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button 
          disabled={addTodo.isLoading}
          className="btn btn-primary">
            {addTodo.isLoading?'Adding...':'Add'}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;

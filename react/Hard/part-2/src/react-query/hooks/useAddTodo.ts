import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import { Todo } from "../services/todoService";
import todoService from "../services/todoService";


const useAddTodo=(onAdd:()=> void )=>{
    const queryClient = useQueryClient();
    return  useMutation<Todo,Error,Todo,AddTodoContext> ({
    mutationFn: (todo: Todo) => todoService.post(todo),
    
    onMutate:(newTodo:Todo)=>{
        const previousTodos=queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [] ;

        queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
            newTodo,
            ...(todos || []),
          ]);   
             
          onAdd();   

         return {previousTodos}
    },

    onSuccess:(saveTodo,newTodo) => {
      // updating the cache
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS,(todos)=>
        todos?.map((todo)=>
            todo === newTodo ? saveTodo : todo
        )
    );   
    },
    
    onError:(error,newTodo,context)=>{
        if(!context) return ;

        queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS,context.previousTodos);
    }
  });

}

export default useAddTodo;
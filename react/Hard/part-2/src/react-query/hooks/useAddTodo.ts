import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "./useTodos";
import { CACHE_KEY_TODOS } from "../constants";
import APIClient from "../services/apiClient";

interface AddTodoContext{
    previousTodos:Todo[];
}

const apiClient=new APIClient<Todo>('/todos');

const useAddTodo=(onAdd:()=> void )=>{
    const queryClient = useQueryClient();
    return  useMutation<Todo,Error,Todo,AddTodoContext> ({
    mutationFn: (todo: Todo) => apiClient.post(todo),
    
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
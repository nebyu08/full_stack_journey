import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

const usePosts=(userId:number | undefined )=>{
        
    return  useQuery<Post[],Error>({
        queryKey:userId ? ['users',userId, 'posts'] : ['posts'] , 
        queryFn:()=>
            axios
            .get<Post[]>('https://jsonplaceholder.typicode.com/todos',{
                params:{
                    userId
                }
            })
            .then(res => res.data),

        staleTime:1*60*1000 //1 min
    });

}

export default usePosts;


import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface PostQuery{
    pageSize:number
}

const usePosts=(query:PostQuery)=> useInfiniteQuery<Post[], Error>({
    queryKey: ['posts', query],
    queryFn: ({ pageParam = 1 }) => 
        axios
            .get<Post[]>('https://jsonplaceholder.typicode.com/todos', {
                params: {
                    _start: (pageParam - 1) * query.pageSize,
                    _limit: query.pageSize
                }
            })
            .then(res => res.data),

    staleTime: 1 * 60 * 1000, //1 min
    getNextPageParam: (lastPage, allPages) => {
        return lastPage.length > 0 ? allPages.length + 1 : undefined;
    }
});

export default usePosts;


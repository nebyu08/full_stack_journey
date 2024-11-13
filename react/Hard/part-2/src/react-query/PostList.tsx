import React from "react";
import usePosts from "./hooks/usePost";

const PostList = () => {
  const pageSize = 10;
  //   const [page, setPage] = useState(1);
  const {
    data: posts,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = usePosts({ pageSize });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {posts.pages.map((page,index) => (
          <React.Fragment key={index} >
            {page.map(post => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>

      <button
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
        className="btn btn-primary my-3 ms-1"
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </button>
    </>
  );
};

export default PostList;

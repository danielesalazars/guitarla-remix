import { ComponentProps, FC } from "react";
import { Posts as IPosts } from "../interfaces/IPost";
import Post from "../components/post";

type CPListadoPosts = ComponentProps<"div">;
type ListadoPostsProps = CPListadoPosts & {
  posts: IPosts[];
};

const ListadoPosts: FC<ListadoPostsProps> = ({ posts }) => {
  return (
    <>
      <h2 className="heading">Blog</h2>
      <div className="blog">
        {posts.map((post: IPosts) => (
          <Post key={post.id} post={post.attributes} />
        ))}
      </div>
    </>
  );
};

export default ListadoPosts;

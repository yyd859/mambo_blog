import { getAllPosts } from "@/lib/posts";
import { PostsClient } from "@/components/PostsClient";

export default function PostsPage() {
  const posts = getAllPosts();
  const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();

  return <PostsClient posts={posts} allTags={allTags} />;
}
